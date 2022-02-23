$(document).ready(function () {

    var d = $('#date1').text();
    d = new Date(d);

    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

    $('#date1').text(datestring);
    /////////////////////////////////////////
    var d = $('#date2').text();
    d = new Date(d);

    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

    $('#date2').text(datestring);
    //////////////////////
    var d = $('.date').length;
    for (var i = 0; i < d; i++) {
        x = $(`li.date.data${i}`).text();
        x = new Date(x);

        var datestring = ("0" + x.getDate()).slice(-2) + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" +
            x.getFullYear();

        $(`li.date.data${i}`).text(datestring);
    }

    /////////////////////////////////////////
    $('.fa-star-o').click(function (e) {
        console.log('sssssss');
        e.preventDefault();
        let star;
        let id = $(this).attr("artId");
        if ($(this).hasClass('fa-star-o')) {
            $(this).removeClass('fa');
            $(this).removeClass('fa-star-o');
            $(this).addClass("fas");
            $(this).addClass("fa-star");
            star = 1;
        }

        else {
            $(this).addClass('fa');
            $(this).addClass('fa-star-o');
            $(this).removeClass("fas");
            $(this).removeClass("fa-star");
            star = 0;
        }

        $.ajax({
            type: "POST",
            url: `/articles/favorit/${id}`,
            data: { data: `${star}` },
            success: function (response) {
                console.log(response);
            },
            error: function (xhr) {
                console.log(xhr.status);
            }
        });

    });

});

GetData(0);



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
    <div class="blog-card">
    <div class="meta">
      <div class="photo" style="background-image:  url(/images/article/${record.image}"></div>
      <ul class="details">
        <li class="author"><a href="#">
            ${record.author.username}
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
        <a href="/articles/${record._id}">Read More</a>
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