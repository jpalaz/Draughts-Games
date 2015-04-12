import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.Scanner;

public class Convertor {
    public static void main(String[] args) {
        File f = new File(System.getProperty("user.dir") + "\\export");
        File[] rootFiles = f.listFiles();
        String name, text, path;
        Convertor convertor = new Convertor();

        for(File file : rootFiles) {
            name = file.getName();
            if ("htm".equals(name.substring(name.length() - 4))) {
                text = convertor.getUtfStringFromFile(name);
                file.delete();
                convertor.repairLinks(text);
                convertor.writeFile(name, text, false);
            } else if (file.isDirectory() &&
                    ".files".equals(name.substring(name.length() - 6))) {
                File[] innerFiles = file.listFiles();

                for (File innerFile : innerFiles) {
                    name = innerFile.getName();
                    if ("pdn".equals(name.substring(name.length() - 4)))
                        continue;

                    text = convertor.getUtfStringFromFile(innerFile.getAbsolutePath());
                    path = innerFile.getAbsolutePath();
                    innerFile.delete();

                    if ("game".equals(name.substring(0, 4)))
                        convertor.writeFile(path, text, true);
                    else
                        convertor.writeFile(path, text, false);
                }
            }
        }
    }

    private String repairLinks(String text) {
        StringBuilder result = new StringBuilder(text);
        int link = 0;

        while ( (link = result.indexOf(".files\\", link)) != -1 ) {
            link += 6;
            result.setCharAt(link, '/');
        }

        return result.toString();
    }


    String getUtfStringFromFile(String fileName) {
        try {
            Scanner sc = new Scanner(Paths.get(fileName), "Windows-1251");
            StringBuilder text = new StringBuilder();

            while (sc.hasNext()) {
                text.append(sc.nextLine());
                text.append("\r\n");
            }

            sc.close();
            byte[] bytes = text.toString().getBytes(StandardCharsets.UTF_8);

            return new String(bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private StringBuilder optimizeJavascript(StringBuilder result) {
        int deleteBegin = result.indexOf("JavaScript\">") + "JavaScript\">".length();
        int deleteEnd = result.indexOf("var autoplay", deleteBegin) - 1;
        result.delete(deleteBegin, deleteEnd);

        int insertBegin = result.indexOf("var cur=0;", deleteBegin) - 1;
        result.insert(insertBegin, ";");

        while ( (deleteBegin = result.indexOf("[\"6", deleteBegin)) != -1) {
            result.replace(deleteBegin, deleteBegin + 28, "\"");
            for (int i = 0; i < 8; ++i) {
                deleteBegin = result.indexOf("0", deleteBegin);
                for (int j = 0; j < 4; ++j) {
                    result.deleteCharAt(deleteBegin + j);
                }

                deleteBegin = result.indexOf("6", deleteBegin);
                result.delete(deleteBegin, deleteBegin + 4);
            }

            result.delete(deleteBegin, deleteBegin + 18);

            deleteBegin = result.indexOf("\"", deleteBegin);
            deleteEnd = result.indexOf("];", deleteBegin);
            result.delete(deleteBegin + 1, deleteEnd + 1);
        }

        deleteBegin = result.indexOf("function", deleteBegin);
        deleteEnd = result.indexOf("</script>", deleteBegin);
        result.delete(deleteBegin, deleteEnd);

        insertBegin = deleteBegin + "</script>".length();
        result.insert(insertBegin, "<script src=\"../../moves.js\"></script>");

        deleteBegin = result.indexOf("javascript:to(", deleteBegin);
        deleteEnd = deleteBegin + 16;
        result.replace(deleteBegin, deleteEnd, "run()");

        while ( (insertBegin = result.indexOf("javascript:to(", deleteBegin)) != -1)
            result.insert(insertBegin + 11, "void(0)\" onclick=\"");

        return result;
    }

    public void writeFile(String fileName, String text, boolean optimizeJS) {
        StringBuilder result = new StringBuilder(text);

        try {
            PrintWriter outFile = new PrintWriter(fileName);

            if (optimizeJS)
                outFile.print(optimizeJavascript(result));
            else
                outFile.print(result);

            outFile.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
