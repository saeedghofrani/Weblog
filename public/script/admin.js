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
        GetData(0)
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

function removeArticlle(recordId) {
    let id = recordId;
    console.log(id);
    $.ajax({
        type: "delete",
        url: "/articles/setup",
        data: { id: id },
        success: function (response) {
            $("div").remove(`.${id}`);
        },
        error: function (xhr, textStatus, errorTh) {
            alert(xhr.status);
            alert(xhr.responseText);
        }
    });
}
$('.removeArticle').click(function (e) {

});


function GetData(page) {
    $.ajax({
        type: "GET",
        url: `/articles/all=${page}`,
        success: function (response) {
            let result = [];
            for (let i = 0; i < response.data.length; i++) {
                result.push(response.data[i]);
            }

            refreshUI(result, page + 1, response.count);
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    });
}



// build cards by an object//
function createCard(record, count) {

    $('#list').append(`
    <div class="blog-card ${record._id}">
    <div class="meta">
      <div class="photo" style="background-image:  url(/images/article/${record.image}"></div>
      <ul class="details">
        <li class="author"><a href="#">
            ${record.author}
          </a></li>
        <li class='date data${count}'>
          ${record.createdAt}
        </li>
      </ul>
    </div>
    <div class="description">
      <span class=" translate-middle badge rounded-pill bg-danger">
        ${record.visitCount}
      </span>
      <span class=" translate-middle badge rounded-pill bg-danger favorit">
        <i class="fa fa-star-o favoritIcon" artId="${record._id}"></i>
      </span>
      <h1>
        ${record.title}
      </h1>
      <h2>Category: Any</h2>
      <p class="">
        ${record.description}
      </p>
      <p class="read-more">
      <a class=" removeArticle mx-2 upRE" articleid="${record._id}" onclick="removeArticlle('${record._id}')">Remove</a>
      </p>
    </div>
  </div>
    `);
}



function refreshUI(result, pageNum, count) {
    //clear all cards//
    $('#list').html('');
    console.log(pageNum);
    //countign cards in page and page numbers//
    for (let i = 0; i < Math.min(result.length, 6); i++) {
        var d = result[i].createdAt;
        d = new Date(d);

        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear();

        result[i].createdAt = datestring;
        createCard(result[i]);
    }
    pagination(count, pageNum);
}


function setPage(page) {
    pageNum = page;
    GetData(pageNum - 1);
}

//build pagination buttons//
function pagination(count, pageNum) {
    $('#pagination').html('');
    for (let i = 0; i < Math.ceil(count / 6); i++) {
        if (i == pageNum - 1) {
            $('#pagination').append(
                `<li class="active page-item" id="pagination_${i + 1}"><a onclick="setPage(${i + 1})"  class="page-link" href="#">${i + 1}</a></li>`);
        }
        else
            $('#pagination').append(
                `<li class="page-item" id="pagination_${i + 1}"><a onclick="setPage(${i + 1})"  class="page-link" href="#">${i + 1}</a></li>`);

    }
}
