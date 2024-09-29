import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Header from './Comp/Header';
import FoodCard from './Comp/FoodCard';
import {colors} from '../../../Assets/theme';
import {useDispatch} from 'react-redux';
import {getTopRated} from '../../../Store/actions';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
export default function TopRated({navigation}) {
  const location = JSON.stringify(
    useSelector(state => state.Reducers.location),
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [top, setTop] = React.useState([]);
  React.useEffect(() => {
    dispatch(getTopRated(setLoading, setTop, JSON.parse(location)));
  }, []);
  console.log(top);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Header navigation={navigation} showBack={false} title="Top Rated" />
      <View
        style={{
          marginTop: 20,
          width: '100%',
        }}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.logoPink} />
        ) : (
          <FlatList
            style={{
              width: '100%',
            }}
            data={top}
            renderItem={({item, index}) => (
              <FoodCard data={item} key={index} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
              width: '100%',
            }}
          />
        )}
      </View>
    </View>
  );
}
