h('h1');

h('h1#boom.whatever.foo');

h('h1.foo', {className: 'bar'});

h('a', {href: 'http://www.google.com'});

h('h1', null, 'Hello World!');

h('h1', 'Hello World!');

h('h1', 5);

h('h1', null, 5);

h('h1', 0);

h('h1', null, [
  h('span'),
  h('span')
]);

h('h1', [
  h('span'),
  h('span')
]);

h('div', {dataset: {foo: 'bar', bar: 'oops'}});

h('div', {attributes: {title: 'foo'}});

const obj = { a: 1 }
h(Component, { ...obj, b: 2 });

h(Component);

h(Component, {title: 'Hello World!'}, [
  h('span', 'A child')
]);

h(Component, [
  h('span', 'A child')
]);

h(Component, {children: [h('span', 'A child')]});

h(FunctionComponent, [h('span', 'A child')])
