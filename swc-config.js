module.exports = {
  sourceMaps: true,
  module: {
    type: 'commonjs',
  },
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
      dynamicImport: true,
    },
    transform: {
      react: {
        runtime: 'automatic',
      },
    },
  },
};
