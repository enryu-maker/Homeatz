import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import {images} from '../../../Assets/image';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

export default function Header({
  navigation,
  title,
  showBack = true,
  append,
  showAppend = false,
  subtitle,
}) {
  const Cart = useSelector(state => state.Reducers.cart);

  return (
    <SafeAreaView
      className={`mt-${
        Platform.OS === 'ios' ? '5' : '2'
      } w-full flex-row items-center justify-${
        showBack ? 'between' : showAppend ? 'between' : 'around'
      } self-center w-full `}>
      {showBack ? (
        <Feather
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={35}
          className="font-bold "
        />
      ) : showAppend ? (
        <View className="w-9 h-9" />
      ) : null}

      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        className="flex-col justify-center items-center w-[70%] ">
        <Text className={`w-[40%] text-[16px] text-center font-bold `}>
          {title}
        </Text>
        {subtitle && (
          <Text className="text-xl text-center font-bold text-[#CBB26A]">
            {subtitle}
          </Text>
        )}
      </TouchableOpacity>

      {showAppend ? (
        append
      ) : (
        <TouchableOpacity
          className="relative right-5"
          onPress={() => navigation.navigate('Cart')}>
          <View className="absolute justify-center items-center rounded-full bg-[#BD1461] h-4 w-4 bottom-4 left-6">
            <Text className="text-center text-xs font-bold text-white">
              {Cart.length}
            </Text>
          </View>
          <Image source={images.cart} className="h-6 w-6 object-contain" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
