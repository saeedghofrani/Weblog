$(document).ready(function () {
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