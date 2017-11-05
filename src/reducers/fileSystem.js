import { Platform, Alert } from 'react-native';
import fs from 'react-native-fs';

const FILE_SAVE_SUBMIT = 'FILE_SAVE_SUBMIT';
const FILE_SAVE_SUCCESS = 'FILE_SAVE_SUCCESS';
const FILE_SAVE_FAILURE = 'FILE_SAVE_FAILURE';
const FILE_DELETE_SUBMIT = 'FILE_OPEN_SUBMIT';
const FILE_DELETE_SUCCESS = 'FILE_OPEN_SUCCESS';
const FILE_DELETE_FAILURE = 'FILE_OPEN_FAILURE';
const FILE_OPEN_SUBMIT = 'FILE_OPEN_SUBMIT';
const FILE_OPEN_SUCCESS = 'FILE_OPEN_SUCCESS';
const FILE_OPEN_FAILURE = 'FILE_OPEN_FAILURE';
const EDIT_CODE = 'EDIT_CODE';

const documentsDir = `${Platform.OS === 'ios' ? fs.MainBundlePath : fs.DocumentDirectoryPath}/my-files`;

// Action creators
const fileSaveSuccess = fileName => ({
  type: FILE_SAVE_SUCCESS,
  fileName
});

const fileSaveFailure = err => ({
  type: FILE_SAVE_FAILURE,
  err
});

const fileDeleteSuccess = (fileContents, fileName) => ({
  type: FILE_DELETE_SUCCESS
});

const fileDeleteFailure = err => ({
  type: FILE_DELETE_FAILURE,
  err
});

export const fileOpenSuccess = (fileContents, fileName) => ({
  type: FILE_OPEN_SUCCESS,
  fileContents,
  fileName
});

const fileOpenFailure = err => ({
  type: FILE_OPEN_FAILURE,
  err
});

export const editCode = () => ({
  type: EDIT_CODE
});

// Thunk action creators
export const fileSaveSubmit = (fileName, fileContents, onClose) => {
  const path = `${documentsDir}/${fileName}`;

  return dispatch =>
    fs
      .writeFile(path, fileContents, 'utf8')
      .then(success => {
        dispatch(fileSaveSuccess(fileName));
        onClose && onClose();
      })
      .catch(err => {
        dispatch(fileSaveFailure(err));
        Alert.alert(`There was a problem saving file: ${fileName}`, `${err.code}: ${err.message}`);
      });
};
export const fileDeleteSubmit = fileName => {
  const path = `${documentsDir}/${fileName}`;

  return dispatch =>
    fs
      .unlink(path)
      .then(fileDeleteSuccess)
      .catch(err => {
        dispatch(fileDeleteFailure(err));
        Alert.alert(err.code, err.message);
      });
};

export const fileOpenSubmit = (fileName, onClose) => {
  const path = `${documentsDir}/${fileName}`;
  return dispatch =>
    fs
      .readFile(path)
      .then(fileContents => {
        onClose(fileContents);
        dispatch(fileOpenSuccess(fileContents, fileName));
      })
      .catch(err => {
        dispatch(fileOpenFailure(err));
        Alert.alert(err.code, err.message);
      });
};

//Reducer
const initialState = { err: null, currentFile: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case FILE_SAVE_SUCCESS:
      return {
        ...state,
        isEdited: false,
        currentFile: action.fileName
      };
    case FILE_SAVE_FAILURE:
      return {
        ...state,
        error: action.err
      };
    case FILE_DELETE_FAILURE:
      return {
        ...state,
        error: action.err
      };
    case FILE_OPEN_SUCCESS:
      return {
        ...state,
        isEdited: false,
        currentFile: action.fileName
      };
    case FILE_OPEN_FAILURE:
      return {
        ...state,
        error: action.err
      };
    case EDIT_CODE:
      return {
        ...state,
        isEdited: true
      };
    default:
      return state;
  }
};
