import { View, ActivityIndicator, Platform, StyleSheet } from 'react-native';

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  const osName = Platform.OS;

  if (!isLoading) return null;

  return (
    <View style={styles.overlay} className="bg-primary/60">
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size={osName === 'ios' ? 'large' : 50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
