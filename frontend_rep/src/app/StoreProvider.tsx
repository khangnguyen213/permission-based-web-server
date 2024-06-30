'use client';

import store from '@/store';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store';
import { useRef } from 'react';
import { sessionActions } from '@/store/sessionSlice';

export default function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(sessionActions.initializeSession());
    storeRef.current.dispatch(sessionActions.fetchUserData());
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
