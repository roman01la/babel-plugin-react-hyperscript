import { parse } from 'babylon';

function parsePragma(pragma) {
  return parse(pragma).program.body[0].expression;
}

const parsePragmaMemd = memoize(parsePragma);

export default function (babel) {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-react-hyperscript',
    visitor: {
      CallExpression(path, { opts }) {

        if (path.node.callee.name === 'h') {

          const pragma = opts.pragma;
          const [element, props, ...children] = path.node.arguments;

          if (pragma === 'h') {
            path.node.arguments = h(t, element, props, children);
          } else {
            path.replaceWith(
              t.CallExpression(
                parsePragmaMemd(pragma || 'React.createElement'),
                h(t, element, props, children)));
          }
        }
      }
    }
  };
}

function h(t, componentOrTag, properties, children) {

  const [componentOrTagName, attrs] = parseTag(t, componentOrTag);
  const attrEntries = Object.entries(attrs);

  if (attrEntries.length > 0) {

    properties = properties || t.ObjectExpression([])

    if (t.isObjectExpression(properties)) {

      const hasClassName = properties.properties.find((prop) => prop.key.name === 'className');
      const hasId = properties.properties.find((prop) => prop.key.name === 'id');

      attrEntries
        .forEach(([key, value]) => {
          if (key === 'className' && hasClassName) {
            properties.properties = properties.properties.filter((prop) => prop.key.name !== 'className');
            properties.properties.push(
              t.ObjectProperty(
                t.Identifier(key),
                t.StringLiteral(value + ' ' + hasClassName.value.value)));
          } else if (key === 'id' && hasId) {
            properties.properties = properties.properties.filter((prop) => prop.key.name !== 'id');
            properties.properties.push(
              t.ObjectProperty(
                t.Identifier(key),
                t.StringLiteral(value + ' ' + hasId.value.value)));
          } else {
            properties.properties.push(
              t.ObjectProperty(
                t.Identifier(key),
                t.StringLiteral(value)));
          }
        });
    } else {
      children.unshift(properties);
      properties = t.ObjectExpression((
        attrEntries
          .map(([key, value]) => {
            return (
              t.ObjectProperty(
                t.Identifier(key),
                t.StringLiteral(value)));
          })
      ))
    }
  }

  if (children.length === 1 && t.isArrayExpression(children[0])) {
    children = children[0].elements;
  } else if (t.isArrayExpression(properties)) {
    children = properties.elements;
    properties = t.Identifier('null');
  }

  if (t.isObjectExpression(properties)) {

    const dataSet = (
      properties.properties
        .find((prop) => prop.key.name === 'dataset' && t.isObjectExpression(prop.value))
    );

    const attributes = (
      properties.properties
        .find((prop) => prop.key.name === 'attributes' && t.isObjectExpression(prop.value))
    );

    const attrChildren = (
      properties.properties
        .find((prop) => prop.key.name === 'children' && t.isArrayExpression(prop.value))
    );

    if (dataSet) {
      dataSet
        .value
        .properties
        .map((prop) => [prop.key.name, prop.value.value])
        .forEach(([name, value]) => {
          properties.properties.push(
            t.ObjectProperty(
              t.StringLiteral('data-' + name),
              t.StringLiteral(value)))
        });

      properties.properties = properties.properties
        .filter((prop) => prop.key.name !== 'dataset');
    }

    if (attributes) {
      attributes
        .value
        .properties
        .map((prop) => [prop.key.name, prop.value.value])
        .forEach(([name, value]) => {
          properties.properties.push(
            t.ObjectProperty(
              t.Identifier(name),
              t.StringLiteral(value)))
        });

      properties.properties = properties.properties
        .filter((prop) => prop.key.name !== 'attributes');
    }

    if (attrChildren) {
      children = children.concat(attrChildren.value.elements);

      properties.properties = properties.properties
        .filter((prop) => prop.key.name !== 'children');

      if (properties.properties.length === 0) {
        properties = t.Identifier('null');
      }
    }
  }

  let args = [componentOrTagName, properties, ...children];

  if (t.isObjectExpression(properties) && children.length > 0) {
    args = [componentOrTagName, properties, ...children];
  }

  if (t.isObjectExpression(properties) && children.length === 0) {
    args = [componentOrTagName, properties];
  }

  if (isChildren(t, properties) && children.length === 0) {
    args = [componentOrTagName, t.Identifier('null'), properties];
  }

  if (isChild(t, properties) && children.length > 0) {
    args = [componentOrTagName, t.Identifier('null'), properties, ...children];
  }

  if (properties === undefined) {
    args = [componentOrTagName, ...children];
  }

  return args;
}

function isChild(t, x) {
  return t.isStringLiteral(x) || t.isNumericLiteral(x);
}

function isChildren(t, x) {
  return isChild(t, x) || t.isArrayExpression(x);
}



const classIdSplit = /([\.#]?[a-zA-Z0-9_:-]+)/;
const notClassId = /^\.|#/;

function parseTag(t, tag) {

  if (t.isStringLiteral(tag) === false) {
    return [tag, {}];
  }

  let out = [];
  const props = {};
  const tagRawName = tag.value;

  if (!tagRawName) {
    return ['div', props];
  }

  const tagParts = tagRawName.split(classIdSplit);
  let tagName = null;

  if (notClassId.test(tagParts[1])) {
    tagName = 'div';
  }

  let classes;
  let part;
  let type;
  let i;

  for (let i = 0; i < tagParts.length; i++) {
    part = tagParts[i];

    if (!part) {
      continue;
    }

    type = part.charAt(0);

    if (!tagName) {
      tagName = part;
    } else if (type === '.') {
      classes = classes || [];
      classes.push(part.substring(1, part.length));
    } else if (type === '#') {
      props.id = part.substring(1, part.length);
    }
  }

  if (classes) {
    if (props.className) {
      classes.push(props.className);
    }

    props.className = classes.join(' ');
  }

  return tagName ? [t.StringLiteral(tagName.toLowerCase()), props] : [t.StringLiteral('div'), props];
}

function memoize(fn) {

  let mem;

  return (...args) => {
    if (mem) {
      return mem;
    } else {
      mem = fn(...args);
      return mem;
    }
  }
}
