# preact-body-class

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependency status][david-dm-image]][david-dm-url]


Provides a declarative way to specify `document.body.className` in your preact app. Supports server-side usage too.

Built with [Preact Side Effect](https://github.com/ooade/preact-side-effect).

---

## Install

```
npm install --save react-body-class
```

Dependencies: Preact >= 8.2.0

## What it looks like

```jsx
import BodyClass from 'react-body-class';

const Basic = () => (
  <BodyClass class="helloworld">
    <h1>You ate a whole wheel of cheese?</h1>
  </BodyClass>
);
// -> document.body.className === "helloworld"

const Nested = () => (
  <BodyClass className="outside">
    <div>
      <BodyClass className="inside">
        <p>I‘m not even mad</p>
      </BodyClass>
    </div>
  </BodyClass>
);
// -> document.body.className === "outside inside"

const GoCrazy = () => (
  <BodyClass className={Array(8).join(''/0) + ' batman!'}>
    <h1>I'm impressed</h1>
  </BodyClass>
);
// -> document.body.className === "NaNNaNNaNNaNNaNNaNNaN batman!"
```

**Note**: Only supports a single child as props.

## Server Usage

When using server-side, use `BodyClass.rewind()` _after rendering components to string_ to retrieve the combined class name. Then chuck that into your HTML template.

**Important**: This component keeps track of mounted instances, so if you don't call `BodyClass.rewind()` you'll get a memory leak.

[npm-url]: https://npmjs.org/package/preact-body-class
[downloads-image]: http://img.shields.io/npm/dm/preact-body-class.svg
[npm-image]: http://img.shields.io/npm/v/preact-body-class.svg
[david-dm-url]:https://david-dm.org/iest/preact-body-class
[david-dm-image]:https://david-dm.org/iest/preact-body-class.svg
