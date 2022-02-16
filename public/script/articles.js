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

    let articleIdLength = $('.ArticleId').length;

    let spanFavorit = $('.fa-star-o').length;

    for (let i = 0; i < articleIdLength; i++) {
        for (let j = 0; j < spanFavorit; i++) {
            console.log($(".fa-star-o").attr('artId')[i]);
            console.log($('.ArticleId')[j].text()); 
            if ($(".fa-star-o")[i].attr('artId') === $('.ArticleId')[j].text()) {
                $(".fa-star-o").removeClass('fa')
                    .removeClass('fa-star-o')
                    .addClass("fas")
                    .addClass("fa-star");
            }
        }
    }



});