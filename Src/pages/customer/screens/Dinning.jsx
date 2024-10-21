import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView, Dimensions, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAddress, getBannerAction, getNearbyChefAction, getPopularAction, getTopRated } from '../../../../store/actions';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { images } from '../../../assets/image';
import KitchenCard from '../components/KitchenCard';
import CircularCard from '../components/CircularCard';
import CircularFoodCard from '../components/CircleFoodCard';
import LottieView from 'lottie-react-native';
import { animation } from '../../../assets/animation';
export default function Dinning({
    navigation
}) {
    const [loading, setLoading] = React.useState(false)
    const [top, setTop] = React.useState([])
    const [chefs, setChefs] = React.useState([])

    const dispatch = useDispatch();

    const access = useSelector(state => state.Reducers.access)
    const location = useSelector(state => state.Reducers.location)
    const popular = useSelector(state => state.Reducers.popular);

    React.useEffect(() => {
        if (access != null) {
            dispatch(getActiveAddress(setLoading))
        }
        dispatch(getPopularAction(location));
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
                {
                    loading ?
                        <View className=" flex-1 justify-center bg-white items-center text-logoPink">
                            <LottieView
                                source={animation.food} // Add your Lottie file path here
                                autoPlay
                                loop
                                style={{ width: 100, height: 100 }}// Adjust size as needed
                            />
                        </View>
                        :
                        <>
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
                            <Image source={images.pickup} className='w-screen h-[200px] object-cover' />
                            <View className=' w-screen flex items-center flex-row justify-evenly mt-5 '>
                                <View className='w-[25%] h-[2px] bg-slate-200' />
                                <Text className='text-xl font-suseR text-gray-800 '>Popular Dishes</Text>
                                <View className='w-[25%] h-[2px] bg-slate-200' />
                            </View>
                            <FlatList
                                disableVirtualization={false}
                                data={top}
                                className=' w-screen h-auto '
                                renderItem={({ item, index }) => {
                                    return (
                                        <CircularFoodCard
                                            key={index}
                                            name={item.name}
                                            img={item.icon}
                                            id={item.id}
                                            navigation={navigation}
                                        />
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={false}
                                numColumns={3}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                }}
                            />
                            <View className=' w-screen flex items-center flex-row justify-evenly mt-5 '>
                                <View className='w-[25%] h-[2px] bg-slate-200' />
                                <Text className='text-xl font-suseR text-gray-800 '>Popular Chefs</Text>
                                <View className='w-[25%] h-[2px] bg-slate-200' />
                            </View>
                            <FlatList
                                disableVirtualization={false}
                                data={popular}
                                className=' w-screen h-auto '
                                renderItem={({ item, index }) => {
                                    return (
                                        <CircularCard
                                            key={index}
                                            name={item.name}
                                            img={item.icon}
                                            id={item.id}
                                            navigation={navigation}
                                        />
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={false}
                                numColumns={3}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                }}
                            />
                            <View className=' w-screen flex items-center flex-row justify-evenly mt-5 '>
                                <View className='w-[25%] h-[2px] bg-slate-200' />
                                <Text className='text-xl font-suseR text-gray-800 '>All Kitchen</Text>
                                <View className='w-[25%] h-[2px] bg-slate-200' />
                            </View>
                            <Text className='text-xl font-suseR text-gray-800  px-5 py-3'>{chefs?.length} Kitchen near you</Text>
                            <FlatList
                                disableVirtualization={false}
                                data={chefs}
                                className=' w-screen h-auto '
                                renderItem={({ item, index }) => {
                                    return (
                                        <KitchenCard
                                            name={chefs?.name}
                                            img={chefs?.icon}
                                            id={chefs?.id}
                                            distance={chefs?.distance}
                                            navigation={navigation}
                                        />
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                // horizontal={false}
                                // numColumns={3}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',

                                }}
                            />
                        </>
                }
            </SafeAreaView>
        </View>
    )
}