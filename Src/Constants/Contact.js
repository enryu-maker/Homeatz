import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { images } from '../assets/image';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Contact({ navigation }) {
  const metadata = useSelector(state => state.Reducers.metadata);
  const contact = metadata.find(element => element.key == 'contact');
  const data = JSON.parse(contact?.data?.replace(/'/g, '"'));

  const handleBtn = phone => {
    let url = `http://api.whatsapp.com/send?phone=${phone}`;
    Linking.openURL(url);
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className={`flex-1 bg-white w-full h-full justify-start items-center ${Platform.OS === "ios" ? "" : "mt-[45px]"}`}>
        <View className="flex-row w-[100%] px-4 h-[50px] items-center justify-between ">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image className="w-5 h-5" tintColor={'#000'} source={images.back} />
          </TouchableOpacity>
          <Text className="text-2xl font-suseB text-center text-black">
            Contact Us
          </Text>
          <TouchableOpacity className="w-5 h-5"></TouchableOpacity>
        </View>
        <View className="flex-1 px-3 w-screen">
          <View className="flex-row w-full justify-between items-center my-4 px-5">
            <Text className=" w-[200px] font-suseB text-darkGrey text-lg">WhatsApp</Text>
            <TouchableOpacity onPress={() => handleBtn(data?.phone)}>
              <FontAwesome5 name="whatsapp" size={40} color="green" />
            </TouchableOpacity>
          </View>
          <View className="flex-row w-screen justify-between items-center my-4 px-5">
            <Text className=" w-[50%] font-suseB text-darkGrey text-lg">Email</Text>
            <Text className="font-suseB w-[50%] text-darkGrey text-lg" selectable={true}>
              {data?.email}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
