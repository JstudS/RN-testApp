import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import * as SecureStore from 'expo-secure-store'
import { getRefreshTokenFromSecureStore } from './secureStore'

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// createAuthRefreshInterceptor(api, async failedRequest => {
//   const refreshToken = await getRefreshTokenFromSecureStore()

//   const response = await api.post('/auth/refresh', {refreshToken})

//   const newAccessToken = response.data.accessToken

//   failedRequest.response.config.headers['Authorization'] = `Bearer ${newAccessToken}`

//   await SecureStore.setItemAsync('accessToken', newAccessToken) 

//   return Promise.resolve();
// }) 