import { delay } from 'redux-saga'
import { put, call, select, takeLatest } from 'redux-saga/effects';

import {
  REQUEST_GET_JKF, RECEIVE_GET_JKF, REQUEST_PUT_JKF, RECEIVE_PUT_JKF, FAIL_PUT_JKF,
  CHANGE_AUTO_SAVE, MOVE_PIECE, GO_BACK, GO_FORWARD, GO_BACK_FORK, GO_FORWARD_FORK,
  CHANGE_COMMENTS, MOVE_UP_FORK, MOVE_DOWN_FORK, REMOVE_FORK,
  receiveGetJKF, requestPutJKF, receivePutJKF, failPutJKF, clearMessage, scrollToCenter
} from './actions';
import { getAutoSaveNeeded, getJKF } from './selectors';
import Api from './api';

export default function* rootSaga() {
  yield [
    watchActions(),
  ];
}

function* watchActions() {
  yield [
    takeLatest(REQUEST_GET_JKF, fetchJKF),
    takeLatest(REQUEST_PUT_JKF, storeJKF),
    takeLatest(
      [RECEIVE_GET_JKF, RECEIVE_PUT_JKF, FAIL_PUT_JKF],
      clearMessageLater),
    takeLatest(
      [MOVE_PIECE, GO_BACK, GO_FORWARD, GO_BACK_FORK, GO_FORWARD_FORK],
      scrollToCurrentNode),
    takeLatest(
      [CHANGE_AUTO_SAVE, MOVE_PIECE, CHANGE_COMMENTS, MOVE_UP_FORK, MOVE_DOWN_FORK, REMOVE_FORK],
      autoSaveIfNeeded)
  ]
}

export function* fetchJKF() {
  // TODO: Handle error
  const jkf = yield call(Api.fetchJKF);
  yield put(receiveGetJKF(jkf));
}

export function* storeJKF() {
  const jkf = yield select(getJKF);
  try {
    yield call(Api.storeJKF, jkf);
    yield put(receivePutJKF());
  } catch (e) {
    yield put(failPutJKF(e));
  }
}

export function* clearMessageLater() {
  yield call(delay, 5000);
  yield put(clearMessage());
}

export function* scrollToCurrentNode() {
  yield put(scrollToCenter());
}

export function* autoSaveIfNeeded() {
  const isAutoSaveNeeded = yield select(getAutoSaveNeeded);
  if (isAutoSaveNeeded) {
    yield call(delay, 500);
    yield put(requestPutJKF());
  }
}
