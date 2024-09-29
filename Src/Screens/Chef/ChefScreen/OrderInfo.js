import { View, Text, TouchableOpacity, ScrollView, Platform, Linking } from 'react-native'
import React from 'react'
import { colors } from '../../../../Assets/theme'
import { ActivityIndicator, DataTable } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrencyCode, getItemsAction, updateStatus } from '../../../../../Store/actions'
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../../../Component/ToastConfig';
import Header from '../Comp/Header';
export default function OrderInfo({
    route,
    navigation
}) {
    const order = route.params.order
    console.log(order?.status)
    const address = JSON.parse(order?.address)
    const [loading, setLoading] = React.useState(false)
    const [product, setProduct] = React.useState([])
    const dispatch = useDispatch()
    const location = useSelector(state => state.Reducers.location)
    const [code, setCode] = React.useState("")
    React.useEffect(() => {
        dispatch(getItemsAction(setLoading, setProduct, order?.items?.split(',')))
        dispatch(getCurrencyCode(location?.country, setCode))

    }, [])
    console.log(product)
    const [d, m, y] = order?.delivery_date.split(/-|\//); // splits "26-02-2012" or "26/02/2012"
    const date = new Date(y, m - 1, d);
    const currentDate = new Date();
    const date2 = new Date(currentDate?.getDate(), currentDate?.getMonth(), currentDate?.getFullYear())
    function checkStatus(order) {
        switch (order?.status) {
            case 0:
                return <Text style={{
                    fontSize: 22,
                    fontFamily: 'BalsamiqSans-Bold',
                    alignSelf: "flex-start",
                    color: colors.darkGrey,
                    marginTop: hp('2%'),
                }}>Status : <Text style={{
                    fontSize: 20,
                    fontFamily: 'BalsamiqSans-Bold',
                    alignSelf: "flex-start",
                    color: "red"
                }}>Cancelled</Text></Text>
            case 2:
                return <View style={{
                    flexDirection: "row",
                    gap: 10,
                    marginTop: hp('2%'),
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: "red",
                        padding: 6,
                        borderRadius: 10,
                    }}
                        onPress={() => {
                            dispatch(updateStatus(order?.id, 0, setLoading, 1, navigation))
                        }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: colors.white
                        }}>
                            {
                                loading ?
                                    <ActivityIndicator color={colors.white} size="small" />
                                    : "Cancel"
                            }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(updateStatus(order?.id, 3, setLoading, 1, navigation))
                        }}
                        style={{
                            backgroundColor: colors.green,
                            padding: 6,
                            borderRadius: 10,
                        }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: colors.white
                        }}>
                            {
                                loading ?
                                    <ActivityIndicator color={colors.white} size="small" />
                                    : "Accept"
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            case 3:
                return <Text style={{
                    fontSize: 22,
                    fontFamily: 'BalsamiqSans-Bold',
                    alignSelf: "flex-start",
                    color: colors.darkGrey,
                    marginTop: hp('2%'),
                }}>Status : <Text style={{
                    fontSize: 20,
                    fontFamily: 'BalsamiqSans-Bold',
                    alignSelf: "flex-start",
                    color: colors.green
                }}>Order Accepted</Text></Text>
            case 4:
                return <Text style={{
                    fontSize: 18,
                    fontFamily: 'BalsamiqSans-Bold',
                    alignSelf: "flex-start",
                    color: colors.darkGrey
                }}>Status : <Text style={{
                    fontSize: 16,
                    fontFamily: 'BalsamiqSans-Bold',
                    alignSelf: "flex-start",
                    color: colors.green
                }}>Out For Delivery</Text></Text>
            case 5:
                return <Text style={{
                    fontSize: 18,
                    fontFamily: 'BalsamiqSans-Bold',
                    alignSelf: "flex-start",
                    color: colors.darkGrey
                }}>Status : <Text style={{
                    fontSize: 16,
                    fontFamily: 'BalsamiqSans-Bold',
                    alignSelf: "flex-start",
                    color: colors.iconColor
                }}>Delivered</Text></Text>
            default:
                break;
        }
    }
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
            } showAppend={true} title='Order Info' />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    marginBottom: order?.status === 5 || order?.status === 0 || order?.status === 2 || !order?.payment_status ? hp(0) : hp(10)
                }}
            >
                <View style={{
                    width: wp("85%"),
                    gap: 10,
                    marginTop: hp('3%'),
                }}>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.darkGrey
                    }}>Order ID : <Text style={{
                        fontSize: 20,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.iconColor
                    }}>{order?.id}</Text></Text>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.darkGrey
                    }}>Order Value : <Text style={{
                        fontSize: 20,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.iconColor
                    }}>{`${code} ${order?.total / 100}`}</Text></Text>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.darkGrey
                    }}>Delivery Date : <Text style={{
                        fontSize: 20,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.iconColor
                    }}>{order?.delivery_date}</Text></Text>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.darkGrey
                    }}>Delivery Time : <Text style={{
                        fontSize: 20,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.iconColor
                    }}>{order?.delivery_slot} PM</Text></Text>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.darkGrey
                    }}>Delivery Mode : <Text style={{
                        fontSize: 20,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.iconColor
                    }}>{order?.pickup_address === null ? "Home Delivery" : "Chef Pickup"}</Text></Text>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.darkGrey,
                        marginTop: hp('3%'),
                    }}>Order Details : </Text>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title
                            >Name
                            </DataTable.Title>
                            <DataTable.Title
                            >Quantity
                            </DataTable.Title>
                        </DataTable.Header>
                        {
                            order?.items?.split(',')?.map((item, index) => (
                                <DataTable.Row>
                                    <DataTable.Cell
                                    >{product[index]?.name}</DataTable.Cell>
                                    <DataTable.Cell># {JSON.parse(order?.subtotal_qty)[parseInt(item)]}</DataTable.Cell>
                                </DataTable.Row>
                            ))
                        }

                    </DataTable>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.darkGrey,
                        marginTop: hp('3%'),
                    }}>Payment Mode :
                        <Text style={{
                            fontSize: 20,
                            fontFamily: 'BalsamiqSans-Bold',
                            alignSelf: "flex-start",
                            color: colors.iconColor
                        }}> {order?.payment_mode}</Text></Text>
                    {
                        order?.payment_mode == "PhonePe PG" ?
                            <Text style={{
                                fontSize: 22,
                                fontFamily: 'BalsamiqSans-Bold',
                                alignSelf: "flex-start",
                                color: colors.darkGrey,
                            }}>Payment Status :
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: 'BalsamiqSans-Bold',
                                    alignSelf: "flex-start",
                                    color: order?.payment_status ? colors.green : "red"
                                }}> {order?.payment_status ? "Paid" : "Payment Pending"}</Text></Text>
                            : null
                    }

                    <Text style={{
                        fontSize: 22,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.darkGrey
                    }}>Customer Details</Text>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.darkGrey
                    }}>Name : <Text style={{
                        fontSize: 20,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.iconColor
                    }}>{order?.user_name}</Text></Text>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: 'BalsamiqSans-Bold',
                        alignSelf: "flex-start",
                        color: colors.darkGrey
                    }}>Phone : <Text
                        onPress={() => {
                            Linking.openURL(Platform.OS === "android" ? `telprompt:${order?.user_phone}` : `tel:${order?.user_phone}`)
                        }}
                        style={{
                            fontSize: 20,
                            fontFamily: 'BalsamiqSans-Bold',
                            alignSelf: "flex-start",
                            color: colors.iconColor
                        }}>{order?.user_phone}</Text></Text>
                    {
                        order?.pickup_address === null ?
                            <Text style={{
                                fontSize: 22,
                                fontFamily: 'BalsamiqSans-Bold',
                                alignSelf: "flex-start",
                                color: colors.darkGrey,
                            }}>Address :
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: 'BalsamiqSans-Bold',
                                    alignSelf: "flex-start",
                                    color: colors.iconColor
                                }}>
                                    {`${address?.address_line_1} ${address?.address_line_2}, ${address?.city}, ${address?.state}, ${address?.country}, ${address?.pin_code}`}
                                </Text></Text>
                            :
                            null
                    }

                    {checkStatus(order)}
                </View>
            </ScrollView>
            {
                order?.status === 5 || order?.status === 0 || order?.status === 2 || !order?.payment_status ?
                    null
                    :
                    date?.getTime() === date2?.getTime() ?
                        <TouchableOpacity
                            style={{
                                width: wp("100%"),
                                backgroundColor: colors.logoPink,
                                position: "absolute",
                                bottom: 0,
                                height: hp("10%"),
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => {
                                if (order?.status === 4) {
                                    navigation.navigate("Verify", {
                                        orderId: order?.id
                                    })
                                }
                                else {
                                    dispatch(updateStatus(order?.id, 4, setLoading, 1, navigation))
                                }
                            }}
                        >
                            <Text style={{
                                fontSize: 22,
                                fontFamily: 'BalsamiqSans-Bold',
                                alignSelf: "center",
                                color: colors.white
                            }}>
                                {loading ?
                                    <ActivityIndicator color={colors.white} size="small" />
                                    : order?.status === 4 ? "Deliver" : "Start Delivery"
                                }
                            </Text>
                        </TouchableOpacity>
                        :
                        null
            }
            <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />
        </View>
    )
}