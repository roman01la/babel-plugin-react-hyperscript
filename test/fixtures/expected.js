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

React.createElement('div', { dataset: { foo: 'bar', bar: 'oops' } });

React.createElement('div', { attributes: { title: 'foo' } });

React.createElement(Component);

React.createElement(Component, { title: 'Hello World!' }, React.createElement('span', null, 'A child'));

React.createElement(Component, null, React.createElement('span', null, 'A child'));

React.createElement(Component, { children: [React.createElement('span', null, 'A child')] });

React.createElement(FunctionComponent, null, React.createElement('span', null, 'A child'));
