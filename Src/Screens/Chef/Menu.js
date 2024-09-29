import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from './Comp/Header'
import MenuCard from './Comp/MenuCard';
import { colors } from '../../../Assets/theme';
import { useSelector } from 'react-redux';
export default function Menu({
  navigation
}) {
  const dealtype = useSelector(state => state.Reducers.dealtype)

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    }}>
      <Header showBack={false} navigation={navigation}  title="Menu" />
      <FlatList
        style={{
          width: '100%',
          height: '100%',
          alignSelf: 'center',
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: hp('10%')
        }}
        data={dealtype}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MenuDetails', { item: item })
            }}
            style={{
              backgroundColor: 'white',
              paddingVertical: hp('2%'),
              borderRadius: 10,
              marginTop: hp('3%'),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
              paddingHorizontal: wp('5%'),
              padding: hp('2%'),
              width: wp('90%'),
            }}>
            <Text style={{
              fontSize: 20,
              fontFamily: 'BalsamiqSans-Bold'
            }}>{item.deal_type}</Text>
            <Text style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Regular'
            }}>{item.deal_description}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}