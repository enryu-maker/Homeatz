import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import React from 'react';
import {images} from '../../../assets/image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function Login({navigation, route}) {
  const [show, setShow] = React.useState(false);
  return (
    <View className=" flex-1 bg-white w-full justify-start items-center">
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
        // translucent={true}
      />
      <View className="flex-row w-[100%] px-2 h-[50px] items-center justify-between ">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image className="w-5 h-5" tintColor={'#000'} source={images.back} />
        </TouchableOpacity>
        <Text className="w-[50%] text-2xl font-suseR text-center text-black">
          {route?.params?.chef ? 'Chef Login' : 'Customer Login'}
        </Text>
        <TouchableOpacity className="w-5 h-5"></TouchableOpacity>
      </View>
      <Image className="w-full h-[35%] object-cover" source={images.login} />
      <View className="px-4 w-full mt-5  bottom-0 justify-evenly items-center bg-white h-[55%] absolute ">
        <View className="w-[100%]">
          <Text className="text-lg font-suseR text-start text-gray-500 ">
            Email
          </Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            cursorColor={'#bc3061'}
            placeholder="enter your email"
            placeholderTextColor={'#6b7280'}
            className="w-full px-4 text-lg font-suseR h-13 bg-white border outline outline-logoPink rounded-md mt-2"
          />
        </View>
        <View className="w-[100%]">
          <Text className="text-lg font-suseR text-start text-gray-500">
            Password
          </Text>
          <View className="w-full h-13 flex-row items-center justify-between px-4 text-lg font-suseR bg-white border outline outline-logoPink rounded-md mt-2">
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              cursorColor={'#bc3061'}
              secureTextEntry={show}
              className="w-[92%] text-lg font-suseR"
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
        <TouchableOpacity className="w-[100%] justify-center items-end">
          <Text className="text-base font-suseR text-end text-blue underline underline-offset-4">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[100%] justify-center rounded-md bg-logoPink h-[50px] items-center">
          <Text className="text-2xl font-suseR text-center text-white ">
            {route?.params?.chef ? 'Chef Login' : 'Customer Login'}
          </Text>
        </TouchableOpacity>
        <View className="flex-row w-[100%] items-center justify-center pt-5">
          <Text className="text-lg font-suseR text-start text-gray-500 ">
            Don't have an account? {''}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register', {
                chef: route?.params?.chef,
              });
            }}
            className=" justify-center items-center ">
            <Text className="text-lg font-suseR text-center text-logoPink underline">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}