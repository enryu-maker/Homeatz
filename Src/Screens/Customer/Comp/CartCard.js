import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrencyCode, updateCartAction} from '../../../../Store/actions';
import {baseURL, baseURL1} from '../../../Helper/Helper';
import Toast from 'react-native-toast-message';

export default function CartCard({
  id,
  price,
  title,
  limit,
  cartData,
  qty,
  setTotal,
  total,
  icon,
}) {
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(qty);
  React.useEffect(() => {
    setTotal(count * price + total);
  }, [count]);
  const [code, setCode] = React.useState('');
  const location = useSelector(state => state.Reducers.location);
  React.useEffect(() => {
    dispatch(getCurrencyCode(location?.country, setCode));
  }, []);
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 8,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: 'lightgray',
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowOffset: {width: 3, height: 3},
      }}>
      <Image
        source={{uri: icon}}
        style={{
          width: 50,
          height: 50,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          width: '85%',
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-regular',
              color: '#212121',
              marginLeft: 10,
            }}>{`${title} (${count}x)`}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
              backgroundColor: '#BD146160',
              padding: 5,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (count > 1) {
                  setCount(count - 1);
                  cartData.map(item => {
                    if (item.id === id) {
                      item.count = count - 1;
                    }
                  });
                  dispatch(updateCartAction(cartData));
                } else {
                  setTotal(0);
                  dispatch({
                    type: 'REMOVE_FROM_CART',
                    payload: id,
                  });
                }
              }}>
              <AntDesign name="minus" size={20} color="#BD1461" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-regular',
                color: '#BD1461',
                marginHorizontal: 10,
              }}>
              {count}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (limit > count) {
                  setCount(count + 1);
                  cartData.map(item => {
                    if (item.id === id) {
                      item.count = count + 1;
                    }
                  });
                  dispatch({
                    type: 'CHANGE_QUANTITY',
                    payload: cartData,
                  });
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Cannot Order More Than Daily Limit',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 10,
                    bottomOffset: 40,
                  });
                }
              }}>
              <AntDesign name="plus" size={20} color="#BD1461" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-regular',
              color: '#212121',
              marginLeft: 10,
            }}>
            {code} {price}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Bold',
              color: '#BD1461',
              marginRight: 10,
            }}>
            {code} {count * price}
          </Text>
        </View>
      </View>
    </View>
  );
}
