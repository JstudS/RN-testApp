

import RootNavigation from './src/navigation/RootNavigation';
import * as SecureStore from 'expo-secure-store';
import { Provider, useDispatch } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
import { loginSuccsess, logout } from './src/store/slices/authSlice';
import { SafeAreaProvider } from 'react-native-safe-area-context';



 function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <AuthLoader />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>

  );
}

const AuthLoader = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuth = async () => {
      const creds = await SecureStore.getItemAsync('token')
      if (creds) {
        dispatch(loginSuccsess({ token: creds}))
      } else {
        dispatch(logout())
      }
    }
    
    checkAuth()
  }, [dispatch])

  return <RootNavigation />
}

export default App