import { View, Image, Text, TouchableOpacity, Platform, SafeAreaView } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { images } from '../../../../assets/image';
import LottieView from 'lottie-react-native';
import { animation } from '../../../../assets/animation';
import { getLocation } from '../../../../../store/actions';

export default function AddAddress({ navigation, route }) {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });

    const location = useSelector(state => state.Reducers.location);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setLoading(true);
        dispatch(getLocation(setLoading, Platform.OS));
        console.log(data)
    }, []);

    function goToInitialLocation() {
        let initialRegion = Object.assign({}, location);
        initialRegion.latitudeDelta = 0.005;
        initialRegion.longitudeDelta = 0.005;
        this.mapView.animateToRegion(initialRegion, 2000);
    }

    async function onRegionChange(region) {
        await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${region?.latitude}&lon=${region?.longitude}&apiKey=328fd33ba9f0413d9b38d214f042e36c`)
            .then(res => {
                const properties = res.data.features[0].properties;
                setData({
                    address: properties.street,
                    city: properties.city,
                    state: properties.state,
                    country: properties.country,
                    pincode: properties.postcode
                });
            })
            .catch(err => {
                console.error(err)
            });
    }

    return (
        <View className="flex-1 bg-white justify-center items-center">

            {loading ? (
                <LottieView
                    source={animation.location} // Add your Lottie file path here
                    autoPlay
                    loop
                    style={{ width: 250, height: 250 }} // Adjust size as needed
                />
            ) : (
                <>
                    <SafeAreaView className={`flex-1 w-full justify-start items-center ${Platform.OS === "ios" ? "" : "mt-[45px]"}`}>
                        {/* Header Section */}
                        <View className="flex-row w-[100%] px-4 h-[50px] items-center justify-between">
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}>
                                <Image className="w-5 h-5" tintColor={'#000'} source={images.back} />
                            </TouchableOpacity>
                            <Text className="text-2xl font-bold font-suseB text-center text-black">
                                Add Address
                            </Text>
                            <TouchableOpacity className="w-5 h-5"></TouchableOpacity>
                        </View>
                        <MapView
                            provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                            style={{ width: '100%', height: '100%' }}
                            onRegionChange={onRegionChange}
                            ref={ref => (this.mapView = ref)}
                            showsUserLocation={true}
                            initialRegion={location}
                            onMapReady={goToInitialLocation}
                            zoomEnabled={true}
                        >
                            <Marker
                                coordinate={{
                                    latitude: location?.latitude,
                                    longitude: location?.longitude,
                                }}
                                title={"Your Location"}
                                description={"Your Location"}
                            />
                        </MapView>

                        <View className="justify-evenly space-y-4 absolute bottom-0 w-full items-center p-3">
                            <View className="flex-row w-[92%] bg-white rounded-xl justify-start p-3">
                                <Feather
                                    name="map-pin"
                                    size={25}
                                    className="text-iconColor"
                                />
                                <View className="ml-3">
                                    <Text className="text-lg font-bold font-suseB text-black">{data?.address}</Text>
                                    <Text className="text-base text-black font-suseB">{data?.city}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('AddLine', {
                                        data,
                                        location,
                                        state: route?.params?.state
                                    });
                                }}
                                className="w-[90%] p-4 bg-pink-600 rounded-xl justify-center items-center"
                            >
                                <Text className="text-lg font-bold font-suseB text-white">
                                    Add Complete Address
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </>
            )}
        </View>
    );
}
