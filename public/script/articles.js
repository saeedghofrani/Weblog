$(document).ready(function () {
    var d = $('#date1').text()
    d = new Date(d);

    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

    $('#date1').text(datestring);
/////////////////////////////////////////
    var d = $('#date2').text()
    d = new Date(d);

    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

    $('#date2').text(datestring);
//////////////////////
    var d = $('.date').length
    for (var i = 0; i < d; i++) {
        x = $(`li.date.data${i}`).text()
        x = new Date(x);

        var datestring = ("0" + x.getDate()).slice(-2) + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" +
            x.getFullYear();
    
            $(`li.date.data${i}`).text(datestring);
    }
   

});