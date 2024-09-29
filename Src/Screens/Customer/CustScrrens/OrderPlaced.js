import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {images} from '../../../Assets/image';
import {colors} from '../../../../Assets/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
export default function OrderPlaced({navigation, route}) {
  const dispatch = useDispatch();
  const item = route?.params?.item;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
      <View
        style={{
          height: hp('70%'),
          width: wp('90%'),
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          marginTop: 100,
        }}>
        <Image
          source={images.placed}
          style={{
            height: 120,
            width: 120,
            tintColor: colors.green,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'LEMONMILK-Bold',
            color: colors.darkGrey,
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          Thank You
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'BalsamiqSans-Bold',
            color: colors.darkGrey,
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          Your Order Have been Placed!
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'BalsamiqSans-Regular',
            color: colors.darkGrey,
            textAlign: 'justify',
          }}>{`Order Id :${item?.order_id}`}</Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'BalsamiqSans-Regular',
            color: colors.darkGrey,
            textAlign: 'justify',
          }}>{`Transaction Id :\n${item?.transaction_id}`}</Text>
        {item?.pickup_address === null ? null : (
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Regular',
              color: colors.darkGrey,
              textAlign: 'justify',
            }}>
            {item?.delivery_mode === 1
              ? `Pickup Address :\n${item?.pickup_address}`
              : `Delivery Address :\n${item?.delivery_address}`}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={{
          width: wp('100%'),
          backgroundColor: colors.logoPink,
          height: hp('10%'),
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 0,
        }}
        onPress={() => {
          dispatch({
            type: 'EMPTY_CART',
            payload: [],
          });
          navigation.popToTop();
        }}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'BalsamiqSans-Bold',
            color: colors.white,
            textAlign: 'center',
          }}>
          Go Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
