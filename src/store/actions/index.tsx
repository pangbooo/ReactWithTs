import * as types from './constants';

export interface FetchValueBegin {
  type: string;
}

export interface FetchValueSuccess {
  type: string;
  payload: {
    valueType: string;
    value: number;
  }
}

export interface FetchValueError {
  type: string;
}

export type ActionsAll = FetchValueBegin
| FetchValueSuccess
| FetchValueError;

export const fetchValueBegin = () => ({
  type: types.FETCH_VALUE_BEGIN,
});

export const fetchValueSuccess = (valueType: string, value: number) => ({
  type: types.FETCH_VALUE_SUCCESS,
  payload: { valueType, value },
});

export const fetchValueError = () => ({
  type: types.FETCH_VALUE_ERROR,
});
