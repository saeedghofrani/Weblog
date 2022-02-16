$(document).ready(function () {
    let x = document.getElementById('content').innerText;
    decodeHTMLEntities(x);
});
function decodeHTMLEntities(text) {
    return $("#content")
        .html(text)
        .text();
}