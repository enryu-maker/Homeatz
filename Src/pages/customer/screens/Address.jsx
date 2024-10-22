import { View, Text, StatusBar, SafeAreaView, RefreshControl, FlatList, TouchableOpacity, Image, Platform, ActivityIndicator } from 'react-native';
import React from 'react';
import { images } from '../../../assets/image';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAddress, getAddressAction, deleteAddress } from '../../../../store/actions';
import LottieView from 'lottie-react-native';
import { animation } from '../../../assets/animation';
import AddressCard from '../components/AddressCard';
export default function Address({
    navigation,
    route,
}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [daddress, setAddress] = React.useState([])
    const activeAdd = useSelector(state => state.Reducers.active)
    React.useEffect(() => {
        dispatch(getAddressAction(setLoading, setAddress))
        dispatch(getActiveAddress(setLoading))
    }, [dispatch])
    return (
        <View className="flex-1 bg-white">
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#ffffff"
                translucent={true}
            />
            <SafeAreaView className={`flex-1 w-full justify-start items-center ${Platform.OS === "ios" ? "" : "mt-[45px]"}`}>
                {/* Header Section */}
                <View className="flex-row w-[100%] px-4 h-[50px] items-center justify-between">
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Image className="w-5 h-5" tintColor={'#000'} source={images.back} />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-center font-suseB text-black">
                        Address
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AddAddress')
                        }}
                        className="">
                        <Image source={images.add} className=' h-8 w-8' />
                    </TouchableOpacity>
                </View>
                <View className="flex-1 w-full justify-center items-center">
                    {loading ? (
                        <LottieView
                            source={animation.loading} // Add your Lottie file path here
                            autoPlay
                            loop
                            style={{ width: 250, height: 250 }} // Adjust size as needed
                        />
                    ) : (
                        <FlatList
                            data={daddress}
                            className='w-full'
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <AddressCard
                                    active={activeAdd?.id === item.id}
                                    data={item}
                                    navigation={navigation}
                                    setAddress={setAddress}
                                    onPressDelete={() => dispatch(deleteAddress(setLoading, item?.id, setAddress))}
                                />
                            )}
                        />
                    )}
                </View>
            </SafeAreaView>
        </View>
    )
}