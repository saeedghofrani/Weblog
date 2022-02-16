$(document).ready(function () {

    $(".deleteUser").click(function (e) { 
        var id = $(this).attr("userid");
        e.preventDefault();
        $.ajax({
            type: "delete",
            url: "/admin",
            data: {id},
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
            data: {id},
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



    $('#addAdmin').click(function (e) {
        e.preventDefault();
        const data = {
            username: $('#username').val(),
            email: $('#email').val(),
            lastName: $('#lastName').val(),
            firstName: $('#firstName').val(),
            gender: $('#gender').val(),
            phone: $('#phone').val(),
            role: 'admin',
            password: $('#password').val(),
            status: $('#status').val(),
        }
        $.ajax({
            type: "post",
            url: "/admin",
            data,
            success: function (response) {
                addAdmin(response.data);
                $("#exampleModalCenter").modal('hide');
            },
            error: function (xhr, textStatus, errorThrown) {
                $('#errorAdminError').removeClass('d-none');
                $('#errorAdminError').html(xhr.responseText);
                setTimeout(function () {
                    $('#errorAdminError').addClass('d-none');
                    $('#errorAdminError').html('');
                }, 5000);
            }
        });
    });
});

function addAdmin(record) {
    $('#appendDiv').append(`<div class="col-12 col-sm-6 col-md-5 col-lg-4 my-2">
    <div class="price-card featured admin">
        <h2>
            ${record.role}
        </h2>
        <p>
            ${record.username}
        </p>
        <ul class="pricing-offers">
            <li>
                ${record.firstName}
            </li>
            <li>
                ${record.lastName}
            </li>
            <li>
                ${record.email}
            </li>
            <li>
                ${record.phone}
            </li>
            <li>
                ${record.gender}
            </li>
            <li>
                ${record.status}
            </li>
        </ul>
        <!-- <a href="#" class="btn btn-primary btn-mid">Buy Now</a> -->
    </div>
</div>`
    );
}