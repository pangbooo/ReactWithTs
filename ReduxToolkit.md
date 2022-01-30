## 1. 安装
```javascript
npm install @reduxjs/toolkit
```
## 2. 定义 store
```javascript
// src/store/index.tsx
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import counterReducer from './reducers';

export const store = configureStore({
  reducer: {
    counterFlow: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        thunk,
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## 3. 定义 type useAppDispatch、useAppSelector
```javascript
// src/hook/index.tsx
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 4. 定义 reducer
### 4.1 原生js方式
如果你使用 Redux Toolkit 的 createSlice，你应该很少需要专门单独键入一个 reducer。 如果您确实编写了一个独立的 reducer，通常声明 initialState 值的类型就足够了，并将操作键入为 AnyAction：
```javascript
import { AnyAction } from 'redux'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

export default function counterReducer(
  state = initialState,
  action: AnyAction
) {
  // logic here
}
```
### 4.2 使用 ```createSlice```
#### 4.2.1 定义initialState
```javascript
  interface CounterState {
    value: number;
    status: 'idle' | 'loading' | 'failed';
  }

  const initialState: CounterState = {
    value: 0,
    status: 'idle',
  }
```

#### 4.2.2 定义```createSlice```
```javascript
// src/store/reducer.tsx
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

  },
  extraReducers: (build) => {

  }
});
```

#### 4.2.3 添加actions
有两种方式 调用reducer
* 1) extraReducers
* 2) 使用 AppThunk

```javascript
// src/store/reducer.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // added actions
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -+1;
    },
    incrementByMount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  },
  extraReducers: (builder) => {
    // added extraReducers
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
```

```javascript
// src/store/dataFetcher.tsx
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
```

## 6. 定义 type AppThunk
```javascript
// src/hook/index.tsx
export type AppThunk<ReturnValue = void> = ThunkAction<ReturnValue, RootState, unknown, AnyAction>;
```
