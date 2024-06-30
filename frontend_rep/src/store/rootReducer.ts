import { combineReducers } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice'; // slice state sẽ tạo ở bước tiếp theo

export const rootReducer = combineReducers({
  session: sessionReducer,
});
