import { Text } from '@rneui/themed';
import styles from 'lib/styles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import MapView from 'react-native-maps';

export default function MatchHome() {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Text>Match!</Text>
    </SafeAreaView>
  )
}
