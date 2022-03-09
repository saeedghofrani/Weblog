$(document).ready(function () {


    $('#imageContainer').click(function (e) {
        e.preventDefault();
        $('#formFile').trigger('click');
    });


    $('#formFile').change(function (e) {
        e.preventDefault();
        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imageArticle').attr('src', e.target.result);
                console.log(e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
            $("#imageArticle").removeClass('d-none');
            $('.far').addClass('d-none');
            $('.choose').addClass("d-none");
            $('#imageContainer').css('border', "0px solid black");
            // $('#imageArticle').trigger('submit');

        }
        else {
            $('.toast-body').removeClass('text-success');
            $('.toast-body').addClass('text-danger');
            $('.toast-body').css('border', '1px solid red');
            $('.toast-body').css('font-size', 16);
            $('.toast-body').text('please select an image to load');
            $('.toast').toast("show");
            // $('#imageArticle').attr('src', image);
        }
    });


    $('#updateArticleSubmit').click(function (e) {
        const x = document.getElementById('idInput');
        id =  x.dataset.articleid;
        e.preventDefault();
        var data = new FormData($('#formAddArticle')[0]);
        $.ajax({
            url: `/articles/updateArticle/${id}`,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            success: function (response) {
                window.location.href = "/articles/myArticle";
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