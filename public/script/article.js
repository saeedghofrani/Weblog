$(document).ready(function () {
    let x = document.getElementById('content').innerText;
    decodeHTMLEntities(x);

    x = $(`.date`).text();
    x = new Date(x);

    var datestring = ("0" + x.getDate()).slice(-2) + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" +
        x.getFullYear();

        $(`.date`).text(datestring);

});
function decodeHTMLEntities(text) {
    return $("#content")
        .html(text)
        .text();
}