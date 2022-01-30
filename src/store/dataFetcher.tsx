import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../hooks';
import { incrementByMount, incrementByMountError } from './reducers';

export const fetchValue = createAsyncThunk(
  'fetch-value',
  async (amount: number) => {
    const response = await axios('/fetch-value', { params: amount });
    return response.data;
  },
);

export const fetchValueAsyncByHandle = (amount: number): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await axios('/fetch-value', { params: amount });
      if (response.data.success) {
        dispatch(incrementByMount(amount));
      } else {
        incrementByMountError();
      }
    } catch (error) {
      dispatch(incrementByMountError());
    }
  };
};
