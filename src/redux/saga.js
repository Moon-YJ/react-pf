/*
  - saga 전용 내장 함수
    : takeLatest(제일 마지막 요청만 수행 - 아마도 Debounce가 적용되어있을 것), takeEvery (들어오는 모든 요청을 전부수행)
    : call (saga에서 api관련 fetching함수를 호출하때 쓰는 함수, 두번째 인수값 전달가능)
    : put (saga에서 만들어진 액션객체를 리듀서에 전달, 기존 dispatch와 동일)
    : fork (saga에서 제너레이터 호출 및 이터러블 객체 반환 함수)  
    : all (iterable 객체를 비동기적으로 그룹호출 함수)
*/
import { takeLatest, call, put, fork, all } from '@redux-saga/core/effects';
import { fetchDepartment, fetchFlickr, fetchHistory, fetchYoutube } from './api';
import * as types from './actionType';

// Department Server Data
// 순서1 - 초기 action타입을 인지해서 fetching 관련 메서드를 대신 호출해주는 함수 정의
function* callMembers() {
	yield takeLatest(types.MEMBERS.start, returnMembers);
}
// 순서2 - 데이터 fetching후 비동기 데이터 상태에 따라 action객체를 만들어서 reducer로 전달하는 함수 정의
function* returnMembers() {
	try {
		const response = yield call(fetchDepartment);
		yield put({ type: types.MEMBERS.success, payload: response.members });
	} catch (err) {
		yield put({ type: types.MEMBERS.fail, payload: err });
	}
}

// History Server Data
function* callHistory() {
	yield takeLatest(types.HISTORY.start, function* () {
		try {
			const response = yield call(fetchHistory);
			yield put({ type: types.HISTORY.success, payload: response.history });
		} catch (err) {
			yield put({ type: types.HISTORY.fail, payload: err });
		}
	});
}

// Youtube Server Data
function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, function* () {
		try {
			const response = yield call(fetchYoutube);
			yield put({ type: types.YOUTUBE.success, payload: response.items });
		} catch (err) {
			yield put({ type: types.YOUTUBE.fail, payload: err });
		}
	});
}

// Flickr Server Data
function* callFlickr() {
	yield takeLatest(types.FLICKR.start, function* (action) {
		try {
			const response = yield call(fetchFlickr, action.opt);
			yield put({ type: types.FLICKR.success, payload: response.photos.photo });
		} catch (err) {
			yield put({ type: types.FLICKR.fail, payload: err });
		}
	});
}

// function* returnHistory() {
// 	try {
// 		const response = yield call(fetchHistory);
// 		yield put({ type: types.HISTORY.success, payload: response.history });
// 	} catch (err) {
// 		yield put({ type: types.HISTORY.fail, payload: err });
// 	}
// }

// 순서3 - (순서1에 해당하는 데이터별)saga메서드를 비동기적으로 호출해주는 함수를 정의 후 rootSaga라는 이름으로 export(추후 미들웨어로 reducer에 적용됨)
export default function* rootSaga() {
	yield all([fork(callMembers), fork(callHistory), fork(callYoutube), fork(callFlickr)]);
}
