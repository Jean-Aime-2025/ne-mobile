import { loginUser } from '@/services/user.service';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const foundUser = await loginUser(username);
      if (foundUser && foundUser.password === password) {
        setUser(foundUser);
        return true;
      } else {
        Alert.alert('Invalid credentials', 'Please check your username and password.');
        return false;
      }
    } catch (error) {
      Alert.alert('Login error', 'Something went wrong. Try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    router.replace('/(auth)/login'); 
  };

  return { user, login, logout, loading };
};