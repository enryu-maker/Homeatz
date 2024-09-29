import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React from 'react';
import Header from '../Comp/Header';
import {colors} from '../../../../Assets/theme';
import OrderCard from '../Comp/OrderCard';
import {useDispatch, useSelector} from 'react-redux';
import {getOrdersAction} from '../../../../Store/actions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../Component/ToastConfig';
export default function OrderHistory({navigation}) {
  const [active, setActive] = React.useState(0);
  const userOrders = useSelector(state => state.Reducers.userOrders);
  const [currentchefOrders, setcurrentChefOrders] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setcurrentChefOrders(userOrders['12-PM']);
    console.log(userOrders['06-PM']);
  }, [userOrders]);
  return (
    <View
      style={{
        flex: 1,
        width: wp('100%'),
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Header
        title={'Order History'}
        navigation={navigation}
        showAppend={true}
        append={
          <View
            style={{
              height: 30,
              width: 30,
            }}
          />
        }
      />
      <View
        style={{
          flexDirection: 'row',
          width: wp('100%'),
          justifyContent: 'space-evenly',
          paddingVertical: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: active == 0 ? colors.iconColor : '#F2F2F2',
            padding: 5,
            borderRadius: 10,
          }}
          onPress={() => {
            setActive(0);
            setcurrentChefOrders(userOrders['12-PM']);
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: active == 0 ? colors.white : '#5A5A5A',
            }}>
            12PM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: active == 1 ? colors.iconColor : '#F2F2F2',
            padding: 5,
            borderRadius: 10,
          }}
          onPress={() => {
            setActive(1);
            setcurrentChefOrders(userOrders['06-PM']);
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: active == 1 ? colors.white : '#5A5A5A',
            }}>
            6PM
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              dispatch(getOrdersAction(setLoading));
              setRefreshing(false);
            }}
          />
        }
        style={{
          width: wp('100%'),
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 20,
        }}
        data={currentchefOrders?.slice(-10).reverse()}
        renderItem={({item, index}) => (
          <OrderCard key={item?.id} order={item} navigation={navigation} />
        )}
        keyExtractor={item => item.toString()}
      />
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
        config={toastConfig}
      />
    </View>
  );
}
