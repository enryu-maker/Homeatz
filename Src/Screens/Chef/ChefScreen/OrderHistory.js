import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Comp/Header';

export default function OrderHistory({
    navigation
}) {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
        }}>
            <Header navigation={navigation} append={
                <View style={{
                    width: 35,
                    height: 35,
                }} />
            } showAppend={true} title='Order History' />
        </View>
    )
}