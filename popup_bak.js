chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

   //Take the fields of user and password from the DOM of facebook log-in page
   login_link = request.url;
   // username = request.user;
   // password = request.pass;
   username = '';
   password = '';

   jQuery(document).ready(function() {
     credentials = [];
     jQuery.get('https://pm.jp.ngrok.io/chrome_ext/server/', function(data) {
       credentials = JSON.parse(data);
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
         input = {name: jQuery(this).attr('name'),
                  id:   jQuery(this).attr('id'),
                  type: jQuery(this).attr('type')};
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
     });
   });
});
