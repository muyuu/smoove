# antibase-smoothscroll

this code is javascript smoothscroll library for browser(contain ie8).

## dependences
- jquery@1.12.0

## install
npm install --save-dev antibase-smoothscroll

## usage

### browserify

- html
```
<a class="js-smoothscroll" href="#abc">anchor link</a>

<div id="abc">
    <!-- code -->
</div>
```

- javascript
```
var smoothscroll = require("smoothscroll");

smoothscroll();

```

#### not browserify

- html
```
<a class="js-smoothscroll" href="#abc">anchor link</a>

<div id="abc">
    <!-- code -->
</div>

...

<script src="smoothscroll.js"></script>
<script src="app.js"></script>
```

- javascript
```
uiSmoothscroll();
```
