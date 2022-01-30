## 1. 安装
## 2. 定义 store
## 3. 定义 type useAppDispatch、useAppSelector
## 4. 定义 reducer
  ### 4.1 原生js方式
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
  #### 1) 使用 AppThunk
  #### 2) extraReducers

## 5. 定义 type AppThunk
