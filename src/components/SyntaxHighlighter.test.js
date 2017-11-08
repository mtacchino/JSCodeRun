import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import SyntaxHighlighter from './SyntaxHighlighter';

describe('SyntaxHighlighter', () => {
  it('should colorize basic keywords', () => {
    const rendered = renderer.create(<SyntaxHighlighter text="var something" />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should colorize function-type keywords', () => {
    const rendered = renderer.create(<SyntaxHighlighter text="function something" />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should colorize advanced-type keywords', () => {
    const rendered = renderer.create(<SyntaxHighlighter text="class something" />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should colorize strings', () => {
    const rendered = renderer
      .create(<SyntaxHighlighter text={'`one string` \'two string\' "three string"'} />)
      .toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should colorize numbers', () => {
    const rendered = renderer.create(<SyntaxHighlighter text="number 3" />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should colorize comments', () => {
    const rendered = renderer.create(<SyntaxHighlighter text="something //with comments\n" />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should keep other words default color', () => {
    const rendered = renderer.create(<SyntaxHighlighter text="something" />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
