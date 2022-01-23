import { StoreState } from '../types';
// import { ActionsAll } from './actions';
import { FETCH_VALUE_BEGIN, FETCH_VALUE_SUCCESS, FETCH_VALUE_ERROR } from './actions/constants';

const initState: StoreState = {
  languageName: 'TypeScript',
  enthusiasmLevel: 1,
  isError: null,
  errorToShow: '',
};

export function reducer(state = initState, action: any): StoreState {
  switch (action.type) {
    case FETCH_VALUE_BEGIN:
      return {
        ...state,
        isError: null,
        errorToShow: '',
      };
    case FETCH_VALUE_SUCCESS:
      return {
        ...state,
        enthusiasmLevel: action.payload.valueType === 'add'
          ? state.enthusiasmLevel + action.payload.value
          : state.enthusiasmLevel - action.payload.value,
      };
    case FETCH_VALUE_ERROR:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
}
