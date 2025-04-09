import { Image, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { setupFCMListeners, requestUserPermission } from '@/components/notification';

export default function HomeScreen() {
  useEffect(() => {
    requestUserPermission();
    setupFCMListeners();
  })

  return (
    <WebView style={styles.container} source={{ uri: "http://10.0.2.2:3000" }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  }
});
