goWhenReady();

function goWhenReady() {
    if ($('#loading').css('display') == 'none') {
        window.onhashchange = go;
        go();
    } else {
        window.setTimeout(goWhenReady, 100);
    }
}

function go() {
    var match = $('.nH .hx').text().match(/craigslist.org\/doc\/roo\/([0-9]+).html/);
    if (match[1]) {
        var id = parseInt(match[1], 10);
    }

    console.log("id", id);

    var msg = {
        "page": "message",
        "id": id
    }

    chrome.extension.sendMessage(msg, function(resp) {
        console.log(resp);
    });
}
