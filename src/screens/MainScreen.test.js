import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import { MainScreen } from './MainScreen';

jest.mock('../components/CodeEditor', () => 'CodeEditor');
jest.mock('../components/Output', () => 'Output');
jest.mock('../components/HeaderBar', () => 'HeaderBar');

describe('MainScreen', () => {
  it('should render correctly', () => {
    const rendered = renderer.create(<MainScreen />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  describe('runCode', () => {
    it('should produce an array of a single output when code is logged', () => {
      const instance = renderer.create(<MainScreen />).getInstance();
      instance.setState({
        code: 'console.log("Test output")'
      });
      const expected = [
        {
          message: 'Test output',
          status: 'OK'
        }
      ];
      instance.runCode();
      expect(instance.state.output).toEqual(expected);
    });

    it('should produce an array of a multiple outputs when code is logged', () => {
      const instance = renderer.create(<MainScreen />).getInstance();
      instance.setState({
        code: 'console.log("Test output"); console.log("More output");'
      });
      const expected = [
        {
          message: 'Test output',
          status: 'OK'
        },
        {
          message: 'More output',
          status: 'OK'
        }
      ];
      instance.runCode();
      expect(instance.state.output).toEqual(expected);
    });

    it('should produce an array of a multiple error outputs when code errors', () => {
      const instance = renderer.create(<MainScreen />).getInstance();
      instance.setState({
        code: 'badcode'
      });
      const expected = [
        {
          message: 'ReferenceError: badcode is not defined',
          status: 'ERROR'
        }
      ];
      instance.runCode();
      expect(instance.state.output).toEqual(expected);
    });
  });
});
