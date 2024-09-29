import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../Screens/Customer/Comp/Header';

export default function Faq({navigation}) {
  const metadata = useSelector(state => state.Reducers.metadata);
  const faq = metadata.find(element => element.key === 'faq');

  return (
    <View className="flex-1 bg-white">
      <Header
        showAppend={true}
        append={<View className="h-11 w-8" />}
        navigation={navigation}
        showBack={true}
        title="FAQ"
      />
      <ScrollView className="flex-1 px-3">
        <View className="px-5">
          <Text className="text-lg text-justify font-balsamiqRegular">
            {faq?.data}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}