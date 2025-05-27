import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { PoppinsMedium } from '../SyledText';
import { useRouter, usePathname } from 'expo-router';

const BottomLinks = ({ type }: { type: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  type ValidPaths = '/(auth)/login' | '/(auth)/register';

  const goTo = (path: ValidPaths) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <View style={styles.bottomTextContainer}>
      {type === 'register' ? (
        <View style={styles.linkContainer}>
          <PoppinsMedium style={styles.bottomText}>
            Have an account?{' '}
          </PoppinsMedium>
          <Pressable onPress={() => goTo('/(auth)/login')}>
            <PoppinsMedium style={styles.linkText}>Login</PoppinsMedium>
          </Pressable>
        </View>
      ) : (
        <View style={styles.linkContainer}>
          <PoppinsMedium style={styles.bottomText}>
            Dont have an account?{' '}
          </PoppinsMedium>
          <Pressable onPress={() => goTo('/(auth)/register')}>
            <PoppinsMedium style={styles.linkText}>Register</PoppinsMedium>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default BottomLinks;

const styles = StyleSheet.create({
  bottomTextContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 14,
    color: '#334155',
  },
  linkText: {
    fontSize: 14,
    color: '#022a5d',
    textDecorationLine: 'underline',
  },
});
