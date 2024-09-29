import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../Screens/Customer/Comp/Header';

export default function More({navigation}) {
  return (
    <View className="flex-1 bg-white">
      <Header
        navigation={navigation}
        showBack={true}
        title="Contact & Privacy"
        showAppend={true}
        append={<View className="h-11 w-8" />}
      />
      <View className="h-40 w-11/12 justify-evenly self-center">
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text className="text-darkGrey font-balsamiqBold text-lg">
            About Us
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
          <Text className="text-darkGrey font-balsamiqBold text-lg">FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
          <Text className="text-darkGrey font-balsamiqBold text-lg">
            Contact Us
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <Text className="text-darkGrey font-balsamiqBold text-lg">
            Terms & Condition
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Data')}>
          <Text className="text-darkGrey font-balsamiqBold text-lg">
            Data Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
