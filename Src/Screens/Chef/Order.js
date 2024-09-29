import { View, Text, Touchable, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import Header from './Comp/Header'
import ActiveCard from './Comp/ActiveCard'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { colors } from '../../../Assets/theme'
import { useDispatch, useSelector } from 'react-redux'
import { GetChefOrders } from '../../../../Store/actions'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../../Component/ToastConfig'
export default function Order({
  navigation
}) {
  const [active, setActive] = React.useState(0)
  const chefOrders = useSelector(state => state.Reducers.chefOrders)
  const [currentchefOrders, setcurrentChefOrders] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch()
  React.useEffect(() => {
    setcurrentChefOrders(chefOrders['12-PM'])
  }, [chefOrders])
  return (
    <View style={{
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      width: wp("100%")
    }}
    >

      <Header showBack={false} navigation={navigation} title="To Cook" />

      <View style={{
        flexDirection: "row",
        width: wp("100%"),
        justifyContent: "space-evenly",
        paddingVertical: 20,
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: active == 0 ? colors.iconColor : "#F2F2F2",
            padding: 5,
            borderRadius: 10,
          }}
          onPress={() => {
            setActive(0)
            setcurrentChefOrders(chefOrders['12-PM'])
          }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: active == 0 ? colors.white : "#5A5A5A"
          }}>12PM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: active == 1 ? colors.iconColor : "#F2F2F2",
            padding: 5,
            borderRadius: 10,
          }}
          onPress={() => {
            setActive(1)
            setcurrentChefOrders(chefOrders['06-PM'])
          }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: active == 1 ? colors.white : "#5A5A5A"
          }}>6PM</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            backgroundColor: active == 2 ? colors.iconColor : "#F2F2F2",
            padding: 5,
            borderRadius: 10,
          }}
          onPress={() => {
            setActive(2)
            setcurrentChefOrders(chefOrders['PartyOrder'])
          }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: active == 2 ? colors.white : "#5A5A5A"
          }}>PartyOrder</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{
        flex: 1,
        width: wp("100%"),
        justifyContent: "center",
        alignItems: "center",
      }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          refreshControl={<RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true)
              dispatch(GetChefOrders())
              setRefreshing(false)
            }} />}
          style={{
            width: wp("100%"),
          }}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 20,

          }}
          data={currentchefOrders}
          renderItem={({ item, index }) => <ActiveCard key={index} order={item} navigation={navigation} />}
          keyExtractor={(item) => item.toString()}
        />
      </View>
      <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />
    </View>
  )
}