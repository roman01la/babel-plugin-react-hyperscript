# babel-plugin-react-hyperscript

*HyperScript components syntax for React without runtime overhead.*

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
