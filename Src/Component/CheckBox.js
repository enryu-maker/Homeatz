import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, Platform, TouchableOpacity, View} from 'react-native';

const CheckBox = ({
  selected,
  onPress,
  style,
  wid,
  size = 20,
  color = '#bc3061', // Assuming 'logoPink' is defined in tailwind config
  text = '',
  ...props
}) => (
  <View className={`flex-row ${wid ? 'w-1/5' : ''}`}>
    <TouchableOpacity style={style} onPress={onPress} {...props}>
      <Icon
        className="pt-1 pr-3" // Adjusted padding for Android/iOS
        size={size}
        color={color}
        name={selected ? 'check-box' : 'check-box-outline-blank'}
      />
    </TouchableOpacity>
    <Text className="text-lg  font-bold w-11/12">{text}</Text>
  </View>
);

export default CheckBox;
