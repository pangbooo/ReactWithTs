import axios from 'axios';
import { fetchValueBegin, fetchValueSuccess, fetchValueError } from './actions';

export function fetchValue() {
  return async (dispatch: any) => {
    try {
      dispatch(fetchValueBegin());
      const response = await axios.get('/fetch-value');
      const { result } = response.data;
      if (result) {
        dispatch(fetchValueSuccess(result.valueType, result.value));
      }
    } catch (error) {
      dispatch(fetchValueError());
    }
  };
}
