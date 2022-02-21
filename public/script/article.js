$(document).ready(function () {
    let x = document.getElementById('content').innerText;
    decodeHTMLEntities(x);

    x = $(`.date`).text();
    x = new Date(x);

    var datestring = ("0" + x.getDate()).slice(-2) + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" +
        x.getFullYear();

    $(`.date`).text(datestring);

    $('#replyBtn').click(function (e) {
        e.preventDefault();

    });


    $('#commentbtn').click(function (e) {
        e.preventDefault();
        const detail = $('#commentInp').val();
        const parentCommentId = $('#parentCommentId').val();
        const id = $("#ArticleId").val();

        const data = {
            detail,
            parentCommentId,
        };
        console.log(data);
        $.ajax({
            type: "POST",
            url: `/articles/comment/${id}`,
            data,
            success: function (response) {
                console.log(response);
                createComment(response.data);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert(xhr.status);
            }
        });

    });

});

function createComment(record) {
    $('#commentSection').append(`
        <form>
            <div class="col-12">
                <div class="media g-mb-30 media-comment">
                    <img class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                        src="/images/avatars/${record.username.avatar}"
                        alt="Image Description">
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
                                <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                    href="#!">
                                    <i class="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
                                    Reply
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </form> 
`);
}

function decodeHTMLEntities(text) {
    return $("#content")
        .html(text)
        .text();
}