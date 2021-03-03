// check login session
var pm_session;
// chrome.storage.local.get("pm_session", function (value) {
//   var value_data = value.pm_session;
//   alert(value.pm_session);
// });
// chrome.storage.local.set({'key': 'aeaewrawraw'}, function () {
// });
// chrome.storage.local.get('pm_session', function (value) {
//   pm_session = value.pm_session;
// });

back_url = 'https://pm-back.jp.ngrok.io/';
front_url = 'https://pm.jp.ngrok.io/chrome_ext/frontend/src/pm_server/';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.login == true) {
      if (request.pm_session != '') {
        chrome.storage.local.set({'pm_session': request.pm_session}, function () {
        });
      }
    } else {
      chrome.storage.local.get('pm_session', function (value) {
        pm_session = value.pm_session;
        if (pm_session === null || pm_session === undefined || pm_session.length == 0) {
          chrome.tabs.create({"url": front_url + 'index.html'});
        } else {
          sendResponse({pm_session: pm_session});
        }
      });
      return true;
    }
    return false;
  }
);
