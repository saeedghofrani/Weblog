$(document).ready(function () {

    var d = $('.date').length
    for (var i = 0; i < d; i++) {
        x = $(`li.date.data${i}`).text()
        x = new Date(x);

        var datestring = ("0" + x.getDate()).slice(-2) + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" +
            x.getFullYear();
    
            $(`li.date.data${i}`).text(datestring);
    }

    $('.removeArticle').click(function (e) {
        e.preventDefault();
        let id = $(this).attr("articleid");
        $.ajax({
            type: "delete",
            url: "/articles/setup",
            data: { id: id },
            success: function (response) {
                $('div').remove(`.${id}`);
            },
            error: function (xhr, textStatus, errorTh) {
                alert(xhr.status);
                alert(xhr.responseText);
            }
        });
    });
});