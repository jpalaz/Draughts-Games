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

    var men = ",0,1,2,0,2,2,1,0,,,1,9\n2,,2,2,1,2,1,1,,,2,2,15\n1,0,,0,0,0,1,,,0,2,0,4\n0,0,2,,1,0,,,1,1,1,0,6\n2,1,2,1,,,,1,2,1,1,2,13\n0,0,2,2,,,2,1,1,0,2,,10\n0,1,1,,,0,,2,1,2,0,1,8\n1,1,,,1,1,0,,1,0,2,1,8\n2,,,1,0,1,1,1,,1,1,2,10\n,,2,1,1,2,0,2,1,,2,1,12\n,0,0,1,1,0,2,0,1,0,,,5\n1,0,2,2,0,,1,1,0,1,,,8";
    var women = ",1,1,2,1,0,1,0,0,,,0,8\n1,,0,0,1,0,0,0,,,0,0,2\n1,2,,2,1,1,0,,,1,1,0,9\n0,2,0,,1,0,,,1,0,0,1,5\n1,1,1,1,,,,1,2,0,0,0,7\n2,2,1,2,,,0,1,0,0,2,,10\n1,2,2,,,2,,1,2,1,2,2,15\n2,2,,,1,1,1,,0,0,2,1,10\n2,,,1,0,2,0,2,,0,2,1,10\n,,1,2,2,2,1,2,2,,2,2,16\n,2,1,2,2,0,0,0,0,0,,,7\n2,2,2,1,2,,0,1,1,0,,,11";
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
    var sumPoints = [];
    for (var i = 0; i < data.length; ++i) {
        var length = data[i].length;
        for (var j = 0; j < length; ++j) {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(data[i][j]));
            var className = getTdClass(i, j, data[i]);
            td.setAttribute('class', className);
            table.rows[i].appendChild(td);
        }
        sumPoints.push(data[i][length - 1]);
    }

    sumPoints.sort(function(a, b) {return b - a});
    var topSums = sumPoints.slice(0, 3);
    for (i = 0; i < data.length; ++i) {
        var currentSum = data[i][data[i].length - 1];
        if (topSums.indexOf(currentSum) != -1) {
            var row = table.rows[i];
            row.firstElementChild.setAttribute('class', 'text-danger');
            row.lastElementChild.setAttribute('class', 'text-danger');
        }
    }
}
function getTdClass(i, j, row) {
    var points = row[j];
    if (i === j) {
        return 'info';
    } else if (j + 1 < row.length) {
        if (points == 2) {
            return 'text-danger';
        } else if (points == 1) {
            return 'text-success';
        }
    }
}
