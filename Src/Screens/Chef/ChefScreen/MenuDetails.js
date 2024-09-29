import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Header from '../Comp/Header'
import { useDispatch } from 'react-redux'
import { getChefProfile, getMenuDetails } from '../../../../../Store/actions'
import { ActivityIndicator } from 'react-native-paper'
import { colors } from '../../../../Assets/theme'
import MenuCard from '../Comp/MenuCard'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
export default function MenuDetails({
    navigation,
    route
}) {
    const [menu, setMenu] = React.useState([])
    const [profile, setProfile] = React.useState({})
    const [loading, setLoading] = React.useState(false)

    const dispatch = useDispatch()
    function formatData(data) {
        const arr = []
        Object.keys(data).map((item, index) => {
            arr.push({
                "name": item,
                "value": data[item]
            })
        }
        )
        return arr
    }
    React.useEffect(() => {
        dispatch(getMenuDetails(setLoading, setMenu, route.params.item))
        dispatch(getChefProfile(setLoading, setProfile))

    }, [])
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white'
        }}>
            <Header showBack={true} title="Details" showAppend={true}
                navigation={navigation}
                append={
                    <View style={{
                        height: 30,
                        width: 30,
                    }} />
                }
            />
            <Text style={{
                width: wp('90%'),
                fontSize: 20,
                textAlign: "center",
                fontFamily: "BalsamiqSans-Bold",
                color: colors.darkGrey,
                paddingTop: hp("2.5%")
            }}>Kitchen :
                <Text style={{
                    color: colors.iconColor,
                    textAlign: "center"
                }}> {`${profile?.kitchen_name} ${profile?.city} `}
                </Text>
            </Text>
            {
                loading ?
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size="large" color={colors.logoPink} />
                    </View>
                    :
                    <FlatList
                        style={{
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: 20
                        }}
                        data={formatData(menu)}
                        renderItem={({ item }) => {
                            return (
                                <MenuCard item={item} />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
            }
        </View>
    )
}