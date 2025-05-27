import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuthContext } from '@/context/auth-context';
import { PoppinsRegular, PoppinsSemiBold } from '@/components/SyledText';

export default function Header() {
  const { user, logout } = useAuthContext();

  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex flex-row gap-2 items-center">
        <Image
          source={require('@/assets/images/profile.png')}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
          className="rounded-full border border-gray-300 dark:border-gray-600"
        />
        <View className="flex flex-col">
          <PoppinsSemiBold className="text-lg">
            Hello, {user?.username?.split(/[@.]/)[0] || 'Guest'} !!
          </PoppinsSemiBold>
          <PoppinsRegular className='text-sm'>Welcome back,</PoppinsRegular>
        </View>
      </View>
      <TouchableOpacity onPress={logout}>
        <AntDesign name="logout" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
