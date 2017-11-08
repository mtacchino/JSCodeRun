import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import ModalHeader from './ModalHeader';

describe('ModalHeader', () => {
  it('should render the ModalHeader correctly', () => {
    const props = {
      title: 'test',
      onClose: () => jest.fn()
    };
    const rendered = renderer.create(<ModalHeader {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
