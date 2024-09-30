// import 'react-native-gesture-handler';
import {View, Text, StatusBar, Platform, Linking} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {request, PERMISSIONS, requestMultiple} from 'react-native-permissions';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://1d1d618aac99cd49a8d37361a53f8a20@o4507077796495360.ingest.de.sentry.io/4507077807767632',
});
function App() {
  React.useEffect(() => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            PERMISSIONS.IOS.LOCATION_ALWAYS,
          ]
        : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          ],
    ).then(statuses => {});
  }, []);
  React.useEffect(() => {
    // handles deep link when app is already open
    Linking.addEventListener('url', evt => {
      console.log(evt.url);
    });

    // handles deep link when app is not already open
    Linking.getInitialURL()
      .then(url => console.log('Initial URL:', url))
      .catch(console.warn);

    return () => {
      // clears listener when component unmounts
      Linking.removeAllListeners('url');
    };
  }, []);
  return (
    <Provider store={store}>
      {/* <SafeAreaProvider> */}
      <StatusBar
        backgroundColor={'#e53988'}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      {/* <Index /> */}
      {/* </SafeAreaProvider> */}
    </Provider>
  );
}

export default Sentry.wrap(App);
