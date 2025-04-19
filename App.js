

import RootNavigation from './src/navigation/RootNavigation'
import * as SecureStore from 'expo-secure-store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { persistor, store } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect } from 'react'
import { loginSuccess, logout } from './src/store/slices/authSlice'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/api/queryClient'
import i18n from './src/i18n/i18n'
import { I18nextProvider } from 'react-i18next'

 function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <SafeAreaProvider>
              <AuthLoader />
            </SafeAreaProvider>
          </I18nextProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

const AuthLoader = () => {
  const language = useSelector((state) => state.i18n.language)
  const dispatch = useDispatch()

    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language)
      }
    }, [language])

    useEffect(() => {
      const checkAuth = async () => {
        const creds = await SecureStore.getItemAsync('accessToken')
        if (creds) {
          dispatch(loginSuccess({ token: creds }))
        } else {
          dispatch(logout())
        }
      }
    
    checkAuth()
  }, [dispatch])

  return <RootNavigation />
}

export default App