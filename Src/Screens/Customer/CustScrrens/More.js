import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { colors } from '../../../Assets/theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from './Comp/Header'
import { useSelector } from 'react-redux';
export default function More({ navigation }) {
  const access = useSelector(state => state.Reducers.access)
  return (
    <View style={{
      flex: 1,
      width: wp('100%'),
      alignSelf: 'center',
      backgroundColor: colors.white,
    }}>
      <Header showBack={false} title="More" />

      <View style={{
        height: hp('40%'),
        width: wp('90%'),
        justifyContent: 'space-evenly',
        alignSelf: 'center',
      }}>
        {
          access ?
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile")
                }}
              >
                <Text style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: "BalsamiqSans-Bold",
                  color: colors.darkGrey
                }}>My Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("OrderHistory")
                }}
              >
                <Text style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: "BalsamiqSans-Bold",
                  color: colors.darkGrey
                }}>Order History</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("OrderHistory")
                }}
              >
                <Text style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: "BalsamiqSans-Bold",
                  color: colors.darkGrey
                }}>Address Book</Text>
              </TouchableOpacity>
            </>
            :
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login")
                }}
              >
                <Text style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: "BalsamiqSans-Bold",
                  color: colors.darkGrey
                }}>Login / Signup</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register")
                }}
              >
                <Text style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: "BalsamiqSans-Bold",
                  color: colors.darkGrey
                }}>Join as Chef</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register")
                }}
              >
                <Text style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: "BalsamiqSans-Bold",
                  color: colors.darkGrey
                }}>About</Text>
              </TouchableOpacity>
            </>
        }
      </View>
      {
        access ?
          <View style={{
            height: hp('15%'),
            width: wp('90%'),
            justifyContent: 'space-evenly',
            alignSelf: 'center',
          }}>
            <TouchableOpacity style={{
              width: wp('90%'),
              marginTop: hp('10%'),
              alignSelf: 'center',
            }}>
              <Text style={{
                fontSize: RFPercentage(4.5),
                fontFamily: "BalsamiqSans-Bold",
                color: colors.darkGrey
              }}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: wp('90%'),
              marginTop: hp('10%'),
              alignSelf: 'center',
            }}>
              <Text style={{
                fontSize: RFPercentage(4.5),
                fontFamily: "BalsamiqSans-Bold",
                color: "red"
              }}>Logout</Text>
            </TouchableOpacity>
          </View>
          : null
      }
    </View>
  )
}