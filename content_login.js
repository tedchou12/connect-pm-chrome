// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// });
pm_session = localStorage.getItem('pm_session');

if (pm_session === null || pm_session === undefined || pm_session.length == 0) {

} else {
  chrome.runtime.sendMessage({login: true, pm_session: pm_session}, function(response) {
  });
}
