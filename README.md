# mobile-alert-ui
mobile alert ui component

# Install
> use bower

```bash
bower install mobile-alert-ui --save
```

> [Download source](https://raw.githubusercontent.com/wahaha2012/mobile-alert-ui/master/bundle.js)

# Usage
> global

```html
<script src="./bundle.js"></script>
```

> amd or cmd

```js
var AlertUI = require('mobile-alert-ui/bundle');
```

# Demo
> full features: title bar, text info, buttons

```js
new AlertUI({
    title: 'Demo Notice',
    content: 'Hello World'
});
```


> one confirm button

```js
new AlertUI({
    content: 'Hello World',
    cancelBtn: false
});
```


> use title bar, but no button

```js
new AlertUI({
    title: 'Demo Notice',
    content: 'Hello Word',
    cancelBtn: false,
    confirmBtn: false,
    stayTime: 5
})
```

# API
```js
config : {
    /*text infomations*/
    title: 'Notice', //dialogue title, default [Null]
    content: 'Hello World', //dialogue info, default [Null]
    confirmBtn: 'OK', //confirm button text, default ['OK']
    cancelBtn: 'Cancel', //cancel button text, default ['cancel']
 
    /*switch options*/
    showOverlay: true, //whether show dialogue overlay, default [true]
    autoShow: true, //whether auto show dialogue, default [true]
    stayTime: 2, //dialogue stay time, default [2](seconds)
  
    /*event handlers*/
    onConfirm: function(){}, //confirm button event handler
    onCancel: function(){}, //cancel button event handler
    onShow: function(){}, //dialogue show event handler
    onClose: function(){} //dialogue close event handler
}
```

