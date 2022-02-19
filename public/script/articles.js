$(document).ready(function () {
    var d = $('#date1').text()
    d = new Date(d);

    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

    $('#date1').text(datestring);
    /////////////////////////////////////////
    var d = $('#date2').text()
    d = new Date(d);

    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

    $('#date2').text(datestring);
    //////////////////////
    var d = $('.date').length
    for (var i = 0; i < d; i++) {
        x = $(`li.date.data${i}`).text()
        x = new Date(x);

        var datestring = ("0" + x.getDate()).slice(-2) + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" +
            x.getFullYear();

        $(`li.date.data${i}`).text(datestring);
    }

    $('.fa-star-o').click(function (e) {

        e.preventDefault();
        let star;
        let id = $(this).attr("artId");

        if ($(this).hasClass('fa-star-o')) {
            $(this).removeClass('fa');
            $(this).removeClass('fa-star-o');
            $(this).addClass("fas");
            $(this).addClass("fa-star");
            star = 1;
        }

        else {
            $(this).addClass('fa');
            $(this).addClass('fa-star-o');
            $(this).removeClass("fas");
            $(this).removeClass("fa-star");
            star = 0;
        }

        $.ajax({
            type: "POST",
            url: `/articles/favorit/${id}`,
            data: { data: `${star}` },
            success: function (response) {
                console.log(response);
            },
            error: function (xhr) {
                console.log(xhr.status);
            }
        });

    });
    console.log("href URL" + window.location.href.split("=")[1]);
    for (let i = 0; i < $('.page-item').length; i++) {
        let page =  $('.page-item');
        console.log( page );
        if ($('.page-item').text()[i] == window.location.href.split("=")[1]) {
            console.log("the li that should be active" + $('li.page-item')[i]);
            let page = $('li.page-item')[i + 1];
            // console.log();
            // $(selector).addClass(className);
            page.classList.add('active')
    }}
});