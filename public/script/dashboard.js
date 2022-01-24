$(document).ready(function () {
    console.log($('#gender').val());
    const lastData = {
        username: $('#username').val(),
        password: $('#password').val(),
        lastName: $('#lastName').val(),
        firstName: $('#firstName').val(),
        gender: $('#gender').val(),
        phone: $('#phone').val(),
    }
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
        $('.inputUpdate').removeClass("inputUpdateActive");
        $('.inputUpdate').attr('disabled', 'disabled');
        $('.inputUpdate').attr('readonly', 'readonly');
        $('.btnUpdatesCancel').addClass('d-none');
        $('#username').val(lastData.username);
        $('#password').val(lastData.password);
        $('#lastName').val(lastData.lastName);
        $('#firstName').val(lastData.firstName);
        $('#gender').val(lastData.gender);
        $('#phone').val(lastData.phone);

    });
    $('#update').click(function (e) {
        e.preventDefault();
        const data = {
            username: $('#username').val(),
            password: $('#password').val(),
            lastName: $('#lastName').val(),
            firstName: $('#firstName').val(),
            gender: $('#gender').val(),
            phone: $('#phone').val(),
        }
        $.ajax({
            type: "PUT",
            url: "/dashboard",
            data,
            success: function (response) {
                const { firstName, lastName, gender, phone, username, password } = response.data;
                $('.toast-body').removeClass('text-danger');
                $('#username').val(username);
                $('#password').val(password);
                $('#lastName').val(lastName);
                $('#firstName').val(firstName);
                $('#gender').val(gender);
                $('#phone').val(phone);
                $('#fullName').text(firstName + " " + lastName);
                $('.inputUpdate').removeClass("inputUpdateActive");
                $('.inputUpdate').attr('disabled', 'disabled');
                $('.inputUpdate').attr('readonly', 'readonly');
                $('.btnUpdatesCancel').addClass('d-none');
                $('.toast-body').css('font-size', 16);
                $('.toast-body').css('border', '1px solid green');
                $('.toast-body').addClass('text-success');
                $('.toast-body').text(response.message);
                $('.toast').toast("show");
            },
            error: function (xhr, textStatus, errorThrown) {
                if (xhr.status === 400) {
                    $('#username').val(lastData.username);
                    $('#lastName').val(lastData.lastName);
                    $('#firstName').val(lastData.firstName);
                    $('#password').val(lastData.password);
                    $('#gender').val(lastData.gender);
                    $('#phone').val(lastData.phone);
                    $('.btnUpdatesCancel').addClass('d-none');
                    $('.inputUpdate').removeClass("inputUpdateActive");
                    $('.inputUpdate').attr('disabled', 'disabled');
                    $('.inputUpdate').attr('readonly', 'readonly');
                    $('.inputUpdate').removeClass("inputUpdateActive");
                    $('.inputUpdate').attr('disabled', 'disabled');
                    $('.inputUpdate').attr('readonly', 'readonly');
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
                    $('#username').val(lastData.username);
                    $('#lastName').val(lastData.lastName);
                    $('#firstName').val(lastData.firstName);
                    $('#password').val(lastData.password);
                    $('#gender').val(lastData.gender);
                    $('#phone').val(lastData.phone);
                    $('.btnUpdatesCancel').addClass('d-none');
                    $('.inputUpdate').removeClass("inputUpdateActive");
                    $('.inputUpdate').attr('disabled', 'disabled');
                    $('.inputUpdate').attr('readonly', 'readonly');
                    $('.toast-body').removeClass('text-danger');
                    $('.inputUpdate').removeClass("inputUpdateActive");
                    $('.inputUpdate').attr('disabled', 'disabled');
                    $('.inputUpdate').attr('readonly', 'readonly');
                    $('.btnUpdatesCancel').addClass('d-none');
                    $('#username').val(lastData.username);
                    $('#password').val(lastData.password);
                    $('#lastName').val(lastData.lastName);
                    $('#firstName').val(lastData.firstName);
                    $('#gender').val(lastData.gender);
                    $('#phone').val(lastData.phone);
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