import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {images} from '../../../Assets/image';
import {colors} from '../../../../Assets/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {baseURL, baseURL1} from '../../../Helper/Helper';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../Component/ToastConfig';
import {getCurrencyCode} from '../../../../Store/actions';
export default function FoodCard({data, navigation}) {
  const dispatch = useDispatch();
  const location = useSelector(state => state.Reducers.location);
  const [count, setCount] = React.useState(1);
  const [code, setCode] = React.useState('');
  React.useEffect(() => {
    dispatch(getCurrencyCode(location?.country, setCode));
  }, []);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '95%',
        backgroundColor: 'white',
        height: Platform?.OS === 'android' ? 170 : 150,
        borderRadius: 10,
        marginVertical: 8,
        alignSelf: 'center',
        shadowColor: 'lightgray',
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        paddingVertical: 10,
        shadowOffset: {width: 3, height: 3},
      }}
      onPress={() => {
        navigation.navigate('FoodInfo', {
          id: data?.id,
          data: data,
        });
      }}>
      <View
        style={{
          width: '25%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: data?.image || data?.icon}}
          style={{
            width: 100,
            height: '100%',
            borderRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          width: '60%',
          height: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingHorizontal: 5,
          overflow: 'hidden',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Bold',
              color: colors.logoPink,
            }}>
            {data?.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'BalsamiqSans-Bold',
                color: '#FFD700',
                marginHorizontal: 5,
              }}>
              {data?.rating}
            </Text>
            <AntDesign name="star" size={16} color={'#FFD700'} />
          </View>
        </View>
        {data?.chef_name ? (
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'BalsamiqSans-Bold',
              color: colors.logoPink,
            }}>
            {data?.chef_name}
          </Text>
        ) : null}
        {typeof data?.deal_type === 'number' ? null : (
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'BalsamiqSans-Bold',
              color: colors.darkGrey,
            }}>
            {data?.deal_type} Menu
          </Text>
        )}

        {data?.todays_limit > 0 && data?.todays_limit ? (
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'BalsamiqSans-Regular',
              color: colors.darkGrey,
            }}>
            {data?.description.length > 50
              ? data?.description?.slice(0, 50) + '...'
              : data?.description}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Bold',
              color: 'red',
            }}>
            Out of Stock
          </Text>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
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
                }
              }}>
              <AntDesign name="minus" size={18} color="#BD1461" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'BalsamiqSans-regular',
                color: '#BD1461',
                marginHorizontal: 10,
              }}>
              {count}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (data?.todays_limit > count) {
                  setCount(count + 1);
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
              <AntDesign name="plus" size={18} color="#BD1461" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Bold',
              color: colors.logoPink,
            }}>{`${code} ${count * data?.price}`}</Text>
          {data?.todays_limit > 0 ? (
            <TouchableOpacity
              style={{
                backgroundColor: colors.logoPink,
                padding: 5,
                borderRadius: 10,
              }}
              onPress={() => {
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: {
                    id: data?.id,
                    name: data?.name,
                    price: data?.price,
                    count: count,
                    image: data?.image,
                    description: data?.description,
                  },
                });

                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1: 'Added to Cart',
                  visibilityTime: 2000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 40,
                });
              }}>
              <MaterialCommunityIcons
                name="cart-plus"
                size={18}
                color="white"
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
        config={toastConfig}
      />
    </TouchableOpacity>
  );
}
