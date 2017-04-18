export const REQUEST_GET_JKF = 'REQUEST_GET_JKF';
export const RECEIVE_GET_JKF = 'RECEIVE_GET_JKF';
export const REQUEST_PUT_JKF = 'REQUEST_PUT_JKF';
export const RECEIVE_PUT_JKF = 'RECEIVE_PUT_JKF';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const MOVE_PIECE = 'MOVE_PIECE';
export const CHANGE_COMMENTS = 'CHANGE_COMMENTS';

export const GOTO_PATH = 'GOTO_PATH';
export const MOVE_UP_FORK = 'MOVE_UP_FORK';
export const MOVE_DOWN_FORK = 'MOVE_DOWN_FORK';
export const REMOVE_FORK = 'REMOVE_FORK';

export function fetchJKF() {
  return dispatch => {
    dispatch(requestGetJKF());
    return fetch('/jkf')
      .then(response => response.json())
      .then(json => dispatch(receiveGetJKF(json)));
  };
}

export function storeJKF(jkf) {
  return (dispatch, getState) => {
    dispatch(requestPutJKF());
    const state = getState();
    const body = JSON.stringify(state.jkf, null, '  ');
    fetch('/jkf', { method: 'PUT', body: body })
      .then(() => {
        dispatch(receivePutJKF());
        setTimeout(() => dispatch(clearMessage()), 5000);
      });
  };
}

export function requestGetJKF() {
  return { type: REQUEST_GET_JKF };
}

export function receiveGetJKF(jkf) {
  return { type: RECEIVE_GET_JKF, jkf: jkf };
}

export function requestPutJKF() {
  return { type: REQUEST_PUT_JKF };
}

export function receivePutJKF() {
  return { type: RECEIVE_PUT_JKF };
}

export function clearMessage() {
  return { type: CLEAR_MESSAGE };
}

export function inputMove(move) {
  return { type: MOVE_PIECE, move: move };
}

export function changeComments(value) {
  return { type: CHANGE_COMMENTS, value: value };
}

export function gotoPath(pathArray) {
  return { type: GOTO_PATH, pathArray: pathArray };
}

export function moveUpFork(pathArray) {
  return { type: MOVE_UP_FORK, pathArray: pathArray };
}

export function moveDownFork(pathArray) {
  return { type: MOVE_DOWN_FORK, pathArray: pathArray };
}

export function removeFork(pathArray) {
  return { type: REMOVE_FORK, pathArray: pathArray };
}
