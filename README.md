# babel-plugin-react-hyperscript

[![npm](https://img.shields.io/npm/v/babel-plugin-react-hyperscript.svg)](https://www.npmjs.com/package/babel-plugin-react-hyperscript)

*HyperScript syntax for React components without runtime overhead.*

Compiles [react-hyperscript](https://github.com/mlmorg/react-hyperscript) into `React.createElement`.


## Example

**Input**
```js
h('h1#boom.whatever.foo', [
  h('span'),
  h(MyComponent, { text: 'Hello!' })
]);
```

**Output**
```js
React.createElement('h1', {
  id: 'boom',
  className: 'whatever foo'
},
React.createElement('span'),
React.createElement(MyComponent, { text: 'Hello!' }));
```

## Installation

```
npm i babel-plugin-react-hyperscript
```

## Plugin options

**pragma**

By default calls to `h` will be replaced with `React.createElement`, but you can override this with a custom pragma (including `h` itself when used with [Preact](https://github.com/developit/preact)).
```js
{
  "plugins": ["react-hyperscript", { "pragma": "yo" }]
}
```

```js
// Input
h('h1#boom.whatever.foo', [
  h('span'),
  h(MyComponent, { text: 'Hello!' })
]);

// Output
yo('h1', {
  id: 'boom',
  className: 'whatever foo'
},
yo('span'),
yo(MyComponent, { text: 'Hello!' }));
```

## Usage

### Via .babelrc (Recommended)

__.babelrc__
```json
{
  "plugins": ["react-hyperscript"]
}
```

### Via CLI
```
babel --plugins react-hyperscript script.js
```

### Via Node API
```js
require("babel-core").transform("code", {
  plugins: ["react-hyperscript"]
});
```

## License
MIT
