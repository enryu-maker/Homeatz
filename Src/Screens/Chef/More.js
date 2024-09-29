import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { colors } from '../../../Assets/theme'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Header from './Comp/Header'
import { useDispatch } from 'react-redux';
import { LogoutAction } from '../../../../Store/actions';
export default function More({ navigation }) {
    const dispatch = useDispatch()
    return (
        <View style={{
            flex: 1,
            width: wp('100%'),
            alignSelf: 'center',
            backgroundColor: colors.white,
        }}>
            <Header showBack={false} navigation={navigation}  title="More" />

            <View style={{
                height: hp('40%'),
                width: wp('90%'),
                justifyContent: 'space-evenly',
                alignSelf: 'center',
            }}>
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
                        navigation.navigate("ChefProfile")
                    }}
                >
                    <Text style={{
                        fontSize: RFPercentage(4.5),
                        fontFamily: "BalsamiqSans-Bold",
                        color: colors.darkGrey
                    }}>Chef Profile</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("OrderHistory")
                    }}
                >
                    <Text style={{
                        fontSize: RFPercentage(4.5),
                        fontFamily: "BalsamiqSans-Bold",
                        color: colors.darkGrey
                    }}>Order History</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("AddDish")
                    }}
                >
                    <Text style={{
                        fontSize: RFPercentage(4.5),
                        fontFamily: "BalsamiqSans-Bold",
                        color: colors.darkGrey
                    }}>Add New Dish</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("MoreInfo")
                    }}
                >
                    <Text style={{
                        fontSize: RFPercentage(4.5),
                        fontFamily: "BalsamiqSans-Bold",
                        color: colors.darkGrey
                    }}>Contact & Privacy</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => {
                    dispatch(LogoutAction())
                }}
                style={{
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
    )
}