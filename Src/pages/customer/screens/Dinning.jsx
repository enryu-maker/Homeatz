import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView, Dimensions, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAddress, getBannerAction, getNearbyChefAction, getPopularAction, getTopRated } from '../../../../store/actions';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Dinning() {
    const [loading, setLoading] = React.useState(false)
    const [index, setIndex] = React.useState(0);
    const [top, setTop] = React.useState([])
    const [chefs, setChefs] = React.useState([])

    const dispatch = useDispatch();

    const access = useSelector(state => state.Reducers.access)
    const location = useSelector(state => state.Reducers.location)
    const banner = useSelector(state => state.Reducers.banner);
    const popular = useSelector(state => state.Reducers.popular);

    React.useEffect(() => {
        if (access != null) {
            dispatch(getActiveAddress(setLoading))
        }
        dispatch(getPopularAction(location));
        dispatch(getBannerAction())
        dispatch(getTopRated(setLoading, setTop, location))
        dispatch(getNearbyChefAction(setLoading, setChefs, location))
    }, [location])
    return (
        <View className=" flex-1">
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#ffffff"
                translucent={true}
            />
            <SafeAreaView className='flex-1 bg-white w-full h-full justify-start items-center'>
                <View
                    className='w-[100%] h-[50px] justify-between px-4 flex-row items-center '>
                    <View className='w-[70%] flex-row space-x-5 items-center '>
                        <Entypo
                            name='location'
                            size={26}
                            color='#bc3061'
                        />
                        <View className='w-[100px]'>
                            <Text className='text-lg font-suseB text-gray-600'>{location?.city}</Text>
                            <Text className='text-xs font-suseB text-gray-400 '>{location?.pin_code}</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <FontAwesome
                            name='search'
                            size={26}
                            color='#bc3061'
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}