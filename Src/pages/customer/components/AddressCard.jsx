import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { DeleteAddress, getActiveAddress, setActiveAddress } from '../../../../store/actions';

export default function AddressCard({
    data,
    show = true,
    active,
    setAddress
}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);

    return (
        <TouchableOpacity
            className={`w-[92%] self-center p-2  mt-5 rounded-lg shadow-md bg-white 
        ${active ? 'border border-black' : 'border-0'}`}
            onPress={() => {
                dispatch(setActiveAddress(setLoading, data?.id));
                dispatch(getActiveAddress(setLoading));
            }}
        >
            {
                loading ?
                    // <ActivityIndicator size="small" color={colors.logoPink} />
                    null
                    :
                    <>
                        <Text className="text-lg font-bold text-darkGrey">
                            {data?.address_type}
                        </Text>
                        <Text className="text-base font-normal text-darkGrey">
                            {`${data?.address_line_1} ${data?.address_line_2}, ${data?.city}, ${data?.state}, ${data?.country}, ${data?.pin_code}`}
                        </Text>

                        {show && (
                            <View className="flex-row justify-end mt-2">
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(DeleteAddress(setLoading, data?.id, setAddress));
                                    }}
                                    className="w-8 h-8 rounded-full justify-center items-center border border-logoPink"
                                >
                                    <AntDesign name="delete" size={18} className=" text-iconColor" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
            }
        </TouchableOpacity>
    )
}
