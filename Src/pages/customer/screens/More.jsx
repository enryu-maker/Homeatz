import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import React from 'react';
import { images } from '../../../assets/image';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersAction, getProfileAction } from '../../../../store/actions';

export default function More({
    navigation
}) {

    const access = useSelector(state => state.Reducers.access)
    const dispatch = useDispatch();
    const [Profile, setProfile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        if (access) {
            dispatch(getOrdersAction())
            dispatch(getProfileAction(setLoading, setProfile))
        }
    }, [dispatch])
    return (
        <View className=" flex-1">
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor={"#e53988"}
                translucent={true}
            />
            <SafeAreaView className={`flex-1 bg-white w-full h-full justify-start items-center ${Platform.OS === "ios" ? "" : "mt-[45px]"}`}>

                {
                    access ?
                        <ScrollView
                            className='w-full'
                        >
                            <View className=' space-y-1 mt-5 w-[92%] flex-row justify-around items-center  h-[100px]'>
                                <Image
                                    source={{ uri: Profile?.profile_photo }}
                                    className=' w-[80px] h-[80px] rounded-full object-contain'
                                // resizeMode='cover'
                                />
                                <View className=' h-auto w-[60%] items-start'>
                                    <Text className=' text-black text-lg font-suseB'>
                                        {Profile?.full_name}
                                    </Text>
                                    <Text className=' text-gray-600 text-base font-suseR'>
                                        {Profile?.email}
                                    </Text>
                                    <Text className=' text-gray-600 text-base font-suseR'>
                                        {Profile?.phone}
                                    </Text>
                                </View>
                            </View>
                            <View className=' space-y-1 mt-5 w-full px-4'>
                                <Text className='text-gray-800 text-xl font-suseB'>
                                    Order
                                </Text>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'
                                    onPress={() => { navigation.navigate('Order') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>Order Details</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />
                                </TouchableOpacity>
                            </View>
                            <View className=' space-y-1 mt-5 w-full px-4'>
                                <Text className='text-gray-800 text-xl font-suseB'>
                                    Address
                                </Text>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'
                                    onPress={() => { navigation.navigate('Address') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>Address Details</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />
                                </TouchableOpacity>
                            </View>
                            <View className=' space-y-1 mt-5 w-full px-4'>
                                <Text className='text-gray-800 text-xl font-suseB'>
                                    Contact & Privacy
                                </Text>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'
                                    onPress={() => { navigation.navigate('About') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>About Us</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'

                                    onPress={() => { navigation.navigate('FAQ') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>FAQ</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'

                                    onPress={() => { navigation.navigate('Contact') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>Contact Us</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'

                                    onPress={() => { navigation.navigate('Terms') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>Terms & Condition</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'

                                    onPress={() => { navigation.navigate('Data') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>Data Policy</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />

                                </TouchableOpacity>
                            </View>
                            <Text className='text-gray-400 text-center py-5 text-md font-suseR'>
                                Version : 1.2
                            </Text>
                            {/* <Text className='text-gray-400 text-left w-full bottom-0 p-5 absolute text-2xl font-suseB'>
                                food made with <Text className=' text-iconColor'>LOVE</Text>
                            </Text> */}
                        </ScrollView>
                        :
                        <ScrollView
                            className='w-full h-full'
                        >
                            <View className="w-full  h-[220px] justify-evenly items-center bg-iconColor p-2">
                                <Text className="text-2xl text-white font-suseR text-center">
                                    Continue As?
                                </Text>
                                <View className="flex-row w-full justify-around items-center">
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('Login', {
                                                chef: false,
                                            });
                                        }}>
                                        <Image
                                            source={images.bonus}
                                            className="w-[110px] h-[110px] border bg-white object-cover   rounded-full"
                                        />
                                        <Text className="text-xl font-suseR  text-white text-center">
                                            Customer
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('Login', {
                                                chef: true,
                                            });
                                        }}>
                                        <Image
                                            source={images?.cook}
                                            className="w-[110px] h-[110px] border bg-white   rounded-full"
                                        />
                                        <Text className="text-xl font-suseR  text-white text-center">
                                            Chef
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View className=' space-y-1 mt-5 w-full px-4'>
                                <Text className='text-gray-800 text-xl font-suseB'>
                                    Contact & Privacy
                                </Text>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'
                                    onPress={() => { navigation.navigate('About') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>About Us</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'

                                    onPress={() => { navigation.navigate('FAQ') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>FAQ</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'

                                    onPress={() => { navigation.navigate('Contact') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>Contact Us</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'

                                    onPress={() => { navigation.navigate('Terms') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>Terms & Condition</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    className='flex-row justify-between items-center'

                                    onPress={() => { navigation.navigate('Data') }}
                                >
                                    <Text className=' px-2 text-lg font-suseR'>Data Policy</Text>
                                    <Image source={images.back} className=' h-4 w-4 rotate-180' />

                                </TouchableOpacity>
                            </View>
                            <Text className='text-gray-400 py-5 text-center text-md font-suseR'>
                                Version : 1.2
                            </Text>
                            <Text className='text-gray-400 text-left w-full bottom-0 p-5 fixed text-2xl font-suseB'>
                                food made with <Text className=' text-iconColor'>LOVE</Text>
                            </Text>
                        </ScrollView>
                }
            </SafeAreaView>
        </View>
    )
}