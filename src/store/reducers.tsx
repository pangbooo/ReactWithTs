import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { fetchValue } from './dataFetcher';

interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByMount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    incrementByMountError: (state) => {
      state.status = 'failed';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchValue.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = state.value + action.payload.result.value;
      })
      .addCase(fetchValue.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  increment,
  decrement,
  incrementByMount,
  incrementByMountError,
} = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counterFlow.value;

export default counterSlice.reducer;
