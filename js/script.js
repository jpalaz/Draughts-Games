function run() {
    var onResize = function() {
        // apply dynamic padding at the top of the body according to the fixed navbar height
        $("body").css("padding-top", $(".navbar-fixed-top").height() + 10);
    };

    $(window).resize(onResize());

    $(function() {
        onResize();
    });

    var success = document.getElementsByClassName('success');
    for (var i = 0; i < success.length; i++) {
        success[i].addEventListener('click', onSuccessClick);
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    var men = ",0,1,2,0,2,2,1,0,0,1,1,10,8\n2,,2,2,1,2,1,1,1,2,2,2,18,1\n1,0,,0,0,0,1,1,1,0,2,0,6,12\n0,0,2,,1,0,1,0,1,1,1,0,7,10\n2,1,2,1,,2,2,1,2,1,1,2,17,2\n0,0,2,2,0,,2,1,1,0,2,1,11,7\n0,1,1,1,0,0,,2,1,2,0,1,9,9\n1,1,1,2,1,1,0,,1,0,2,1,11,5\n2,1,1,1,0,1,1,1,,1,1,2,12,4\n2,0,2,1,1,2,0,2,1,,2,1,14,3\n1,0,0,1,1,0,2,0,1,0,,0,6,11\n1,0,2,2,0,1,1,1,0,1,2,,11,6";
    var women = ",1,1,2,1,0,1,0,0,0,1,0,7,10\n1,,0,0,1,0,0,0,0,0,0,0,2,12\n1,2,,2,1,1,0,1,1,1,1,0,11,7\n0,2,0,,1,0,0,1,1,0,0,1,6,11\n1,1,1,1,,1,0,1,2,0,0,0,8,9\n2,2,1,2,1,,0,1,0,0,2,1,12,6\n1,2,2,2,2,2,,1,2,1,2,2,19,2\n2,2,1,1,1,1,1,,0,0,2,1,12,5\n2,2,1,1,0,2,0,2,,0,2,1,13,3\n2,2,1,2,2,2,1,2,2,,2,2,20,1\n1,2,1,2,2,0,0,0,0,0,,1,9,8\n2,2,2,1,2,1,0,1,1,0,1,,13,4";
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
    var data = results.data;
    for (var i = 0; i < data.length; ++i) {
        var length = data[i].length;
        for (var j = 0; j < length; ++j) {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(data[i][j]));
            var className = getTdClass(i, j, data[i]);
            td.setAttribute('class', className);
            table.rows[i].appendChild(td);
            if (j + 1 == length && (data[i][j] == 1 || data[i][j] == 2 || data[i][j] == 3)) {
                td.setAttribute('class', 'text-danger');
                table.rows[i].firstElementChild.setAttribute('class', 'text-danger');
            }
        }
    }
}
function getTdClass(i, j, row) {
    var points = row[j];
    if (i === j) {
        return 'info';
    } else if (j + 2 < row.length) {
        if (points == 2) {
            return 'text-danger';
        } else if (points == 1) {
            return 'text-success';
        }
    }
}
