import React from 'react';
import {View} from 'react-native';
// import ChefNav from './ChefNav';
// import HomeNav from './HomeNav';
import {useDispatch, useSelector} from 'react-redux';
import {Init, getMetaData, getPopularAction} from '../../Store/actions';
import {enableScreens} from 'react-native-screens';
import {ActivityIndicator} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import Login from '../Screens/Customer/CustScrrens/Login';
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
        // await analytics().logEvent('user', {
        //   item: 'User Details',
        //   description: ['round neck', 'long sleeved'],
        // })
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" className="text-logoPink" />
      </View>
    );
  } else {
    return (
      <>
        {/* {
          !is_chef ?
            <HomeNav />
            :
            <ChefNav />
        } */}
        <Login />
      </>
    );
  }
}
