$(document).ready(function () {
    $('#addAdmin').click(function (e) {
        let count = $('tr').length;
        e.preventDefault();
        const data = {
            username: $('#username').val(),
            email: $('#email').val(),
            lastName: $('#lastName').val(),
            firstName: $('#firstName').val(),
            gender: $('#gender').val(),
            phone: $('#phone').val(),
            role: $('#role').val(),
            password: $('#password').val(),
            status: $('#status').val(),
        }
        $.ajax({
            type: "post",
            url: "/admin",
            data,
            success: function (response) {
                addAdmin(response.data, count);
                count++;
                $("#exampleModalCenter").modal('hide');
            },
            error: function (xhr, textStatus, errorThrown) {
                $('#errorAdminError').removeClass('d-none');
                $('#errorAdminError').html(xhr.responseText);
            }
        });
    });
});

function addAdmin(record, count) {
    $('.userTable').append(`
    <tr>
    <th scope="row">
        ${count}
    </th>
    <td>|</td>
    <td>
    ${record.firstName}
    </td>
    <td>|</td>
    <td>
    ${record.lastName}
    </td>
    <td>|</td>
    <td>
    ${record.username}
    </td>
    <td>|</td>
    <td>
    ${record.gender}
    </td>
    <td>|</td>
    <td>
    ${record.status}
    </td>
    <td>|</td>
    <td>
    ${record.email}
    </td>
    </tr>`
    );
}