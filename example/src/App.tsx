import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import PouchdbMd5 from 'react-native-pouchdb-md5';

async function calcRemoteImage(): Promise<string> {
  const res = await fetch('https://www.craftz.dog/dog-icon.png');
  const blob = await res.blob();
  const md5: string = await new Promise((resolve) => {
    PouchdbMd5.binaryMd5(blob, resolve);
  });
  console.log('md5:', md5);
  return md5;
}

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    setResult('loading..');
    calcRemoteImage().then(setResult, (e) => setResult(e.message));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
