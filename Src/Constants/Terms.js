import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../Screens/Customer/Comp/Header';
import {useSelector} from 'react-redux';

export default function Terms({navigation}) {
  const metadata = useSelector(state => state.Reducers.metadata);
  const terms = metadata.find(element => element.key === 'termsconditions');

  return (
    <View className="flex-1 bg-white">
      <Header
        showAppend={true}
        append={<View className="h-11 w-2.5" />}
        navigation={navigation}
        showBack={true}
        title="Terms & Condition"
      />
      <ScrollView className="w-full h-full px-3">
        <View className="px-5">
          <Text className="text-lg text-justify font-balsamiqRegular">
            {terms?.data}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
