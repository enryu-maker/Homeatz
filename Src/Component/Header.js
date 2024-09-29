import React from 'react';
import {View, Platform, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function Header({navigation, active = false, back = false}) {
  return (
    <View
      className={`flex-row justify-between items-center px-4 bg-white ${
        Platform.OS === 'android' ? 'mt-1' : 'mt-5'
      } w-full h-12`}>
      <TouchableOpacity
        onPress={() => (back ? navigation.goBack() : navigation.openDrawer())}>
        <Feather
          name={back ? 'arrow-left' : 'menu'}
          size={35}
          className="text-iconColor" // Assuming `iconColor` is defined in tailwind config
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.replace('AuthNav');
        }}>
        <Feather
          name="home"
          size={35}
          className={`${active ? 'text-darkGrey' : 'text-iconColor'}`} // Handle active state
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <Feather name="shopping-cart" size={35} className="text-iconColor" />
      </TouchableOpacity>
    </View>
  );
}
