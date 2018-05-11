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
    it('should produce a single output when code is logged', () => {
      const instance = renderer.create(<MainScreen />).getInstance();
      instance.setState({
        code: 'console.log("Test output")'
      });
      const expected = [
        {
          message: '"Test output"',
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
          message: '"Test output"',
          status: 'OK'
        },
        {
          message: '"More output"',
          status: 'OK'
        }
      ];
      instance.runCode();
      expect(instance.state.output).toEqual(expected);
    });

    it('should produce an error output when code errors', () => {
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

    it('should produce Infinity when 1/0 is logged', () => {
      const instance = renderer.create(<MainScreen />).getInstance();
      instance.setState({
        code: 'console.log(1/0)'
      });
      const expected = [
        {
          message: 'Infinity',
          status: 'OK'
        }
      ];
      instance.runCode();
      expect(instance.state.output).toEqual(expected);
    });

    it('should produce NaN when undefined/1 is logged', () => {
      const instance = renderer.create(<MainScreen />).getInstance();
      instance.setState({
        code: 'console.log(undefined/1)'
      });
      const expected = [
        {
          message: 'NaN',
          status: 'OK'
        }
      ];
      instance.runCode();
      expect(instance.state.output).toEqual(expected);
    });

    it('should produce an object when one is logged', () => {
      const instance = renderer.create(<MainScreen />).getInstance();
      instance.setState({
        code: 'console.log({ a: 1, b: NaN, c: { d: undefined, "e": "hello" } })'
      });
      const expected = [
        {
          message: '{"a": 1, "b": NaN, "c": {"d": undefined, "e": "hello"}}',
          status: 'OK'
        }
      ];
      instance.runCode();
      expect(instance.state.output).toEqual(expected);
    });

    it('should produce an array when one is logged', () => {
      const instance = renderer.create(<MainScreen />).getInstance();
      instance.setState({
        code: 'console.log([1, 2, 3])'
      });
      const expected = [
        {
          message: '[1, 2, 3]',
          status: 'OK'
        }
      ];
      instance.runCode();
      expect(instance.state.output).toEqual(expected);
    });

    it('should produce an object with arrays when one is logged', () => {
      const instance = renderer.create(<MainScreen />).getInstance();
      instance.setState({
        code: 'console.log([{a:1, b:[{c:[3]},5]}, 3,{}])'
      });
      const expected = [
        {
          message: '[{"a": 1, "b": [{"c": [3]}, 5]}, 3, {}]',
          status: 'OK'
        }
      ];
      instance.runCode();
      expect(instance.state.output).toEqual(expected);
    });
  });
});
