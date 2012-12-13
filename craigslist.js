var posting = {
    email: $('#replytext').next().children().text(),
    posting_title: $('#postingtitle').text(),
    id: parseInt($('.postingidtext').text().replace('PostingID:', ''), 10),
    google_map: $('#userbody small').children().first().attr('href'),
    images: $("#iwt").find('a').map(function(){return this.href}).toArray(),
    url: window.location.href,
    lat: $("#leaflet").data('latitude'),
    lon: $("#leaflet").data('longitude')
};

var msg = {
    "page": "craigslist",
    "data": posting
};

chrome.extension.sendMessage(msg, function(response) {
    if (response.template) {
        var maillink = $('#replytext').next().children().first();
        maillink.attr('href', maillink.attr('href').replace('&body=', '&body='+encodeURIComponent(response.template)));
    }
});
