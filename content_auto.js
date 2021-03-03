back_url = 'https://pm-back.jp.ngrok.io/';
front_url = 'https://pm.jp.ngrok.io/chrome_ext/frontend/src/pm_server/';

login_link = window.location.href;
username = '';
password = '';

var pm_session = '';

chrome.runtime.sendMessage({login: false}, function(response) {
  pm_session = response.pm_session;
});

jQuery(document).ready(function() {
  credentials = [];
  jQuery.ajax({
    url: back_url,
    type: 'get',
    data: {
      access_token: 'XXXXXXXXXXXXXXXXXXX'
    },
    headers: {
      'Authorization': 'Bearer ' + pm_session
    },
    dataType: 'json',
    success: function (data) {
      if (data['result'] == true) {
        credentials = data['data'];
        for (i = 0; i < credentials.length; i++) {
          url = atob(credentials[i].url);
          if (login_link.replace(url, '').length < login_link.length) {
            username = atob(credentials[i].username);
            password = atob(credentials[i].password);
          }
        }

        inputs = [];
        login_form = false;
        form_var = {};
        jQuery(':input').each(function() {
          input = { name: jQuery(this).attr('name'),
                    id:   jQuery(this).attr('id'),
                    type: jQuery(this).attr('type')
                  };

          if (jQuery(this).attr('type') == 'password') {
            login_form = true;
            form_var = jQuery(this).closest('form');
          }
          inputs.push(input);
        });

        if (login_form == true) {
          for (i = 0; i < inputs.length; i++) {
            if (
                (inputs[i].name !== 'undefined' && (inputs[i].type == 'text' || inputs[i].type == undefined) && (inputs[i].name.match(/name/i) || inputs[i].name.match(/username/i) || inputs[i].name.match(/user/i) || inputs[i].name.match(/email/i))) //||
                // (inputs[i].id !== 'undefined'  && (inputs[i].id.match(/login/i) || inputs[i].id.match(/username/i) || inputs[i].id.match(/user/i)))
              ) {
                  jQuery('input[name="' + inputs[i].name + '"]').val(username);
                }

            if (
                (inputs[i].name !== 'undefined' && inputs[i].type == 'password' && (inputs[i].name.match(/pass/i) || inputs[i].name.match(/password/i) || inputs[i].name.match(/pwd/i))) //||
                // (inputs[i].id !== 'undefined' && (inputs[i].id.match(/pass/i) || inputs[i].id.match(/password/i)))
              ) {
                  jQuery('input[name="' + inputs[i].name + '"]').val(password);
                }
          }
          // form_var.submit();
          form_var.find('input[type=submit]').click();
        }
      }
    }
  });
});
