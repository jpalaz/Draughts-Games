function run() {
    var success = document.getElementsByClassName('success');
    for (var i = 0; i < success.length; i++) {
        success[i].addEventListener('click', onSuccessClick);
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    var men = ",0,1,2,0,,,,,,,1,4\n2,,2,2,,,,,,,2,,8\n1,0,,,,,,,,0,2,0,3\n0,0,,,,,,,1,1,1,,3\n2,,,,,,,1,2,1,1,,7\n" +
        ",,,,,,2,1,1,0,2,,6\n,,,,,0,,2,1,2,,1,6\n,,,,1,1,0,,1,,,1,4\n,,,1,0,1,1,1,,,,,4\n,,2,1,1,2,0,,,,,,6\n" +
        ",0,0,1,1,0,,,,,,,2\n1,,2,,,,1,1,,,,,5";

    var women = ",1,1,2,1,,,,,,,0,5\n1,,0,0,,,,,,,0,0,1\n1,2,,,,,,,,1,1,0,5\n0,2,,,,,,,1,0,0,,3\n1,,,,,,,1,2,0,0,,4\n" +
        ",,,,,,0,1,0,0,2,,3\n,,,,,2,,1,2,1,,,6\n,,,,1,1,1,,0,,,1,4\n,,,1,0,2,0,2,,,,,5\n,,1,2,2,2,1,,,,,,8\n" +
        ",2,1,2,2,0,,,,,,,7\n2,2,2,,,,,1,,,,,7";

    var menTable = document.getElementById('men-results');
    var womenTable = document.getElementById('women-results');

    Papa.parse(men, {
        complete: function (results) {
            parseResults(results, menTable)
        }
    });
    Papa.parse(women, {
        complete: function (results) {
            parseResults(results, womenTable)
        }
    });
}

function onSuccessClick(e) {
    var ref = e.currentTarget.getElementsByTagName('a')[0].getAttribute('href');
    window.location.href = ref;
}

function parseResults(results, table) {
    console.log("Finished:", results.data);
    data = results.data;
    for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < data[i].length; ++j) {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(data[i][j]));
            var className = getTdClass(i, j, data[i]);
            td.setAttribute('class', className);
            table.rows[i].appendChild(td);
        }
    }
}
function getTdClass(i, j, row) {
    var points = row[j];
    if (i === j) {
        return 'info';
    } else if (j + 1 < data[i].length) {
        if (points == 2) {
            return 'text-danger';
        } else if (points == 1) {
            return 'text-success';
        }
    }
}
