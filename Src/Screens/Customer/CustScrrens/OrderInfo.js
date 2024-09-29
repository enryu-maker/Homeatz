import {View, Text, Linking, Platform, ScrollView} from 'react-native';
import React from 'react';
import Header from '../Comp/Header';
import {colors} from '../../../../Assets/theme';
import {DataTable} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  getChef,
  getCurrencyCode,
  getItemsAction,
} from '../../../../Store/actions';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../Component/ToastConfig';
export default function OrderInfo({route, navigation}) {
  const order = route.params.order;
  const [loading, setLoading] = React.useState(false);
  const [product, setProduct] = React.useState([]);
  const [chef, setChef] = React.useState({});
  const dispatch = useDispatch();
  const location = useSelector(state => state.Reducers.location);
  const [code, setCode] = React.useState('');
  const id = order?.items?.split(',');
  React.useEffect(async () => {
    dispatch(getItemsAction(setLoading, setProduct, id));
    dispatch(getChef(setLoading, order?.chef_id, setChef));
    dispatch(getCurrencyCode(location?.country, setCode));
  }, [dispatch]);

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
              marginTop: hp('2%'),
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
      case 2:
        return (
          <Text
            style={{
              fontSize: 16,
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
              marginTop: hp('2%'),
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
              fontSize: 16,
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
              fontSize: 16,
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
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <Header
        navigation={navigation}
        append={
          <View
            style={{
              width: 30,
              height: 35,
            }}
          />
        }
        showAppend={true}
        title="Order Info"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: wp('85%'),
            gap: 10,
            marginTop: hp('3%'),
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
              }}>{`${code} ${order?.total / 100}`}</Text>
          </Text>
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
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Delivery Time :{' '}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.iconColor,
              }}>
              {order?.delivery_slot} PM
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Delivery Mode :{' '}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.iconColor,
              }}>
              {order?.pickup_address === null ? 'Home Delivery' : 'Chef Pickup'}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
              marginTop: hp('3%'),
            }}>
            Order Details :{' '}
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Quantity</DataTable.Title>
            </DataTable.Header>
            {order?.items?.split(',')?.map((item, index) => (
              <DataTable.Row>
                <DataTable.Cell>{product[index]?.name}</DataTable.Cell>
                <DataTable.Cell>
                  # {JSON.parse(order?.subtotal_qty)[parseInt(item)]}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
              marginTop: hp('3%'),
            }}>
            Payment Mode :
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.iconColor,
              }}>
              {' '}
              {order?.payment_mode}
            </Text>
          </Text>
          {order?.payment_mode == 'PhonePe PG' ? (
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.darkGrey,
              }}>
              Payment Status :
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'BalsamiqSans-Bold',
                  alignSelf: 'flex-start',
                  color: order?.payment_status ? colors.green : 'red',
                }}>
                {' '}
                {order?.payment_status ? 'Paid' : 'Payment Pending'}
              </Text>
            </Text>
          ) : null}
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Order OTP :
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.iconColor,
              }}>
              {' '}
              {order?.order_otp}
            </Text>
          </Text>
          {order?.pickup_address != null ? (
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.darkGrey,
              }}>
              Pickup Addess :
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'BalsamiqSans-Bold',
                  alignSelf: 'flex-start',
                  color: colors.iconColor,
                }}>
                {order?.pickup_address}
              </Text>
            </Text>
          ) : null}
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Chef Details
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Kitchen Name :{' '}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.iconColor,
              }}>
              {chef?.kitchen_name}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              alignSelf: 'flex-start',
              color: colors.darkGrey,
            }}>
            Phone :{' '}
            <Text
              onPress={() => {
                Linking.openURL(
                  Platform.OS === 'android'
                    ? `telprompt:${chef?.phone}`
                    : `tel:${chef?.phone}`,
                );
              }}
              style={{
                fontSize: 16,
                fontFamily: 'BalsamiqSans-Bold',
                alignSelf: 'flex-start',
                color: colors.iconColor,
              }}>
              {chef?.phone}
            </Text>
          </Text>
          {checkStatus(order)}
        </View>
      </ScrollView>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
        config={toastConfig}
      />
    </View>
  );
}
