import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Header from '../Comp/Header'
import FoodCard from '../Comp/FoodCard'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export default function MenuInfo({
  navigation,
  route
}) {
  function formatData(data) {
    let arr = []
    Object.keys(data).map((key) => {
      arr.push({
        name: key,
        value: data[key]
      })
    }
    )
    return arr
  }
  var currentDate = new Date();

  function getDeliveryDate(name, currentDate) {
    switch (name) {
      case "Today 's":
        return `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;

      case "Tomorrow's":
        return` ${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate() + 1}`;

      case "Monthly Plan":
        return `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate() + 2}`;
      case "Party Menu":
        return `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate() + 2}`;

    }
  }
  

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    }}>
      <Header navigation={navigation} title={`${route?.params?.name}`} showAppend={true}
        append={
          <View style={{
            height: 30,
            width: 35,
          }} />
        }
      />
      <View
        style={{
          width: "88%",
          marginTop: heightPercentageToDP(4),
        }}
      >
        <Text style={{
          fontSize: 22,
          textAlign: "left",
          fontFamily: "BalsamiqSans-Bold"
        }}>{route?.params?.name === "Party Menu" ? "Party Menu" : route?.params?.name} </Text>
        <Text style={{
          fontSize: 18,
          textAlign: "left",
          fontFamily: "BalsamiqSans-Bold"
        }}>Kitchen Name : {route.params.chef?.kitchen_name} </Text>
        <Text style={{
          fontSize: 18,
          textAlign: "left",
          fontFamily: "BalsamiqSans-Bold"
        }}>{`Delivery Date : ${getDeliveryDate(route?.params?.name,currentDate)}`}</Text>
        <Text style={{
          fontSize: 18,
          textAlign: "left",
          fontFamily: "BalsamiqSans-Bold"
        }}>Delivery Time : 12PM / 6PM</Text>
      </View>
      <FlatList
        style={{
          width: '100%',
          marginTop: 20,
        }}
        data={formatData(route.params.item)}
        renderItem={({ item }) => {
          return (
            <View style={{
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingHorizontal: 20,
              alignSelf: 'flex-start',
            }}>
              <Text style={{
                fontSize: 20,
                width: '95%',
                textAlign: 'left',
                alignSelf: "center",
                fontFamily: "BalsamiqSans-Bold",
                paddingVertical: 10,
              }}>{item.name}</Text>
              {
                item.value.map((val) => {
                  return (
                    <FoodCard navigation={navigation} data={val} />
                  )
                }
                )
              }
            </View>
          )
        }}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}