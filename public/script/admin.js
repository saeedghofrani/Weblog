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

    $('.removeComment').click(function (e) {
        e.preventDefault();
        var id = $(this).attr("userid");
        $.ajax({
            type: "GET",
            url: `/comment/${id}`,
            success: function (response) {
                $('#backToUsers').removeClass("d-none");
                $('#appendDiv').html("");
                for (let i = 0; i < response.data.length; i++) {
                    appendData(response.data[i]);
                }
            },
            error: function (xhr) {
                $('.toast-body').removeClass('text-success');
                $('.toast-body').addClass('text-danger');
                $('.toast-body').css('border', '1px solid red');
                $('.toast-body').css('font-size', 16);
                $('.toast-body').text(xhr.responseText);
                $('.toast').toast("show");
            }
        });
    });

    // $('.deleteComment').click(function (e) {
    //     e.preventDefault();
    //     const id = $(this).attr("commentId");
    //     console.log(id);
    //     console.log('saeed sdaed a');
    //     $.ajax({
    //         type: "delete",
    //         url: `/articles/comment/${id}`,
    //         success: function (response) {
    //             console.log(response);
    //             $('div').remove(`.${id}`);
    //         },
    //         error: function (xhr) {
    //             $('.toast-body').removeClass('text-success');
    //             $('.toast-body').addClass('text-danger');
    //             $('.toast-body').css('border', '1px solid red');
    //             $('.toast-body').css('font-size', 16);
    //             $('.toast-body').text(xhr.responseText);
    //             $('.toast').toast("show");
    //         }
    //     });
    // });

    let users = $('#appendDiv').html();

    function appendData(record) {
        $("#appendDiv").append(`
            <div   class="${record._id}">
                <div class="col-12">
                    <div class="media g-mb-30 media-comment">
                        <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30 userComment">
                            <div class="g-mb-15">
                                <h5 class="h5 g-color-gray-dark-v1 mb-0">${record.username.username}</h5>
                                <span class="g-color-gray-dark-v4 g-font-size-12">${record.createdAt}</span>
                            </div>
                            <p>
                                ${record.detail}
                            </p>
                            <ul class="list-inline d-sm-flex my-0">
                                <li class="list-inline-item ml-auto">
                                    <button commentId="${record._id}" class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover deleteComment button-37" onclick="test('${record._id}')">
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
        `);
    }
});

function test(recordId) { 
    // $(".deleteComment").bind('click', function (e) {
        // $(".deleteComment").click(function (e) { 
        //     e.preventDefault();
        //     console.log('ssssss');
        // });
    // });
    console.log(recordId);
    $.ajax({
        type: "delete",
        url: `/comment/${recordId}`,
        success: function (response) {
            console.log(response);
            $('div').remove(`.${recordId}`);
        },
        error: function (xhr) {
            $('.toast-body').removeClass('text-success');
            $('.toast-body').addClass('text-danger');
            $('.toast-body').css('border', '1px solid red');
            $('.toast-body').css('font-size', 16);
            $('.toast-body').text(xhr.responseText);
            $('.toast').toast("show");
        }
    });
 }