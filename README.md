# react-body-classname

Provides a declarative way to specify `document.body.className` in your react app. Supports server-side usage too.

Built with [React Side Effect](https://github.com/gaearon/react-side-effect).

---

## Install

```
yarn add react-body-classname
```

Dependencies: React >= 0.13.0

## What it looks like

```jsx
import BodyClassName from 'react-body-classname';

const Basic = () => (
  <BodyClassName className="helloworld">
    <h1>You ate a whole wheel of cheese?</h1>
  </BodyClassName>
);
// -> document.body.className === "helloworld"

const Nested = () => (
  <BodyClassName className="outside">
    <div>
      <BodyClassName className="inside">
        <p>I‘m not even mad</p>
      </BodyClassName>
    </div>
  </BodyClassName>
);
// -> document.body.className === "outside inside"

const GoCrazy = () => (
  <BodyClassName className={Array(8).join(''/0) + ' batman!'}>
    <h1>I'm impressed</h1>
  </BodyClassName>
);
// -> document.body.className === "NaNNaNNaNNaNNaNNaNNaN batman!"
```

**Note**: Only supports a single child as props.

## Server Usage

When using server-side, use `BodyClassName.rewind()` _after rendering components to string_ to retrieve the combined class name. Then chuck that into your HTML template.

**Important**: This component keeps track of mounted instances, so if you don't call `BodyClassName.rewind()` you'll get a memory leak.
