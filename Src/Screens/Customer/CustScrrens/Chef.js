import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Header from '../Comp/Header';
import {colors} from '../../../../Assets/theme';
import {useDispatch, useSelector} from 'react-redux';
import {getNearbyChefAction} from '../../../../Store/actions';
import {ActivityIndicator} from 'react-native-paper';
import CircularCard from '../../../Component/CircularCard';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Chef({navigation}) {
  const dispatch = useDispatch();
  const location = JSON.stringify(
    useSelector(state => state.Reducers.location),
  );
  const [loading, setLoading] = React.useState(false);
  const [chefs, setChefs] = React.useState([]);
  React.useEffect(() => {
    dispatch(getNearbyChefAction(setLoading, setChefs, JSON.parse(location)));
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header
        navigation={navigation}
        showBack={true}
        title="Chef's Menu"
        showAppend={true}
        append={
          <View
            style={{
              width: 35,
              height: 35,
            }}
          />
        }
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.logoPink} />
      ) : chefs.length == 0 ? (
        <Text
          style={{
            fontSize: 20,
            color: 'red',
            textAlign: 'center',
            fontFamily: 'BalsamiqSans-Regular',
            marginTop: 10,
          }}>
          NO CHEF'S NEARBY
        </Text>
      ) : (
        <FlatList
          style={{width: wp('100%'), marginTop: heightPercentageToDP('5%')}}
          data={chefs}
          renderItem={({item, index}) => {
            return (
              <CircularCard
                name={item.name}
                img={item.icon}
                id={item.id}
                navigation={navigation}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        />
      )}
    </View>
  );
}
