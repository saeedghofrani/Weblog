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
            $('#imageContainer').css('border', "0px solid black");
            // $('#imageArticle').trigger('submit');

        }
        else {
            alert('Please select image file (jpg, jpeg, png)');
            // $('#imageArticle').attr('src', image);
        }
    });


});