import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveAddress, getBannerAction } from '../../../../store/actions';
import Carousel from 'react-native-reanimated-carousel';

export default function Home() {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false)
    const [index, setIndex] = React.useState(0);

    // const active = useSelector(state => state.Reducers.active)
    const access = useSelector(state => state.Reducers.access)
    const location = useSelector(state => state.Reducers.location)
    const banner = useSelector(state => state.Reducers.banner);

    React.useEffect(() => {
        if (access != null) {
            dispatch(getActiveAddress(setLoading))
        }
        dispatch(getBannerAction())
    }, [])
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
            <Carousel
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
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            }}
                        />
                    );
                }}
                height={'30%'}
                width={'100%'}
                onSnapToItem={index => setIndex(index)}
            />
        </View>
    )
}