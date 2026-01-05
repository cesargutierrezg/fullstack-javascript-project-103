import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree, parentPath = '') => {
  const lines = tree
    .filter((node) => node.type !== 'unchanged')
    .flatMap((node) => {
      const propertyPath = parentPath ? `${parentPath}.${node.key}` : node.key;

      switch (node.type) {
        case 'added':
          return `Property '${propertyPath}' was added with value: ${formatValue(
            node.value
          )}`;

        case 'removed':
          return `Property '${propertyPath}' was removed`;

        case 'changed':
          return `Property '${propertyPath}' was updated. From ${formatValue(
            node.value1
          )} to ${formatValue(node.value2)}`;

        case 'nested':
          return plain(node.children, propertyPath);

        default:
          return [];
      }
    });

  return lines.join('\n');
};

export default plain;
