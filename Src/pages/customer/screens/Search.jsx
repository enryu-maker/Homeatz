import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
    SafeAreaView,
    Keyboard,
    FlatList,
    ActivityIndicator
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { images } from '../../../assets/image';
import { getLocation, searchProduct } from '../../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import FoodCard from '../components/FoodCard';
export default function Search({
    navigation,
}) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [query, setQuery] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([])

    const dispatch = useDispatch()
    const location = JSON.stringify(useSelector(state => state.Reducers.location))

    const onRefresh = React.useCallback(() => {
        setData([])
        setQuery("")
        dispatch(getLocation(setLoading, Platform.OS));
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [dispatch]);

    React.useEffect(() => {
        setData([])
        setQuery("")
    }, [])

    return (
        <View className=" flex-1">
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#ffffff"
                translucent={true}
            />
            <SafeAreaView className='flex-1 bg-white w-full h-full justify-start items-center'>
                <TouchableOpacity
                    className='w-[92%] self-center'
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Image
                        source={images.back}
                        className='h-5 w-5 object-contain'
                        tintColor={"#6b7280"}
                    />
                </TouchableOpacity>
                <View className=' w-screen flex items-center py-4 '>
                    <View className='w-[92%] h-[50px] shadow-sm border border-gray-100 shadow-gray-200 bg-white rounded-xl items-center flex-row px-3 justify-between '>
                        <FontAwesome
                            name='search'
                            size={26}
                            color='#bc3061'
                        />
                        <TextInput
                            className='w-[90%] font-suseR'
                            placeholder=' Restaurant name or a dish....'
                            returnKeyType="search"
                            onSubmitEditing={() => {
                                dispatch(searchProduct(setLoading, setData, query, JSON.parse(location)))
                                Keyboard.dismiss()
                            }} // Call function on Return key press
                            blurOnSubmit={false}
                            value={query}
                            onChangeText={(text) => {
                                setQuery(text)
                            }}
                        />
                    </View>
                </View>
                {
                    loading ?
                        <View className=' flex-1 justify-center items-center'>
                            <ActivityIndicator
                                size="large"
                                color={"#e53988"}
                            />
                        </View>
                        :
                        <>
                            <Text className='text-gray-400  text-base font-suseR'>
                                Searched results for {query}
                            </Text>
                            <FlatList
                                className=' w-screen mt-3'
                                data={data}
                                renderItem={({ item, index }) => <FoodCard kitchen_id={item?.chef_id} item={item} key={index} navigation={navigation} />}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingBottom: 20,
                                    width: '100%',
                                }}
                            />
                        </>

                }

            </SafeAreaView>
        </View>
    )
}