$(document).ready(function () {

    let image = $('#avatarImage').attr('src');
    $('#avatarImage').click(function (e) {
        e.preventDefault();
        $('#inputFile').trigger('click');
    });
    $('.imageText').click(function (e) {
        e.preventDefault();
        $('#inputFile').trigger('click');
    });


    $('#inputFile').change(function (e) {
        e.preventDefault();
        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#avatarImage').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);

            $('#avatarSubmit').trigger('submit');

        }
        else {
            // alert('Please select image file (jpg, jpeg, png)');
            $('#avatarImage').attr('src', image);
            $('.toast-body').removeClass('text-success');
            $('.toast-body').addClass('text-danger');
            $('.toast-body').css('border', '1px solid red');
            $('.toast-body').css('font-size', 16);
            $('.toast-body').text("Please select image file (jpg, jpeg, png)");
            $('.toast').toast("show");
        }
    });

    $('#avatarSubmit').submit(function (e) {
        e.preventDefault();
        var data = new FormData($('#avatarForm')[0]);
        $.ajax({
            url: '/dashboard',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            success: function (response) {
                $('.toast-body').addClass('text-success');
                $('.toast-body').removeClass('text-danger');
                $('.toast-body').css('border', '1px solid red');
                $('.toast-body').css('font-size', 16);
                $('.toast-body').text("update avatar successful");
                $('.toast').toast("show");
            },
            error: function (xhr, textStatus, errorThrown) {
                $('.toast-body').removeClass('text-success');
                $('.toast-body').addClass('text-danger');
                $('.toast-body').css('border', '1px solid red');
                $('.toast-body').css('font-size', 16);
                $('.toast-body').text("update avatar was unsuccessful");
                $('.toast').toast("show");

            }
        });
    });






    $("#updatePass").click(function (e) {
        e.preventDefault();
        const data = {
            oldPass: $("#oldPass").val(),
            password: $("#newPass").val(),
            confPass: $("#confPass").val(),
        }
        $.ajax({
            type: "PUT",
            url: "/auth/pass",
            data,
            success: function (response) {
                $('#successpass').removeClass('d-none');
                $('#successpass').html(response.message);
                setTimeout(function () {
                    $('#successpass').addClass('d-none');
                    $('#successpass').html('');
                    noraml();
                }, 5000);
            },
            error: function (xhr, textStatus, errorThrown) {
                $('#errorpass').removeClass('d-none');
                $('#errorpass').html(xhr.responseText);
                setTimeout(function () {
                    $('#errorpass').addClass('d-none');
                    $('#errorpass').html('');
                    noraml()
                }, 5000);

            }
        });
    });


    function noraml() {
        $("#oldPass").val('');
        $("#newPass").val('');
        $("#confPass").val('');
    };







    let lastData = {
        username: $('#username').val(),
        email: $('#email').val(),
        lastName: $('#lastName').val(),
        firstName: $('#firstName').val(),
        gender: $('#gender').val(),
        phone: $('#phone').val(),
    }


    $("#removeAccount").click(function (e) {
        e.preventDefault();

    });
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })




    $('#editProfile').click(function (e) {
        e.preventDefault();
        $('.inputUpdate').addClass("inputUpdateActive").removeAttr('disabled').removeAttr('readonly');
        $('.btnUpdatesCancel').removeClass('d-none');
    });

    $('#toastBtn').click(function (e) {
        e.preventDefault();
        $('.toast').toast("hide");
    });
    $('#cancel').click(function (e) {
        e.preventDefault();
        inputMod();
        $('.btnUpdatesCancel').addClass('d-none');
        lastdata(lastData);

    });
    $('#update').click(function (e) {
        e.preventDefault();
        const data = {
            username: $('#username').val(),
            email: $('#email').val(),
            lastName: $('#lastName').val(),
            firstName: $('#firstName').val(),
            gender: $('#gender').val(),
            phone: $('#phone').val(),
        }
        $.ajax({
            type: "PUT",
            url: "/dashboard",
            data: data,
            success: function (response) {
                const { firstName, lastName, gender, phone, username, email } = response.data;
                $('.toast-body').removeClass('text-danger');
                $('#username').val(username);
                $('#email').val(email);
                $('#lastName').val(lastName);
                $('#firstName').val(firstName);
                $('#gender').val(gender);
                $('#phone').val(phone);
                $('#fullName').text(firstName + " " + lastName);
                inputMod();
                $('.btnUpdatesCancel').addClass('d-none');
                $('.toast-body').css('font-size', 16);
                $('.toast-body').css('border', '1px solid green');
                $('.toast-body').addClass('text-success');
                $('.toast-body').text(response.message);
                $('.toast').toast("show");
                lastData = {
                    username: $('#username').val(),
                    email: $('#email').val(),
                    lastName: $('#lastName').val(),
                    firstName: $('#firstName').val(),
                    gender: $('#gender').val(),
                    phone: $('#phone').val(),
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                if (xhr.status === 400) {
                    lastdata(lastData);
                    $('.btnUpdatesCancel').addClass('d-none');
                    inputMod();
                    $('.btnUpdatesCancel').addClass('d-none');
                    $('.toast-body').removeClass('text-success');
                    $('.toast-body').addClass('text-danger');
                    $('.toast-body').css('border', '1px solid red');
                    $('.toast-body').css('font-size', 16);
                    $('.toast-body').text(xhr.responseText);
                    $('.toast').toast("show");
                }
                else {
                    alert(xhr.responseText);
                    $('.btnUpdatesCancel').addClass('d-none');
                    $('.toast-body').removeClass('text-danger');
                    inputMod();
                    $('.btnUpdatesCancel').addClass('d-none');
                    lastdata(lastData);
                    $('.toast-body').addClass('text-danger');
                    $('.toast-body').css('border', '1px solid red');
                    $('.toast-body').css('font-size', 16);
                    $('.toast-body').text(xhr.responseText);
                    $('.toast').toast("show");
                }
            }
        });
    });
});

function lastdata(lastData) {
    $('#username').val(lastData.username);
    $('#email').val(lastData.email);
    $('#lastName').val(lastData.lastName);
    $('#firstName').val(lastData.firstName);
    $('#gender').val(lastData.gender);
    $('#phone').val(lastData.phone);
}

function inputMod() {
    $('.inputUpdate').removeClass("inputUpdateActive");
    $('.inputUpdate').attr('disabled', 'disabled');
    $('.inputUpdate').attr('readonly', 'readonly');
}