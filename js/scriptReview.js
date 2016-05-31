function run() {
    var onResize = function() {
        // apply dynamic padding at the top of the body according to the fixed navbar height
        $("body").css("padding-top", $(".navbar-fixed-top").height() + 10);
    };

    $(window).resize(onResize());

    $(function() {
        onResize();
    });
}