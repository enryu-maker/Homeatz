import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Init, getMetaData, getPopularAction } from '../../store/actions';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import HomeNav from './HomeNav';
import { animation } from '../assets/animation';
import LottieView from 'lottie-react-native';
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
        <LottieView
          source={animation.loading} // Add your Lottie file path here
          autoPlay
          loop
          style={{ width: 250, height: 250 }} // Adjust size as needed
        />
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
