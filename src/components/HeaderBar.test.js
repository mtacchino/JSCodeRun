import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import HeaderBar from './HeaderBar';
import exampleData from '../constants/examples';

jest.mock('../constants/examples', () => [
  {
    key: 'Example 1',
    runtimeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    code: 'someCode();'
  }, {
    key: 'Example 2',
    code: 'someMoreCode();'
  },
])

describe('HeaderBar', () => {
  it('should render the Header Bar correctly', () => {
    const rendered = renderer.create(
      <HeaderBar 
        runCode={() => {}}
        generateCode={() => {}}
      />
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});