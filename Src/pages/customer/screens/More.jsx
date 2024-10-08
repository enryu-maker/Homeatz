import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import React from 'react';
import { images } from '../../../assets/image';
import { useSelector } from 'react-redux';

export default function More({
    navigation
}) {

    const access = useSelector(state => state.Reducers.access)
    return (
        <View className=" flex-1">
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor={"#e53988"}
                translucent={true}
            />
            <SafeAreaView className='flex-1 bg-white w-full h-full justify-start items-center'>

                {
                    access ?
                        <>
                        </>
                        :
                        <>
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
                            <Text className='text-gray-400 py-5 text-md font-suseR'>
                                Version : 1.2
                            </Text>
                            <Text className='text-gray-400 text-left w-full bottom-0 p-5 absolute text-2xl font-suseB'>
                                Food's made with <Text className=' text-iconColor'>LOVE</Text>
                            </Text>
                        </>
                }
            </SafeAreaView>
        </View>
    )
}