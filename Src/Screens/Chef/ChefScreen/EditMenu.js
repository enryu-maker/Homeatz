import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../Customer/Comp/Header'

export default function EditMenu({
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
                    width: 30,
                    height: 35,
                }} />
            } showAppend={true} title='Edit Menu'/>
        </View>
    )
}