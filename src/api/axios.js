import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import * as SecureStore from 'expo-secure-store'
import { getRefreshTokenFromSecureStore } from '../utlis/secureStore'

export const authApi = axios.create({
    baseURL: 'https://dummyjson.com',
})

export const contentApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
})

createAuthRefreshInterceptor(authApi, async failedRequest => {
    const refreshToken = await getRefreshTokenFromSecureStore()

    const response = await authApi.post('/auth/refresh', {refreshToken})

    const newAccessToken = response.data.accessToken

    failedRequest.response.config.headers['Authorization'] = `Bearer ${newAccessToken}`

    await SecureStore.setItemAsync('accessToken', newAccessToken) 

    return Promise.resolve()
}) 