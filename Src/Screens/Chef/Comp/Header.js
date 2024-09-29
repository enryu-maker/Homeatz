import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../../../Assets/theme'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import { RFPercentage } from 'react-native-responsive-fontsize';
export default function Header({
    navigation,
    title,
    showBack = true,
    append,
    showAppend = false,
    subtitle,
    textStyle,
    containerStyle
}) {
    return (
        <SafeAreaView style={{
            marginTop: hp('1%'),
            width: wp('90%'),
            justifyContent: showBack ? 'space-between' : showAppend ? "space-between" : "center",
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        }}>
            {
                showBack ?
                    <Feather
                        onPress={() => navigation.goBack()}
                        name='arrow-left'
                        size={35}
                        color={colors.iconColor}
                        style={{ fontFamily: 'BalsamiqSans-Regular' }}
                    /> : showAppend ? <View style={{
                        width: 60,
                        height: 35,
                    }} /> : null
            }
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Main")

                }}
                style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <View
                    style={{
                        ...containerStyle
                    }}>
                    <Text style={{
                        fontSize: RFPercentage(4.5),
                        fontFamily: showBack ? "BalsamiqSans-Bold" : "LEMONMILK-Bold",
                        color: colors.darkGrey,
                        ...textStyle
                    }}>{title}</Text>
                </View>
                {
                    subtitle ?
                        <Text style={{
                            fontSize: RFPercentage(1.9), // 1.9 equivalent to 14
                            textAlign: "center",
                            fontFamily: "BalsamiqSans-Bold",
                            color: "#CBB26A",
                        }}>{subtitle}</Text>
                        :
                        null
                }
            </TouchableOpacity>
            {
                showAppend ?
                    { ...append }
                    :
                    null
            }

        </SafeAreaView>
    )
}