var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

React.createElement('h1');

React.createElement('h1', {
  id: 'boom',
  className: 'whatever foo'
});

React.createElement('h1', {
  className: 'foo bar'
});

React.createElement('a', { href: 'http://www.google.com' });

React.createElement('h1', null, 'Hello World!');

React.createElement('h1', null, 'Hello World!');

React.createElement('h1', null, 5);

React.createElement('h1', null, 5);

React.createElement('h1', null, 0);

React.createElement('h1', null, React.createElement('span'), React.createElement('span'));

React.createElement('h1', null, React.createElement('span'), React.createElement('span'));

React.createElement('div', {
  'data-foo': 'bar',
  'data-bar': 'oops'
});

React.createElement('div', {
  title: 'foo'
});

const obj = { a: 1 };
React.createElement(Component, _extends({}, obj, { b: 2 }));

React.createElement(Component);

React.createElement(Component, { title: 'Hello World!' }, React.createElement('span', null, 'A child'));

React.createElement(Component, null, React.createElement('span', null, 'A child'));

React.createElement(Component, null, React.createElement('span', null, 'A child'));

React.createElement(FunctionComponent, null, React.createElement('span', null, 'A child'));
