function run() {
    var success = document.getElementsByClassName('success');
    for (var i = 0; i < success.length; i++) {
        success[i].addEventListener('click', onSuccessClick);
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    var men = ",0,1,2,,,,,,,,1,4\n2,,2,,,,,,,,2,,6\n1,0,,,,,,,,0,2,,3\n0,,,,,,,,1,1,1,,3\n,,,,,,,1,2,1,1,,5" +
        "\n,,,,,,2,1,1,0,,,4\n,,,,,0,,2,1,,,1,4\n,,,,1,1,0,,,,,1,3\n,,,1,0,1,1,,,,,,3\n,,2,1,1,2,,,,,,,6\n" +
        ",0,0,1,1,,,,,,,,2\n1,,,,,,1,1,,,,,3";

    var women = ",1,1,2,,,,,,,,0,4\n1,,0,,,,,,,,0,0,1\n1,2,,,,,,,,1,1,,5\n0,,,,,,,,1,0,0,,1\n,,,,,,,1,2,0,0,,3\n" +
        ",,,,,,,1,0,0,,,1\n,,,,,,,1,2,,,,3\n,,,,1,1,1,,,,,1,4\n,,,1,0,2,0,,,,,,3\n,,1,2,2,2,,,,,,,7\n" +
        ",2,1,2,2,,,,,,,,7\n2,2,,,,,,1,,,,,5";

    // var menTable = document.getElementById('men-results');
    var womenTable = document.getElementById('women-results');

    Papa.parse(women, {
        complete: function (results) {
            console.log("Finished:", results.data);
            data = results.data;
            for (var i = 0; i < data.length; ++i) {
                var row = womenTable.rows[i];
                for (var j = 0; j < data[i].length; ++j) {
                    var td = document.createElement('td');
                    var points = data[i][j];
                    td.appendChild(document.createTextNode(points));
                    if (i === j) {
                        td.setAttribute('class', 'info');
                    } else if (j + 1 < data[i].length) {
                        if (points == 2) {
                            td.setAttribute('class', 'text-danger');
                        } else if (points == 1) {
                            td.setAttribute('class', 'text-success');
                        }
                    }
                    row.appendChild(td)
                }
            }
        }
    });
}

function onSuccessClick(e) {
    var ref = e.currentTarget.getElementsByTagName('a')[0].getAttribute('href');
    window.location.href = ref;
}