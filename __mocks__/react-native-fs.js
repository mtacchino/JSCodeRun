module.exports = {
  MainBundlePath: '/test/main/bundle/path/',
  DocumentDirectoryPath: '/test/document/directory/path/',
  mkdir: () => jest.fn(),
  readFile: () => jest.fn(),
  writeFile: () => jest.fn()
};
