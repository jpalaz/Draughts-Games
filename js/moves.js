var plight = new Image();
plight.src = "../../../pics/light.gif";
var pdark = new Image();
pdark.src = "../../../pics/dark.gif";
var pw = new Image();
pw.src = "../../../pics/w.gif";
var pb = new Image();
pb.src = "../../../pics/b.gif";
var pwk = new Image();
pwk.src = "../../../pics/wk.gif";
var pbk = new Image();
pbk.src = "../../../pics/bk.gif";
var pclear = new Image();
pclear.src = "../../../pics/clear.gif";

function run() {
    var i, j;

    for(i = 0; i < 2; i++) {
        for (j = 0; j < 12; ++j) {
            parent.frames[0].document.images[(12 * i) + j].src = pclear.src;
            parent.frames[0].document.images[120 + (12 * i) + j].src = pclear.src;
        }

        for (j = 0; j < 8; ++j) {
            parent.frames[0].document.images[24 + i + (j * 12)].src = pclear.src;
            parent.frames[0].document.images[34 + i + (j * 12)].src = pclear.src;
        }
    }

    var h = 26;
    var big = true;
    for (i = 0; i < 8; ++i) {
        for (j = 0; j < 4; ++j) {
            parent.frames[0].document.images[h].src = plight.src;
            h += 2;
        }

        if(big)
            h += 2;
        h += 3;
        big = !big;
    }
    to(0);
}

function to(move) {
    var index = 22;
    var big = 1;

    for (var x = 0; x < 32; x++, index += 2) {
        if(x % 4 == 0) {
            index += 3 + 2 * big;
            if(big)
                big = 0;
            else big = 1;
        }

        if (rev) {
            a = m[move].charAt(31 - x)
        } else {
            a = m[move].charAt(x)
        }

        if (a == "1") parent.frames[0].document.images[index].src = pdark.src;
        else if (a == "2") parent.frames[0].document.images[index].src = pw.src;
        else if (a == "3") parent.frames[0].document.images[index].src = pb.src;
        else if (a == "4") parent.frames[0].document.images[index].src = pwk.src;
        else if (a == "5") parent.frames[0].document.images[index].src = pbk.src;
    }

    if (cur != 0)
        document.anchors[cur - 1].style.background = "";
    if (move != 0)
        document.anchors[move - 1].style.background = "gray";

    cur = move;
    parent.frames[0].focus();
}

function next() {
    if (cur != totalmoves - 1)
        to(cur + 1);
    else
        to(cur);
}
function back() {
    if (cur != 0)
        to(cur - 1);
    else
        to(cur);
}
function end() {
    to(totalmoves - 1);
}
function dorev() {
    rev = !rev;
    to(cur)
}
function play() {
    if (autoplay) {
        next();
        window.setTimeout("play()", 1500);
        if (cur == totalmoves - 1) {
            autoplay = false;
            parent.frames[0].document.forms[0].elements[4].value = "play";
        }
    }
}
function doplay() {
    autoplay = !autoplay;
    if (autoplay) {
        play();
        parent.frames[0].document.forms[0].elements[4].value = "stop";
    }
    else parent.frames[0].document.forms[0].elements[4].value = "play";
}