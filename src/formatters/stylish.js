import _ from 'lodash';

const indentSize = 4;
const getIndent = (depth, offset = 0) =>
  ' '.repeat(depth * indentSize - offset);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) =>
      `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  );

  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

const stylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    const indent = getIndent(depth, 2);

    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;

      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;

      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;

      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.value1, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.value2, depth)}`,
        ].join('\n');

      case 'nested':
        return `${indent}  ${node.key}: {\n${stylish(
          node.children,
          depth + 1
        )}\n${getIndent(depth)}}`;

      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default (tree) => `{\n${stylish(tree)}\n}`;
