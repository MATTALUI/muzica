$(document).ready(function () {

    // prepend overlay to DOM
    $('.team-item', this).prepend($("<div class='overlay'></div>"));

    $(".team-item").hover(function () {
        $('.overlay', this).fadeToggle(400);
        $('.team-info', this).fadeToggle(400);
    });
});
