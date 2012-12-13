var storage = chrome.storage.sync;
chrome.extension.onMessage.addListener(
  function(req, sender, sendResponse) {

      if (req.page === "craigslist") {

          storage.get(req.data.email, function(ret) {
              ret[req.data.email] = ret[req.data.email] || [];
              ret[req.data.email].push(req.data.id);
              storage.set(ret);
          });

          var id = req.data && req.data.id;
          id = "" + id;

          var s = {};
          s[id] = req.data;
          storage.set(s, function() {
              storage.get(id);
          });

          storage.get("template", function(r) {
              sendResponse(r);
          });

      } else if (req.page === "message") {

          storage.get("" + req.id, function(resp) {
              sendResponse(resp[req.id]);
          });
      }

      return true;
  });
