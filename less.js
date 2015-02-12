var less = require('less-dist');

if (typeof window !== 'undefined') {

  var head = document.getElementsByTagName('head')[0];

  // get all link tags in the page
  var links = document.getElementsByTagName('link');
  var linkHrefs = [];
  for (var i = 0; i < links.length; i++) {
    linkHrefs.push(links[i].href);
  }

  var loadStyle = function(url) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var data = request.responseText;

          //render it using less
          less.render(data).then(function(data){
            //inject it into the head as a style tag
            var style = document.createElement('style');
            style.textContent = data.css;
            head.appendChild(style);
            resolve('');
          });

        } else {
          // We reached our target server, but it returned an error
          reject()
        }
      };

      request.onerror = function(e) {
        reject(e)
      };

      request.send();
    });
  }

  exports.fetch = function(load) {
    // don't reload styles loaded in the head
    for (var i = 0; i < linkHrefs.length; i++)
      if (load.address == linkHrefs[i])
        return '';
    return loadStyle(load.address);
  }
}
else {
  // setting format = 'defined' means we're managing our own output
  exports.translate = function(load) {
    load.metadata.format = 'defined';
  }
  exports.bundle = function(loads, opts) {
    var loader = this;
    if (loader.buildCSS === false)
      return '';
    return loader.import('./less-builder', { name: module.id }).then(function(builder) {
      return builder.call(loader, loads, opts);
    });
  }
}