import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Header from '../Comp/Header';
import {colors} from '../../../../Assets/theme';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {getCurrencyCode, getItemsAction} from '../../../../Store/actions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {images} from '../../../Assets/image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../Component/ToastConfig';
import Clipboard from '@react-native-community/clipboard';
import RNRestart from 'react-native-restart';
const useInitialURL = () => {
  const [url, setUrl] = React.useState(null);
  const [processing, setProcessing] = React.useState(true);

  React.useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();

      setTimeout(() => {
        setUrl(initialUrl?.split('/')[3]);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return {url, processing};
};

export default function FoodInfo({navigation, route}) {
  // const [id, setId] = React.useState(route?.params?.id)
  const [copied, setCopied] = React.useState(false);
  const [product, setProduct] = React.useState(route?.params?.data);
  const [loading, setLoading] = React.useState(false);
  console.log(route?.params?.data);
  const [item, setItem] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const location = useSelector(state => state.Reducers.location);
  const dispatch = useDispatch();
  const [code, setCode] = React.useState('');
  React.useEffect(() => {
    dispatch(getItemsAction(setLoading, setItem, [id]));
    dispatch(getCurrencyCode(location?.country, setCode));
  }, []);
  console.log('cc', item);
  const copyToClipboard = item => {
    let message = `Click here to order ${item[0]?.name} https://www.homeatz.in/#/foodinfo/${item[0]?.id}`;
    Toast.show({
      type: 'success',
      text1: 'URL Copied Sucessfully',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 40,
    });
    Clipboard.setString(message);
    console.log(message);
    setCopied(true);
  };
  const {url: initialUrl, processing} = useInitialURL();
  console.log(initialUrl);
  console.log(processing);
  const [id, setId] = React.useState(
    initialUrl ? initialUrl : route?.params?.id,
  );
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {initialUrl ? (
        <TouchableOpacity
          onPress={() => {
            RNRestart.Restart();
          }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'BalsamiqSans-Bold',
              color: colors.logoPink,
            }}>
            Go Home
          </Text>
        </TouchableOpacity>
      ) : (
        <Header
          navigation={navigation}
          showBack={true}
          title="Food Details"
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
      )}

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.logoPink} />
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              width: '90%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 60,
                borderColor: 'lightgray',
                borderWidth: 2,
              }}
              source={{uri: item[0]?.image}}
            />
            <View
              style={{
                flexDirection: 'column',
                width: '60%',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginLeft: 20,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: 'BalsamiqSans-Bold',
                  color: colors.logoPink,
                }}>
                {item[0]?.name}{' '}
                <TouchableOpacity
                  onPress={() => {
                    copyToClipboard(item);
                  }}>
                  <Image
                    source={images.share}
                    style={{
                      height: 25,
                      width: 25,
                      tintColor: colors.logoPink,
                    }}
                  />
                </TouchableOpacity>
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'BalsamiqSans-Bold',
                    color: '#FFD700',
                  }}>
                  {item[0]?.rating}
                </Text>
                <AntDesign name="star" size={16} color={'#FFD700'} />
              </View>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: 'BalsamiqSans-Bold',
                  color: colors.logoPink,
                }}>
                {code} {item[0]?.price}
              </Text>
            </View>
            {item[0]?.is_veg ? (
              <Image
                source={images.Veg}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  position: 'absolute',
                  bottom: 0,
                  right: 20,
                }}
              />
            ) : (
              <Image
                source={images.NonVeg}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  position: 'absolute',
                  bottom: 0,
                  right: 20,
                }}
              />
            )}
          </View>
          <Text
            style={{
              fontSize: 26,
              fontFamily: 'BalsamiqSans-Bold',
              color: colors.logoPink,
              alignSelf: 'center',
              marginTop: 20,
              width: '90%',
            }}>
            Description :{' '}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Regular',
              color: colors.darkGrey,
              width: '90%',
              textAlign: 'justify',
            }}>
            {item[0]?.description}
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontFamily: 'BalsamiqSans-Bold',
              color: colors.logoPink,
              alignSelf: 'center',
              marginTop: 20,
              width: '90%',
            }}>
            Ingredient :{' '}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Regular',
              color: colors.darkGrey,
              width: '90%',
              textAlign: 'justify',
            }}>
            {item[0]?.ingredients}
          </Text>
        </>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.white,
          shadowColor: 'lightgray',
          shadowOpacity: 1,
          elevation: 4,
          shadowRadius: 4,
          shadowOffset: {width: 3, height: 3},
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: hp(12),
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginRight: 10,
              borderColor: '#BD146160',
              borderWidth: 1,
              height: hp(6),
              borderRadius: 10,
              width: wp(30),
            }}>
            <TouchableOpacity
              onPress={() => {
                if (count > 1) {
                  setCount(count - 1);
                }
              }}>
              <AntDesign name="minus" size={20} color="#BD1461" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'BalsamiqSans-Bold',
                color: '#BD1461',
                marginHorizontal: 10,
              }}>
              {count}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (product?.todays_limit || item[0]?.todays_limit > count) {
                  setCount(count + 1);
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Cannot Order More Than Daily Limit',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 50,
                    bottomOffset: 40,
                  });
                }
              }}>
              <AntDesign name="plus" size={20} color="#BD1461" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (product?.todays_limit || item[0]?.todays_limit > 0) {
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: {
                    id: item[0]?.id,
                    name: item[0]?.name,
                    price: item[0]?.price,
                    count: count,
                    icon: item[0]?.icon,
                    limit: product?.todays_limit || item[0]?.todays_limit,
                  },
                });
                navigation.navigate('Cart');
              }
            }}
            style={{
              backgroundColor: colors.logoPink,
              padding: 5,
              borderRadius: 10,
              width: wp(50),
              height: hp(6),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'BalsamiqSans-Regular',
                color: colors.white,
              }}>
              {product?.todays_limit || item[0]?.daily_limit > 0
                ? `Add Item - ${code} ${count * item[0]?.price}`
                : `Out of Stock`}{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
        config={toastConfig}
      />
    </View>
  );
}
