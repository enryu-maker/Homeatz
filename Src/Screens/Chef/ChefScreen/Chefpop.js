import { View, Text, Modal } from 'react-native'
import React from 'react'
import { colors } from '../../../../Assets/theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import TextButton from '../../../../Component/TextButton'
import { useRoute } from '@react-navigation/native';
export default function Chefpop({
    modalVisible,
    navigation
}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            }}>
            <View style={{
                // height: "55%",
                width: "95%",
                backgroundColor: colors.white,
                alignSelf: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
                marginTop: hp("14%"),
                borderRadius: 15,
                padding: 10
            }}>
                <Text style={{
                    width: wp('90%'),
                    fontSize: 25,
                    textAlign: "center",
                    fontFamily: "BalsamiqSans-Bold",
                    color: "red",
                }}>Important Notice</Text>
                <Text style={{
                    width: wp('90%'),
                    fontSize: 20,
                    textAlign: "center",
                    fontFamily: "BalsamiqSans-Bold",
                    color: colors.black,
                    marginVertical: 5
                }}>Chef Profile is Not Created</Text>
                <TextButton
                    title={"Create Now"}
                    onPress={() => {
                        navigation.navigate("ChefProfile")
                    }}
                />
            </View>
        </Modal>

    )
}