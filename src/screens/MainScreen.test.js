import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import MainScreen from './MainScreen';

jest.mock('../components/CodeEditor', () => 'CodeEditor');
jest.mock('../components/Output', () => 'Output');
jest.mock('../components/HeaderBar', () => 'HeaderBar');

describe('MainScreen', () => {
  it('should render correctly', () => {
    const rendered = renderer.create(
      <MainScreen />
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
})