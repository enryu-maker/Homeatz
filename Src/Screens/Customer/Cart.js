import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Header from './Comp/Header';
import CartCard from './Comp/CartCard';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../Assets/theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../Component/ToastConfig';
import {images} from '../../Assets/image';
import {getCurrencyCode} from '../../../Store/actions';
export default function Cart({navigation}) {
  const cartData = useSelector(state => state.Reducers.cart);
  const access = useSelector(state => state.Reducers.access);
  const [price, setPrice] = React.useState(0);
  const [cart, setCart] = React.useState({});
  const [total, setTotal] = React.useState(0);
  const [code, setCode] = React.useState('');
  const location = useSelector(state => state.Reducers.location);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCurrencyCode(location?.country, setCode));
  }, []);
  React.useEffect(() => {
    let price = 0;
    cartData.map(item => {
      price = price + item.price * item.count;
    });
    setTotal(price);
  }, [total]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Header
        navigation={navigation}
        showBack={true}
        title="My Cart"
        showAppend={true}
        append={
          <View
            style={{
              height: 25,
              width: 35,
            }}
          />
        }
      />
      {cartData.length > 0 ? (
        <>
          <View
            style={{
              width: '100%',
              marginTop: heightPercentageToDP('2%'),
              maxHeight: heightPercentageToDP('40%'),
            }}>
            <FlatList
              style={{
                width: '100%',
              }}
              data={cartData}
              renderItem={({item}) => (
                <CartCard
                  id={item.id}
                  price={item.price}
                  title={item.name}
                  total={total}
                  setTotal={setTotal}
                  cartData={cartData}
                  qty={item.count}
                  icon={item.icon}
                  limit={item?.limit}
                />
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View
            style={{
              height: 2.5,
              width: '90%',
              backgroundColor: 'lightgray',
              marginVertical: 15,
            }}
          />
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'BalsamiqSans-Bold',
                color: '#212121',
              }}>
              SubTotal
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'BalsamiqSans-Bold',
                color: '#212121',
              }}>{`${code} ${total}`}</Text>
          </View>
          <View
            style={{
              width: '90%',
              marginVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'BalsamiqSans-Bold',
                color: '#212121',
              }}>
              Government Taxes{' '}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'BalsamiqSans-Bold',
                color: '#212121',
              }}>
              {code} {Math.round(total * 0.18)}
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'BalsamiqSans-Bold',
                color: '#212121',
              }}>
              Delivery Fee{' '}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'BalsamiqSans-Bold',
                color: colors.logoPink,
              }}>
              Free
            </Text>
          </View>
          <View
            style={{
              height: 2.5,
              width: '90%',
              backgroundColor: 'lightgray',
              marginVertical: 15,
            }}
          />
          <View
            style={{
              width: '90%',
              marginVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'BalsamiqSans-Bold',
                color: '#212121',
              }}>
              Total Amount{' '}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'BalsamiqSans-Bold',
                color: '#212121',
              }}>
              {code} {Math.round(total * 0.18 + total)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              access === null
                ? setTimeout(() => {
                    Toast.show({
                      type: 'error',
                      text1: 'User Not Logged In',
                      visibilityTime: 2000,
                      autoHide: true,
                      topOffset: 50,
                      bottomOffset: 40,
                    });
                    setTimeout(() => {
                      navigation.navigate('Signin');
                    }, 3000);
                  }, 1000)
                : navigation.navigate('Checkout', {
                    amount: Math.round(total * 0.18 + total),
                    cartData: cartData,
                  });
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
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'LEMONMILK-Bold',
                color: '#fff',
                textAlign: 'center',
              }}>
              Checkout
            </Text>
          </TouchableOpacity>
          <Toast
            ref={ref => {
              Toast.setRef(ref);
            }}
            config={toastConfig}
          />
        </>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 120,
          }}>
          <Image
            source={images.empty}
            style={{
              height: 120,
              width: 120,
              tintColor: colors.logoPink,
            }}
          />
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'LEMONMILK-Bold',
              color: '#000000',
              textAlign: 'center',
              marginVertical: 10,
            }}>
            Cart Is Empty
          </Text>
        </View>
      )}
    </View>
  );
}
