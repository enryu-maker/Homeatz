import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../../../Assets/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrencyCode,
  getItemsAction,
  updateStatus,
} from '../../../../Store/actions';
import {ActivityIndicator} from 'react-native-paper';
export default function OrderCard({order, navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [product, setProduct] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const location = useSelector(state => state.Reducers.location);
  const [code, setCode] = React.useState('');
  React.useEffect(() => {
    dispatch(getCurrencyCode(location?.country, setCode));
  }, []);
  function checkStatus(order) {
    switch (order?.status) {
      case 0:
        return (
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Status :{' '}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: 'red',
              }}>
              Cancelled
            </Text>
          </Text>
        );
      case 1:
        return (
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Status :{' '}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: 'red',
              }}>
              Payment Pending
            </Text>
          </Text>
        );
      case 2:
        return (
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Status :{' '}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: 'red',
              }}>
              Placed
            </Text>
          </Text>
        );
      case 3:
        return (
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Status :{' '}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.green,
              }}>
              Order Accepted
            </Text>
          </Text>
        );
      case 4:
        return (
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Status :{' '}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.green,
              }}>
              Out For Delivery
            </Text>
          </Text>
        );
      case 5:
        return (
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Status :{' '}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.iconColor,
              }}>
              Delivered
            </Text>
          </Text>
        );
      default:
        break;
    }
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('OrderInfo', {
          order,
        })
      }
      style={{
        width: wp('90%'),
        backgroundColor: 'white',
        paddingVertical: hp('1%'),
        borderRadius: 10,
        gap: 6,
        // height: hp("15%"),
        marginTop: hp('3%'),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        fontFamily: 'BalsamiqSans-Bold',
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: wp('85%'),
        }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'BalsamiqSans-Bold',
            alignSelf: 'flex-start',
            color: colors.darkGrey,
          }}>
          Order ID :{' '}
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.iconColor,
            }}>
            #{order?.id}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'BalsamiqSans-Bold',
            alignSelf: 'flex-start',
            color: colors.darkGrey,
          }}>
          Order Value :{' '}
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.iconColor,
            }}>
            {code} {order?.total / 100}
          </Text>
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: wp('85%'),
        }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'BalsamiqSans-Bold',
            alignSelf: 'flex-start',
            color: colors.darkGrey,
          }}>
          Delivery Date :{' '}
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.iconColor,
            }}>
            {order?.delivery_date}
          </Text>
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'BalsamiqSans-Bold',
          alignSelf: 'flex-start',
          color: colors.darkGrey,
        }}>
        Payment Mode :{' '}
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'BalsamiqSans-Bold',
            alignSelf: 'flex-start',
            color: colors.iconColor,
          }}>
          {order?.payment_mode}
        </Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: wp('85%'),
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.iconColor,
            padding: 5,
            borderRadius: 10,
          }}
          onPress={() =>
            navigation.navigate('OrderInfo', {
              order,
            })
          }>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.white,
            }}>
            View Items
          </Text>
        </TouchableOpacity>
        {checkStatus(order)}
      </View>
      {show && product ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingVertical: 10,
              width: wp('85%'),
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.darkGrey,
              }}>
              Quantity
            </Text>
          </View>
        </>
      ) : null}
    </TouchableOpacity>
  );
}
