import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import reducer from './fileSystem';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'not an action' })).toMatchSnapshot();
  });

  it('should return state after file save success', () => {
    expect(reducer(undefined, { type: 'FILE_SAVE_SUCCESS' })).toMatchSnapshot();
  });

  it('should return state after file save failure', () => {
    expect(reducer(undefined, { type: 'FILE_SAVE_FAILURE', err: 'save error' })).toMatchSnapshot();
  });

  it('should return state after file delete failure', () => {
    expect(reducer(undefined, { type: 'FILE_DELETE_FAILURE', err: 'delete error' })).toMatchSnapshot();
  });

  it('should return state after file open success', () => {
    expect(reducer(undefined, { type: 'FILE_OPEN_SUCCESS' })).toMatchSnapshot();
  });

  it('should return state after file open failure', () => {
    expect(reducer(undefined, { type: 'FILE_OPEN_FAILURE', err: 'open error' })).toMatchSnapshot();
  });

  it('should return state after edit code', () => {
    expect(reducer(undefined, { type: 'EDIT_CODE' })).toMatchSnapshot();
  });
});
