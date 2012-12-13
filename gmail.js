goWhenReady();

s = document.createElement('script');
s.src ='https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
document.getElementsByTagName('body')[0].appendChild(s);

// Wait until page has loaded
function goWhenReady() {
    if ($('#loading').css('display') == 'none') {
        window.onhashchange = loadSidebar;
        loadSidebar();
    } else {
        window.setTimeout(goWhenReady, 100);
    }
}

function loadSidebar() {
    var match = $('.nH .hx').text().match(/craigslist.org\/doc\/roo\/([0-9]+).html/);

    // Page is displaying message view
    if (match && match[1]) {
        var id = parseInt(match[1], 10);

        var msg = {
            "page": "message",
            "id": id
        }

        chrome.extension.sendMessage(msg, function(resp) {

            if (parseInt(resp.lat, 10) && parseInt(resp.lon, 10)) {
                var a2 = document.createElement('a');
                a2.href = resp.google_map;
                var img2 = document.createElement('img');
                img2.src = chrome.extension.getURL('map.png');
                img2.src = 'http://api.tiles.mapbox.com/v3/aibram.map-608jht8m/pin-m-star+ff6633(' + resp.lon + ',' + resp.lat+ ')/'+resp.lon + ',' + resp.lat + ',14/220x220.png';
                img2.className = 'mapimg';
                a2.appendChild(img2);
                $('.nH .adC').prepend(a2);
            }

            if (resp.images.length) {
                var a = document.createElement('a');
                a.href = resp.url;
                var img = document.createElement('img');
                img.src = resp.images[0];
                img.className = 'photo';
                a.appendChild(img);
                $('.nH .adC').prepend(a);
            }

        });
    }
}

