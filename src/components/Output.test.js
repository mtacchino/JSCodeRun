import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import Output from './Output';

describe('Output', () => {
  it('should render the Output correctly', () => {
    const mockOutput = [
      {
        message: 'Hello',
        status: 'OK'
      }, {
        message: 'World!',
        status: 'ERROR'
      }, 
    ]
    const rendered = renderer.create(
      <Output 
        output={mockOutput}
        onClearOutput={() => {}}
      />
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});