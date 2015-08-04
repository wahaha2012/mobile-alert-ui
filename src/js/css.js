// css style
    (function(){
        var css = '{{{css}}}';

        var link = document.createElement('style');
        var head = document.getElementsByTagName("head")[0];
        link.setAttribute('type','text/css');
        link.innerHTML = css;

        head.appendChild(link);
    })();