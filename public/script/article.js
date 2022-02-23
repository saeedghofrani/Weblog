$(document).ready(function () {
    let x = document.getElementById('content').innerText;
    decodeHTMLEntities(x);

    x = $(`.date`).text();
    x = new Date(x);

    var datestring = ("0" + x.getDate()).slice(-2) + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" +
        x.getFullYear();

    $(`.date`).text(datestring);

    for (let i = 0; i < $('.commentDateC').length; i++) {
        let element = $(`#commentDate${i}`).html();
        x = new Date(element);
        var datestring = ("0" + x.getDate()).slice(-2) + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" +
            x.getFullYear();
        $(`#commentDate${i}`).text(datestring);
    }

    $('#commentbtn').click(function (e) {
        e.preventDefault();
        const detail = $('#commentInp').val();
        const parentCommentId = $('#parentCommentId').val();
        const id = $("#ArticleId").val();
        const data = {
            detail,
            parentCommentId,
        };
        $.ajax({
            type: "POST",
            url: `/articles/comment/${id}`,
            data,
            success: function (response) {
                $('#commentInp').val("");
                createComment(response.data);
                console.log(response);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert(xhr.status);
            }
        });
    });







    $("#commentShow").click(function (e) {

        e.preventDefault();
        if ($(this).text() == "Comments")
            $(this).text("Article");
        else
            $(this).text("Comments");

        $("#content").toggleClass("d-none");
        $(".commentContainer").toggleClass("d-none");
    });


    for (let i = 0; i < (($(".list-inline-item").length) - 1); i++) {
        $(`#replyBtn${i}`).click(function (e) { 
            e.preventDefault();
            let parentComment = $(this).attr("commentId");
            let commentName = $(this).attr("commentName");
            $('#parentCommentId').val(parentComment);
            $('#replyShow').html(commentName + `<i class="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>`);
        });

    }

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