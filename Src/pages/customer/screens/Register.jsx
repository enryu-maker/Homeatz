import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  SafeAreaView
} from 'react-native';
import React from 'react';
import { images } from '../../../assets/image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryCode, RegisterAction } from '../../../../store/actions';
export default function Register({ navigation, route }) {
  const [countrycode, setCountrycode] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const location = useSelector(state => state.Reducers.location);
  const [image, setImage] = React.useState(null);
  const [imageError, setImageError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState({
    full_name: "",
    phone: "",
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCountryCode(location?.country, setCountrycode));
  }, [dispatch]);

  const pickImage = async () => {
    let result = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,

    });

    if (result.cancelled) {
      setImageError(true);
    }

    if (!result.cancelled) {
      const newImageUri = Platform.OS === "ios" ? 'file:///' + result?.sourceURL.split('file:/').join('') : 'file:///' + result?.path.split('file:/').join('')
      const uriParts = result?.path?.split('.')
      const fileType = uriParts[uriParts.length - 1];
      setImage({
        type: `image/${fileType}`,
        uri: result?.path,
        name: `photo.${fileType}`
      });
      setImageError(false);
    }
  };
  return (
    <View className=" h-screen w-screen">
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={true}
      />
      <SafeAreaView className=' flex-1 bg-white w-full  justify-center items-center'>
        {/* <View className="flex-row w-[100%] px-2 h-[50px] items-center justify-between ">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image className="w-5 h-5" tintColor={'#000'} source={images.back} />
          </TouchableOpacity>
          <Text className="w-[50%] text-2xl font-suseR text-center text-black">
            {route?.params?.chef ? 'Chef Register' : 'Customer Register'}
          </Text>
          <TouchableOpacity className="w-5 h-5"></TouchableOpacity>
        </View> */}
        <View className="px-4 w-full mt-5  bottom-0 justify-evenly items-center bg-white h-[100%] absolute ">
          <View
            className=' justify-center items-center'
          >
            <TouchableOpacity onPress={pickImage}>
              <View
                className=' justify-center items-center'
              >
                {image ? (
                  <View>
                    <Image
                      source={{ uri: image?.uri }}
                      className='w-[140px] h-[140px] border rounded-full justify-center items-center text-center'
                      resizeMode='cover'
                    />
                  </View>
                ) : (
                  <View
                    className='w-[140px] h-[140px] border rounded-full justify-center items-center text-center'

                  >
                    <FontAwesome
                      style={{ textAlign: 'center' }}
                      name='user'
                      size={45}
                      color='#989898'
                    />
                  </View>
                )}
              </View>
              <View
                className=' mb-[2%]'
              >
                <Text

                  className=' text-center font-suseR'
                >
                  Upload your display pic*
                </Text>
                {image === null && (
                  <Text

                    className=' text-red-500 text-sm text-center'
                  >
                    Image is compulsory
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            className='w-screen px-4 space-y-4'
          >

            <View className="w-[100%]">
              <Text className="text-lg font-suseR text-start text-gray-500 ">
                Name*
              </Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                cursorColor={'#bc3061'}
                placeholder="enter your fullname"
                placeholderTextColor={'#6b7280'}
                className="w-full px-4 text-base font-suseR h-[50px] bg-white border outline outline-logoPink rounded-md mt-2"
              />
            </View>
            <View className="w-[100%]">
              <Text className="text-lg font-suseR text-start text-gray-500 ">
                Email*
              </Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                cursorColor={'#bc3061'}
                placeholder="enter your email"
                placeholderTextColor={'#6b7280'}
                className="w-full px-4  text-base font-suseR h-[50px] bg-white border outline outline-logoPink rounded-md mt-2"
              />
            </View>
            <View className="w-[100%]">
              <Text className="text-lg font-suseR text-start text-gray-500">
                Mobile Number*
              </Text>
              <View className="w-full h-[50px] flex-row items-center justify-between px-3 text-lg font-suseR bg-white border outline outline-logoPink rounded-md mt-2">
                <TouchableOpacity className='w-auto h-[50px] border-r justify-center items-center'>
                  <Text className=' font-bold  pr-2 text-base mt-2 font-suseR'>{countrycode}</Text>
                </TouchableOpacity>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  cursorColor={'#bc3061'}
                  secureTextEntry={show}
                  className="w-[92%] px-2 text-base font-suseR"
                  placeholder="enter your mobile number"
                  placeholderTextColor={'#6b7280'}
                />
              </View>
            </View>
            <View className="w-[100%]">
              <Text className="text-lg font-suseR text-start text-gray-500">
                Password*
              </Text>
              <View className="w-full h-[50px] flex-row items-center justify-between px-4 text-lg font-suseR bg-white border outline outline-logoPink rounded-md mt-2">
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  cursorColor={'#bc3061'}
                  secureTextEntry={show}
                  className="w-[92%] text-base h-[50px] font-suseR"
                  placeholder="enter your password"
                  placeholderTextColor={'#6b7280'}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShow(!show);
                  }}>
                  <FontAwesome
                    name={show ? 'eye' : 'eye-slash'}
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                data['is_chef'] = route?.params?.chef ? 1 : 0;
                data['profile_photo'] = image;
                dispatch(RegisterAction(setLoading, data, navigation))
              }}
              className="w-[100%] justify-center rounded-md bg-logoPink h-[50px] items-center">
              <Text className="text-2xl font-suseR text-center text-white ">
                {route?.params?.chef ? 'Chef Register' : 'Customer Register'}
              </Text>
            </TouchableOpacity>
            <View className="flex-row w-[100%] items-center justify-center pt-5">
              <Text className="text-lg font-suseR text-start text-gray-500 ">
                Already have an account? {''}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                className=" justify-center items-center ">
                <Text className="text-lg font-suseR text-center text-logoPink underline">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>

        </View>
      </SafeAreaView>
    </View>
  );
}
