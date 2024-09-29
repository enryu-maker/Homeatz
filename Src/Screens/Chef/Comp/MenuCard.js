import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrencyCode } from '../../../../../Store/actions'
export default function MenuCard({
    item
}) {
    const [show, setShow] = React.useState(true)
    const [code, setCode] = React.useState("")
    const location = useSelector(state => state.Reducers.location)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getCurrencyCode(location?.country, setCode))
    }, [])
    return (
        <>
            <TouchableOpacity
                onPress={() => setShow(!show)}
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: 8,
                }}>
                <MaterialIcons
                    name={show ? "keyboard-arrow-down" : "keyboard-arrow-right"}
                    size={40}
                    color="black"
                />
                <Text style={{
                    fontSize: RFPercentage(4),
                    fontFamily: "BalsamiqSans-Bold"
                }}>{item.name}</Text>
            </TouchableOpacity>
            {
                show ?
                    <FlatList
                        data={item.value}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    width: "80%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    alignSelf: "flex-end",
                                    marginRight: 10,
                                    padding: 5,
                                }}>
                                    <Text style={{
                                        fontSize: RFPercentage(2.5),
                                        fontFamily: "BalsamiqSans-Regular"
                                    }}>{item.name}</Text>
                                    <Text style={{
                                        fontSize: RFPercentage(2.5),
                                        fontFamily: "BalsamiqSans-Regular"
                                    }}>{code} {item.price}</Text>
                                </View>
                            )
                        }} /> : null}
        </>
    )
}