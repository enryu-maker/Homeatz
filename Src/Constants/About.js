import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../Screens/Customer/Comp/Header';

const AboutScreen = ({navigation}) => {
  // Static Data coming from component state
  const metadata = useSelector(state => state.Reducers.metadata);
  const aboutus = metadata.find(element => element.key == 'about');

  return (
    <View className="flex-1 bg-white">
      {/* Close Icon to go back to previous screen */}
      <Header
        showAppend={true}
        append={<View className="h-12 w-8" />}
        navigation={navigation}
        showBack={true}
        title="About Us"
      />
      <ScrollView className="flex-1 px-4">
        <View className="px-5">
          <Text className="text-base text-justify font-regular">
            {aboutus?.data}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
