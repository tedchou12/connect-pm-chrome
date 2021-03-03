window.onload = function() {
  // console.log('in');
  // session = chrome.storage.local.get(['pm_session', pm_session], function(response) {
  //   alert(pm_session);
  // });


  document.getElementById('buttonSet').addEventListener('click',function(){
    chrome.tabs.query({}, function(tabs) {
      for(var i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, {
          user : document.getElementById('username').value,
          pass : document.getElementById('pass').value,
          url  : tabs[i].url
        }, function(response) {});
      }
    });
  });
}

console.log('in');
