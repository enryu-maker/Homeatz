import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Init, getMetaData, getPopularAction} from '../../store/actions';
import {enableScreens} from 'react-native-screens';
import {ActivityIndicator} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import HomeNav from './HomeNav';
export default function Index() {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
    await dispatch(getMetaData(setLoading));
    setLoading(false);
  };
  const location = JSON.stringify(
    useSelector(state => state.Reducers.location),
  );
  React.useEffect(() => {
    enableScreens(true);
    async function prepare() {
      try {
        init();
        new Promise(resolve => setTimeout(resolve, 5000));
        dispatch(getPopularAction(JSON.parse(location)));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide();
      }
    }
    prepare();
  }, []);

  const is_chef = useSelector(state => state.Reducers.is_chef);
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center ">
        <ActivityIndicator size="large" color={'#e53988'} />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <HomeNav />
      </NavigationContainer>
    );
  }
}
