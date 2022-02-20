$(document).ready(function () {

    $(".deleteUser").click(function (e) {
        var id = $(this).attr("userid");
        e.preventDefault();
        $.ajax({
            type: "delete",
            url: "/admin",
            data: { id },
            success: function (response) {
                $('div').remove(`.${id}`);
            },
            error: function (xhr, textStatus, errorThrown) {
                $('.toast-body').removeClass('text-danger');
                $('.toast-body').addClass('text-danger');
                $('.toast-body').css('border', '1px solid red');
                $('.toast-body').css('font-size', 16);
                $('.toast-body').text(xhr.responseText);
                $('.toast').toast("show");
            }
        });
    });


    $(".resetPass").click(function (e) {
        var id = $(this).attr("userid");
        e.preventDefault();
        $.ajax({
            type: "patch",
            url: "/admin",
            data: { id },
            success: function (response) {
                $('.toast-body').removeClass('text-danger');
                $('.toast-body').css('font-size', 16);
                $('.toast-body').css('border', '1px solid green');
                $('.toast-body').addClass('text-success');
                $('.toast-body').text(response.message);
                $('.toast').toast("show");
            },
            error: function (xhr, textStatus, errorThrown) {
                $('.toast-body').removeClass('text-success');
                $('.toast-body').addClass('text-danger');
                $('.toast-body').css('border', '1px solid red');
                $('.toast-body').css('font-size', 16);
                $('.toast-body').text(xhr.responseText);
                $('.toast').toast("show");
            }
        });
    });

    $('#deleArticleAdmin').click(function (e) {
        e.preventDefault();
        const id = $('#articleID').val();
        $.ajax({
            type: "delete",
            url: "/articles/setup",
            data: { id },
            success: function (response) {
                $('.toast-body').removeClass('text-danger');
                $('.toast-body').css('font-size', 16);
                $('.toast-body').css('border', '1px solid green');
                $('.toast-body').addClass('text-success');
                $('.toast-body').text(response.message);
                $('.toast').toast("show");
            },
            error: function (xhr, textStatus, errorThrown) {
                $('.toast-body').removeClass('text-success');
                $('.toast-body').addClass('text-danger');
                $('.toast-body').css('border', '1px solid red');
                $('.toast-body').css('font-size', 16);
                $('.toast-body').text(xhr.responseText);
                $('.toast').toast("show");
            }

        });
    });



});