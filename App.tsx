import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const checkCrashInLastSession = async () => {
      const response = await Crashes.hasCrashedInLastSession();

      if (response) {
        Alert.alert('Report', 'Sorry about that crash, we are working on it.');
      }
    };

    checkCrashInLastSession();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header />
      <Button title={'Crash app'} onPress={Crashes.generateTestCrash} />
      <Button
        title={'Send analytic event'}
        onPress={() => Analytics.trackEvent('mock analytic event')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
