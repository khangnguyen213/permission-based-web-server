import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer'; // file này sẽ tạo ở bước tiếp theo
import { sessionActions } from './sessionSlice';
import { useStore } from 'react-redux';

export const store = configureStore({
  reducer: rootReducer,
  // Middleware mặc định là redux-thunk nên không cần cấu hình nếu không dùng thêm các middleware khác
});

export const makeStore = () => store;
export type AppStore = ReturnType<typeof makeStore>;
// store.dispatch(sessionActions.fetchUserData());

// trích xuất type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppStore = useStore.withTypes<AppStore>();
