window.smartlook ||
  (function (d) {
    var o = (smartlook = function () {
        o.api.push(arguments);
      }),
      h = d.getElementsByTagName('head')[0];
    var c = d.createElement('script');
    o.api = new Array();
    c.async = true;
    c.type = 'text/javascript';
    c.charset = 'utf-8';
    c.src = 'https://web-sdk.smartlook.com/recorder.js';
    h.appendChild(c);
  })(document);

smartlook('init', '5905646f6951e0b774ff7bf16a9a53be25c322b6', { region: 'eu' });
