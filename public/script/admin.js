$(document).ready(function () {




    $("#resetPass").click(function (e) { 
        e.preventDefault();
        console.log('ssssssss');
        $.ajax({
            type: "patch",
            url: "/admin",
            data: 'sasa',
            success: function (response) {
                
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