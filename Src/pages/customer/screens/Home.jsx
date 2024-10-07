import { View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAddress, getBannerAction, getNearbyChefAction, getPopularAction, getTopRated } from '../../../../store/actions';
import Carousel from 'react-native-reanimated-carousel';
import CircularCard from '../components/CircularCard';
import CircularFoodCard from '../components/CircleFoodCard';
import KitchenCard from '../components/KitchenCard';

export default function Home({
    navigation
}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false)
    const [index, setIndex] = React.useState(0);
    const [top, setTop] = React.useState([])
    const [chefs, setChefs] = React.useState([])

    // const active = useSelector(state => state.Reducers.active)
    const access = useSelector(state => state.Reducers.access)
    const location = useSelector(state => state.Reducers.location)
    const banner = useSelector(state => state.Reducers.banner);
    const popular = useSelector(state => state.Reducers.popular);
    console.log(chefs)
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
        <View className=" flex-1 bg-white w-screen justify-start items-center text-logoPink">
            <View
                className='w-[100%] h-[50px] justify-between px-4 flex-row items-center '>
                <View className='w-[70%] flex-row space-x-5 items-center '>
                    <Entypo
                        name='location'
                        size={26}
                        color='#bc3061'
                    />
                    <View className='w-[100px]'>
                        <Text className='text-lg font-suseR text-gray-600'>{location?.city}</Text>
                        <Text className='text-xs font-suseB text-gray-400 '>{location?.pin_code}</Text>
                    </View>
                </View>
            </View>
            {/* <Carousel
                loop
                mode="parallax"
                pagingEnabled={true}
                autoplayInterval={5000}
                scrollAnimationDuration={1000}
                autoPlay={true}
                data={banner}
                renderItem={({ item, index }) => {
                    return (
                        <Image
                            source={{ uri: item['img'].uri }}
                        // style={{
                        //     width: '100%',
                        //     height: '100%',
                        //     resizeMode: 'contain',
                        // }}
                        />
                    );
                }}
                // height={'30%'}
                // width={'100%'}
                onSnapToItem={index => setIndex(index)}
            /> */}
            <View className=' w-screen flex items-center py-4 '>
                <View className='w-[92%] h-[50px] shadow-xl border border-gray-100 shadow-gray-400 bg-white rounded-xl items-center flex-row px-3 justify-between '>
                    <FontAwesome
                        name='search'
                        size={26}
                        color='#bc3061'
                    />
                    <TextInput
                        className='w-[90%] font-suseR text-lg '
                        placeholder=' Restaurant name or a dish....'
                    />
                </View>
            </View>
            <ScrollView>

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
                <KitchenCard
                    name={chefs[0]?.name}
                    img={chefs[0]?.icon}
                    id={chefs[0]?.id}
                    distance={chefs[0]?.distance}
                    navigation={navigation}
                />
            </ScrollView>

        </View>
    )
}