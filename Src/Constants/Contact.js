import React from 'react';
import {View, Text, Linking, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import Header from '../Screens/Customer/Comp/Header';

export default function Contact({navigation}) {
  const metadata = useSelector(state => state.Reducers.metadata);
  const contact = metadata.find(element => element.key == 'contact');
  const data = JSON.parse(contact?.data?.replace(/'/g, '"'));

  const handleBtn = phone => {
    let url = `http://api.whatsapp.com/send?phone=${phone}`;
    Linking.openURL(url);
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        showAppend={true}
        append={<View className="h-12 w-8" />}
        navigation={navigation}
        showBack={true}
        title="Contact"
      />
      <View className="flex-1 px-3">
        <View className="flex-row justify-between items-center my-4 px-5">
          <Text className="font-bold text-darkGrey text-lg">WhatsApp</Text>
          <TouchableOpacity onPress={() => handleBtn(data?.phone)}>
            <FontAwesome5 name="whatsapp" size={40} color="green" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between items-center my-4 px-5">
          <Text className="font-bold text-darkGrey text-lg">Email</Text>
          <Text className="font-bold text-darkGrey text-lg" selectable={true}>
            {data?.email}
          </Text>
        </View>
      </View>
    </View>
  );
}
