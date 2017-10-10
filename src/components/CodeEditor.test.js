import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import CodeEditor from './CodeEditor';

describe('CodeEditor', () => {
  it('should render correctly with code', () => {
    const rendered = renderer.create(
      <CodeEditor 
        handleCodeChange={() => {}}
        code="console.log('Hello');"/>
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
})