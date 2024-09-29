import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../Assets/theme';
export default function Counter({
    name="Samosa",
    price=10,
    totalPrice,
}) {
    const [count, setCount] = React.useState(0)
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            height: hp('8%'),
            width: wp('90%'),
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp('25%'),
            }}>
                <TouchableOpacity onPress={() => {
                    if (count > 0) {
                        setCount(count - 1)
                    }
                }}>
                    <Text style={{
                        fontSize: 30,
                        fontFamily: "BalsamiqSans-Bold",
                        color: colors.darkGrey
                    }}>-</Text>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 30,
                    fontFamily: "BalsamiqSans-Bold",
                    color: colors.darkGrey

                }}>{count}</Text>
                <TouchableOpacity onPress={() => {
                    setCount(count + 1)
                }}>
                    <Text style={{
                        fontSize: 30,
                        fontFamily: "BalsamiqSans-Bold",
                        color: colors.darkGrey
                    }}>+</Text>
                </TouchableOpacity>

            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: wp('65%'),
            }}>
                <Text style={{
                    fontSize: 30,
                    fontFamily: "BalsamiqSans-Bold",
                    color: colors.darkGrey
                }}>{name}</Text>
                <Text style={{
                    fontSize: 30,
                    fontFamily: "BalsamiqSans-Bold",
                    color: colors.darkGrey
                }}>
                    {count>0?price*count:price}
                </Text>
            </View>
        </View>
    )
}