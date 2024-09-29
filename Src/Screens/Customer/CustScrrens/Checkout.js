import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {colors} from '../../../../Assets/theme';
import Header from '../Comp/Header';
import Feather from 'react-native-vector-icons/Feather';
import {ActivityIndicator} from 'react-native-paper';
import RadioForm from 'react-native-simple-radio-button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AddCard from '../Comp/AddCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  createOrder,
  getActiveAddress,
  getCurrencyCode,
} from '../../../../Store/actions';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../Component/ToastConfig';
export default function Checkout({navigation, route}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(1);
  const [pselected, setPSelected] = React.useState(0);
  const [dselected, setDSelected] = React.useState(1);

  const active = useSelector(state => state.Reducers.active);
  const location = useSelector(state => state.Reducers.location);
  const [code, setCode] = React.useState('');
  React.useEffect(() => {
    dispatch(getCurrencyCode(location?.country, setCode));
  }, []);

  const deliveryData = [
    {label: 'Pickup From chef Location', value: 1},
    {label: 'Door Delivey', value: 2},
  ];
  const deliveryTime = [
    {label: `12PM`, value: 1},
    {label: '6PM', value: 2},
  ];
  const paymentData = [
    {label: 'COD (Cash On Delivery)', value: 0},
    {label: 'UPI/CARDS/NET BANKING', value: 1},
  ];

  function getProduct() {
    let itemsID = [];
    let subtotal = {};
    let subtotal_qty = {};
    route.params.cartData.map(items => {
      itemsID.push(items.id);
      subtotal[items.id] = items.price * 100;
      subtotal_qty[items.id] = items.count;
    });
    return {
      items: itemsID,
      address_id: active?.id,
      total: route?.params?.amount * 100,
      subtotal: JSON.stringify(subtotal),
      subtotal_qty: subtotal_qty,
    };
  }

  React.useEffect(() => {
    dispatch(getActiveAddress(setLoading));
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
      }}>
      <Header
        navigation={navigation}
        title={'Checkout'}
        showAppend={true}
        append={<View style={{width: 35, height: 25}} />}
      />
      <ScrollView
        style={{
          width: '100%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: '90%',
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'BalsamiqSans-Bold',
              color: '#212121',
            }}>
            Payable Amount{' '}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'BalsamiqSans-Bold',
              color: '#212121',
            }}>
            {code} {route.params.amount}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            marginVertical: 15,
            flexDirection: 'column',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'BalsamiqSans-Bold',
              color: '#212121',
            }}>
            Delivery Time
          </Text>
          <RadioForm
            style={{
              marginVertical: 10,
            }}
            labelStyle={{
              fontFamily: 'BalsamiqSans-Regular',
            }}
            radio_props={deliveryTime}
            initial={0}
            buttonColor={colors.logoPink}
            selectedButtonColor={colors.logoPink}
            onPress={value => {
              setDSelected(value);
            }}
          />
        </View>
        <View
          style={{
            width: '90%',
            marginVertical: 15,
            flexDirection: 'column',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'BalsamiqSans-Bold',
              color: '#212121',
            }}>
            Delivery Options
          </Text>
          <RadioForm
            style={{
              marginVertical: 10,
            }}
            labelStyle={{
              fontFamily: 'BalsamiqSans-Regular',
            }}
            radio_props={deliveryData}
            initial={0}
            buttonColor={colors.logoPink}
            selectedButtonColor={colors.logoPink}
            onPress={value => {
              setSelected(value);
            }}
          />
        </View>
        {selected === 2 ? (
          <>
            <View
              style={{
                width: '90%',
                marginVertical: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'BalsamiqSans-Bold',
                  color: '#212121',
                }}>
                Delivery Addess
              </Text>
              <Feather
                onPress={() =>
                  navigation.navigate('Address', {
                    state: false,
                  })
                }
                name="arrow-right"
                size={35}
                color={colors.iconColor}
                style={{fontFamily: 'BalsamiqSans-Regular'}}
              />
            </View>
            <AddCard data={active} show={false} />
          </>
        ) : null}
        <View
          style={{
            width: '90%',
            marginVertical: 15,
            flexDirection: 'column',
            alignSelf: 'center',
            paddingBottom: 60,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'BalsamiqSans-Bold',
              color: '#212121',
            }}>
            Payment Options
          </Text>
          {location?.country === 'India' ? (
            <RadioForm
              style={{
                marginVertical: 10,
              }}
              labelStyle={{
                fontFamily: 'BalsamiqSans-Regular',
              }}
              radio_props={paymentData}
              // initial={0}
              buttonColor={colors.logoPink}
              selectedButtonColor={colors.logoPink}
              onPress={value => {
                setPSelected(value);
              }}
            />
          ) : (
            <RadioForm
              style={{
                marginVertical: 10,
              }}
              labelStyle={{
                fontFamily: 'BalsamiqSans-Regular',
              }}
              radio_props={[{label: 'COD (Cash On Delivery)', value: 0}]}
              // initial={0}
              buttonColor={colors.logoPink}
              selectedButtonColor={colors.logoPink}
              onPress={value => {
                setPSelected(value);
              }}
            />
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          const data = getProduct();
          if (pselected === 0) {
            data['delivery_slot'] = dselected;
            data['delivery_mode'] = selected;

            dispatch(createOrder(data, setLoading, pselected, navigation));
          } else {
            data['delivery_slot'] = dselected;
            data['delivery_mode'] = selected;

            dispatch(createOrder(data, setLoading, pselected, navigation));
          }
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          height: 80,
          width: '100%',
          backgroundColor: colors.logoPink,
          paddingVertical: 10,
        }}>
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'LEMONMILK-Bold',
              color: '#fff',
              textAlign: 'center',
            }}>
            {pselected == 0 ? 'Order Now' : 'Pay Now'}
          </Text>
        )}
      </TouchableOpacity>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
        config={toastConfig}
      />
    </View>
  );
}
