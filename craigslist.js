var posting = {
    email: $('#replytext').next().children().text(),
    posting_title: $('#postingtitle').text(),
    body: $('#userbody').text(),
    id: parseInt($('.postingidtext').text().replace('PostingID:', ''), 10),
    google_map: $('#userbody small').children().first().attr('href')
};

var msg = {
    "page": "craigslist",
    "data": posting
};

chrome.extension.sendMessage(msg, function(response) {
    console.log("sending", msg);
    console.log(response);
});
