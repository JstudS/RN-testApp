import * as SecureStore from 'expo-secure-store'

/**
 * Получить refresh token из SecureStore
 */
export const getRefreshTokenFromSecureStore = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    return refreshToken ? refreshToken : null;
  } catch (error) {
    console.error('Error retrieving token from SecureStore:', error);
    return null;
  }
}

/**
 * Сохранить refresh token в SecureStore
 */
export const saveRefreshTokenToSecureStore = async (token) => {
  try {
    await SecureStore.setItemAsync('refreshToken', token);
  } catch (error) {
    console.error('Error saving token to SecureStore:', error);
  }
}

/**
 * Удалить refresh token из SecureStore
 */
export const removeRefreshTokenFromSecureStore = async () => {
  try {
    await SecureStore.deleteItemAsync('refreshToken');
  } catch (error) {
    console.error('Error removing token from SecureStore:', error);
  }
}