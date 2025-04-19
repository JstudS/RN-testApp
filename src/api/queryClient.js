import { QueryClient, useQuery } from '@tanstack/react-query'
import { authApi, contentApi } from './axios'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 60 * 24
        }
    }
})

const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage
})

persistQueryClient({
    queryClient,
    persister: asyncStoragePersister,
    maxAge: 1000 * 60 * 60 * 24
})

const fetchPosts = async () => {
    const response = await contentApi.get('/posts?_limit=3')
    return response.data
}

const fetchComments = async () => {
    const response = await contentApi.get('/comments?_limit=3')
    return response.data
}


export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    })
}

export const useComments = () => {
    return useQuery({
        queryKey: ['comments'],
        queryFn: fetchComments
    })
}