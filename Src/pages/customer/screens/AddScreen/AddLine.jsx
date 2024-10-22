import { images } from '../../../../assets/image';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { postAddressAction } from '../../../../../store/actions';
export default function AddLine({
    navigation,
    route
}) {
    const { data, location } = route.params;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // Form State using useState
    const [addressType, setAddressType] = useState('Home');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState(data?.address || '');
    const [city, setCity] = useState(data?.city || '');
    const [state, setState] = useState(data?.state || '');
    const [country, setCountry] = useState(data?.country || '');
    const [pinCode, setPinCode] = useState(data?.pincode || '');

    const handleSubmit = () => {
        const addressData = {
            address_type: addressType,
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            city,
            state,
            country,
            pin_code: pinCode,
            latitude: location?.latitude,
            longitude: location?.longitude,
        };

        // Add your validation logic here
        if (!addressLine1 || !city || !state || !country || !pinCode) {
            Alert.alert('Error', 'Please fill out all required fields');
            return;
        }

        var nav = route?.params?.state;
        dispatch(postAddressAction(setLoading, addressData, navigation, nav));
    };
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
                    <Text className="text-2xl font-bold font-suseB text-center text-black">
                        Add Address
                    </Text>
                    <TouchableOpacity className="w-5 h-5"></TouchableOpacity>
                </View>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    className='w-full space-y-3 pb-8'
                >
                    <View className="w-[92%] self-center">
                        <Text className="text-lg font-suseR text-start text-gray-500 ">
                            Address Type*
                        </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            cursorColor={'#bc3061'}
                            value={addressType}
                            onChangeText={setAddressType}
                            placeholder="enter your email"
                            placeholderTextColor={'#6b7280'}
                            className="w-full px-4 text-lg font-suseR h-[50px] bg-white border outline outline-logoPink rounded-md mt-2"
                        />
                    </View>
                    <View className="w-[92%] self-center">
                        <Text className="text-lg font-suseR text-start text-gray-500 ">
                            Address Line 1*
                        </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            cursorColor={'#bc3061'}
                            value={addressLine1}
                            onChangeText={setAddressLine1}
                            placeholder="Address Line 1"
                            placeholderTextColor={'#6b7280'}
                            className="w-full px-4 text-lg font-suseR h-[50px] bg-white border outline outline-logoPink rounded-md mt-2"
                        />
                    </View>

                    <View className="w-[92%] self-center">
                        <Text className="text-lg font-suseR text-start text-gray-500 ">
                            Address Line 2*
                        </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            cursorColor={'#bc3061'}
                            value={addressLine2}
                            onChangeText={setAddressLine2}
                            placeholder="Address Line 2"
                            placeholderTextColor={'#6b7280'}
                            className="w-full px-4 text-lg font-suseR h-[50px] bg-white border outline outline-logoPink rounded-md mt-2"
                        />
                    </View>

                    <View className="w-[92%] self-center">
                        <Text className="text-lg font-suseR text-start text-gray-500 ">
                            City*
                        </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            cursorColor={'#bc3061'}
                            value={city}
                            onChangeText={setCity}
                            placeholder="City"
                            placeholderTextColor={'#6b7280'}
                            className="w-full px-4 text-lg font-suseR h-[50px] bg-white border outline outline-logoPink rounded-md mt-2"
                        />
                    </View>
                    <View className="w-[92%] self-center">
                        <Text className="text-lg font-suseR text-start text-gray-500 ">
                            State*
                        </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            cursorColor={'#bc3061'}
                            value={state}
                            onChangeText={setState}
                            placeholder="State"
                            placeholderTextColor={'#6b7280'}
                            className="w-full px-4 text-lg font-suseR h-[50px] bg-white border outline outline-logoPink rounded-md mt-2"
                        />
                    </View>
                    <View className="w-[92%] self-center">
                        <Text className="text-lg font-suseR text-start text-gray-500 ">
                            Country*
                        </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            cursorColor={'#bc3061'}
                            value={country}
                            onChangeText={setCountry}
                            placeholder="Country"
                            placeholderTextColor={'#6b7280'}
                            className="w-full px-4 text-lg font-suseR h-[50px] bg-white border outline outline-logoPink rounded-md mt-2"
                        />
                    </View>

                    <View className="w-[92%] self-center">
                        <Text className="text-lg font-suseR text-start text-gray-500 ">
                            Pin Code*
                        </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            cursorColor={'#bc3061'}
                            value={pinCode}
                            onChangeText={setPinCode}
                            placeholder="Pincode"
                            placeholderTextColor={'#6b7280'}
                            className="w-full px-4 text-lg font-suseR h-[50px] bg-white border outline outline-logoPink rounded-md mt-2"
                        />
                    </View>
                </KeyboardAwareScrollView>

                <TouchableOpacity
                    className="w-full bg-pink-600 h-16 justify-center items-center"
                    onPress={handleSubmit}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text className="text-xl font-bold text-white">Save Address</Text>
                    )}
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}
