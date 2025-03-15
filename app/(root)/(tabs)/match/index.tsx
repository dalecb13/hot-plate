import { Text } from '@rneui/themed';
import Map from 'components/map';
import styles from 'lib/styles';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// import MapView from 'react-native-maps';

export default function MatchHome() {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Map />
    </SafeAreaView>
  )
}
