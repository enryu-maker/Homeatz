import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Header from '../Comp/Header';
import ImagePicker from 'react-native-image-crop-picker';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../../../Assets/theme';
import { Controller, useForm } from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../../../Component/ToastConfig';
import { ActivityIndicator } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { addChefProfile, getChefProfile, getLocation, updateChefProfile } from '../../../../../Store/actions';
import { baseURL1 } from '../../../../Helper/Helper';
import Chefpop from './Chefpop';
export default function ChefProfile({
    navigation
}) {

    const [image, setImage] = React.useState(null);
    const [loading, setLoading] = React.useState(false)
    const [userInvalid, setUserInvalid] = React.useState(false);
    const [address, setAddress] = React.useState({});
    const [imageError, setImageError] = React.useState(true);
    const dispatch = useDispatch()
    const profileCreated = useSelector(state => state.Reducers.profileCreated)
    const location = useSelector(state => state.Reducers.location)
    
    const [Profile, setProfile] = React.useState(null)
    const [disabled, setDisabled] = React.useState(true)

    React.useEffect(() => {
        if (profileCreated) {
            dispatch(getChefProfile(setLoading, setProfile))
        }
    }, [])
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: profileCreated ? Profile : location,
        resetOptions: {
            keepDirtyValues: true
        }
    });
    const formdata = {}
    const pickImage = async () => {
        let result = await ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7,
        });

        if (result.cancelled) {
            setImageError(true);
        }

        if (!result.cancelled) {
            const newImageUri = Platform.OS === "ios" ? 'file:///' + result?.sourceURL.split('file:/').join('') : 'file:///' + result?.path.split('file:/').join('')
            const uriParts = result?.path?.split('.')
            const fileType = uriParts[uriParts.length - 1];
            setImage({
                type: `image/${fileType}`,
                uri: result?.path,
                name: `photo.${fileType}`
            });
            setImageError(false);
        }
    };
    return (
        <View style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
        }}>
            <Header navigation={navigation} append={
                <TouchableOpacity
                    onPress={() => {
                        setDisabled(!disabled)
                    }
                    }
                >
                    <Text style={{
                        fontSize: 18,
                        fontFamily: "BalsamiqSans-Bold",
                        color: colors.black,
                        textAlign: "center"
                    }}>Edit</Text>
                </TouchableOpacity>
            } showAppend={true} title='Chef Profile' />
            <Chefpop modalVisible={false} navigation={navigation} />
            <KeyboardAwareScrollView style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        disabled={profileCreated ? disabled : false}
                        onPress={pickImage}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            {image ? (
                                <View>
                                    <Image
                                        source={{ uri: image?.uri }}
                                        style={styles.avatarImg}
                                        resizeMode='cover'
                                    />
                                </View>
                            ) : (
                                Profile?.logo ? (
                                    <View>
                                        <Image
                                            source={{ uri: Profile?.logo }}
                                            style={styles.avatarImg}
                                            resizeMode='cover'

                                        />
                                    </View>
                                ) :
                                    <View style={styles.avatar}>
                                        <MaterialCommunityIcons
                                            style={{ textAlign: 'center' }}
                                            name='chef-hat'
                                            size={55}
                                            color='#989898'
                                        />
                                    </View>
                            )}
                        </View>
                        <View style={{ marginVertical: hp('2%') }}>
                            <Text
                                style={{
                                    fontSize: RFPercentage(2), // 1.8 equivalent to 13
                                    textAlign: 'center',
                                    fontFamily: 'BalsamiqSans-Bold',
                                }}
                            >
                                Upload / Edit  your Chef logo pic
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.inputWrapper}>
                        <Controller
                            name='kitchen_name'
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, onBlur, value }, formState: { isSubmitted } }) => (
                                <>
                                    <View style={styles.searchSection}>
                                        <TextInput
                                            editable={profileCreated ? !disabled : true}
                                            style={[
                                                styles.text,
                                                {
                                                    color:
                                                        errors?.kitchen_name
                                                            ? 'red'
                                                            : '#424242',
                                                },
                                            ]}
                                            onBlur={onBlur}
                                            placeholder={disabled ? 'Kitchen Name*' : Profile?.kitchen_name}
                                            value={disabled ? Profile?.kitchen_name : value}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                formdata["kitchen_name"] = text
                                            }}

                                        />
                                    </View>
                                    {errors?.kitchen_name && (
                                        <Text style={styles.errorText}>
                                            {errors?.kitchen_name?.message}
                                        </Text>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name='description'
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value }, fieldState: { isDirty }, formState: { isLoading } }) => (
                                <>
                                    <View style={[styles.searchSection, {
                                        height: hp('15%'),
                                    }]}>
                                        <TextInput
                                            editable={profileCreated ? !disabled : true}
                                            multiline={true}
                                            style={[
                                                styles.text,
                                                {
                                                    color:
                                                        errors?.description
                                                            ? 'red'
                                                            : '#424242',
                                                },
                                            ]}

                                            placeholder={disabled ? 'Description*' : Profile?.chef_description}
                                            value={disabled ? Profile?.chef_description : isDirty ? value : Profile?.chef_description}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                formdata["chef_description"] = text
                                            }}
                                        />
                                    </View>
                                    {errors?.description && (
                                        <Text style={styles.errorText}>
                                            {errors?.description?.message}
                                        </Text>
                                    )}
                                </>
                            )}
                        />
                        <Text
                            style={{
                                width: wp('90%'),
                                fontSize: RFPercentage(2), // 1.8 equivalent to 13
                                textAlign: 'left',
                                fontFamily: 'BalsamiqSans-Bold',
                                marginVertical: wp('5%'),
                            }}
                        >
                            Chef Location
                        </Text>
                        <Controller
                            name='address_line_1'
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <View style={styles.searchSection}>
                                        <TextInput
                                            editable={profileCreated ? !disabled : true}
                                            style={[
                                                styles.text,
                                                {
                                                    color:
                                                        errors?.address_line_1
                                                            ? 'red'
                                                            : '#424242',
                                                },
                                            ]}

                                            placeholder={disabled ? 'Address Line 1*' : Profile?.address_line_1}
                                            value={disabled ? Profile?.address_line_1 : value}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                formdata["address_line_1"] = text
                                            }}
                                        />
                                    </View>
                                    {errors?.address_line_1 && (
                                        <Text style={styles.errorText}>
                                            {errors?.address_line_1?.message}
                                        </Text>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name='address_line_2'
                            control={control}
                            shouldUnregister={true}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { isDirty } }) => (
                                <>
                                    <View style={styles.searchSection}>
                                        <TextInput
                                            editable={profileCreated ? !disabled : true}
                                            style={[
                                                styles.text,
                                                {
                                                    color:
                                                        errors?.address_line_2
                                                            ? 'red'
                                                            : '#424242',
                                                },
                                            ]}
                                            placeholder={disabled ? 'Address Line 2*' : Profile?.address_line_2}
                                            value={disabled ? !isDirty ? Profile?.address_line_2 : value : value}
                                            onChangeText={(text) => {
                                                onChange(text)
                                                formdata["address_line_2"] = text
                                            }}
                                        />
                                    </View>
                                    {errors?.address_line_2 && (
                                        <Text style={styles.errorText}>
                                            {errors?.address_line_2?.message}
                                        </Text>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name='city'
                            control={control}
                            // shouldUnregister={true}
                            // defaultValue={profileCreated ? Profile?.city : location?.city}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <View style={styles.searchSection}>
                                        <TextInput
                                            editable={profileCreated ? !disabled : true}
                                            style={[
                                                styles.text,
                                                {
                                                    color:
                                                        errors?.city
                                                            ? 'red'
                                                            : '#424242',
                                                },
                                            ]}
                                            placeholder='City*'
                                            value={profileCreated ? Profile?.city : value || location?.city}
                                            onChangeText={(text) => {
                                                onChange(text);
                                            }}
                                        />
                                    </View>
                                    {errors?.city && (
                                        <Text style={styles.errorText}>
                                            {errors?.city?.message}
                                        </Text>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name='state'
                            control={control}
                            // shouldUnregister={true}
                            // defaultValue={profileCreated ? Profile?.state : location?.state}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <View style={styles.searchSection}>
                                        <TextInput
                                            editable={profileCreated ? !disabled : true}
                                            style={[
                                                styles.text,
                                                {
                                                    color:
                                                        errors?.state
                                                            ? 'red'
                                                            : '#424242',
                                                },
                                            ]}
                                            placeholder='State*'
                                            value={profileCreated ? Profile?.state : value || location?.state}
                                            onChangeText={(text) => {
                                                onChange(text);
                                            }}
                                        />
                                    </View>
                                    {errors?.state && (
                                        <Text style={styles.errorText}>
                                            {errors?.state?.message}
                                        </Text>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name='country'
                            control={control}
                            // shouldUnregister={true}
                            // defaultValue={profileCreated ? Profile?.country : location?.country}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <View style={styles.searchSection}>
                                        <TextInput
                                            editable={profileCreated ? !disabled : true}
                                            style={[
                                                styles.text,
                                            ]}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            underlineColorAndroid='transparent'
                                            placeholder='Country*'
                                            value={ value || location?.country }
                                            onChangeText={(text) => {
                                                onChange(text);
                                            }}
                                        />
                                    </View>
                                    {errors?.country && (
                                        <Text style={styles.errorText}>
                                            {errors?.country?.message}
                                        </Text>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name='pin_code'
                            control={control}
                            // defaultValue={profileCreated ? Profile?.pin_code : location?.pin_code}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <View style={styles.searchSection}>
                                        <TextInput
                                            editable={profileCreated ? !disabled : true}
                                            style={[
                                                styles.text,
                                            ]}
                                            keyboardType='numeric'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            placeholder='Pincode*'
                                            underlineColorAndroid='transparent'
                                            value={profileCreated ? Profile?.pin_code : value }
                                            onChangeText={onChange}
                                        />
                                    </View>
                                    {errors?.pin_code && (
                                        <Text style={styles.errorText}>
                                            {errors?.pin_code?.message}
                                        </Text>
                                    )}
                                </>
                            )}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {
                profileCreated ? disabled ? null :

                    <TouchableOpacity
                        style={{
                            width: wp("100%"),
                            backgroundColor: colors.logoPink,
                            height: hp("10%"),
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => {
                            if (!imageError) {
                                formdata["logo"] = image
                            }
                            dispatch(updateChefProfile(setLoading, formdata))
                        }}
                    >
                        {
                            loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) :
                                <Text style={{
                                    fontSize: 25,
                                    fontFamily: "BalsamiqSans-Bold",
                                    color: colors.white,
                                    textAlign: "center"
                                }}>{"UPDATE PROFILE"}</Text>
                        }
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={{
                            width: wp("100%"),
                            backgroundColor: colors.logoPink,
                            height: hp("10%"),
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={handleSubmit((data) => {
                            data["icon"] = image
                            data["latitude"] = location.latitude
                            data["longitude"] = location.longitude
                            // console.log(data)
                            dispatch(addChefProfile(setLoading, data))
                        })}
                    >
                        {
                            loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) :
                                <Text style={{
                                    fontSize: 25,
                                    fontFamily: "BalsamiqSans-Bold",
                                    color: colors.white,
                                    textAlign: "center"
                                }}>{"ADD PROFILE"}</Text>
                        }
                    </TouchableOpacity>
            }
            <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />
        </View>
    )
}
const styles = StyleSheet.create({
    initial: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '100%',
        marginTop: hp('2%'),
    },
    avatar: {
        borderWidth: 2.5,
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    avatarImg: {
        borderWidth: 2,
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        justifyContent: 'center',
        alignContent: 'center',
    },
    inputWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
        marginHorizontal: 14,

    },

    errorText: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
    },
    terms: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp('5%'),
    },
    text: {
        // fontSize: RFPercentage(fonts.xs),
        fontFamily: 'BalsamiqSans-Regular',
        flexDirection: 'row',
        marginLeft: hp('1%'),
        width: '100%',
        color: "#000000"
    },
    input_box: {
        borderRadius: wp('1.5%'),
        marginTop: hp('1.5%'),
        marginBottom: hp('1.5%'),
    },
    searchSection: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 2.6,
        fontSize: RFValue(4, 200),
        borderColor: colors.darkGrey,
        borderRadius: wp('0.5%'),
        overflow: 'hidden',
        height: hp('7%'),
        marginTop: hp('1.2%'),
    },
    button: {
        minWidth: wp('35%'),
        display: 'flex',
        paddingHorizontal: wp('0%'),
        paddingVertical: hp('1%'),
        backgroundColor: '#BD1461',
        borderRadius: 10,
        shadowOffset: { width: 3, height: 3 },
        marginTop: hp('5%'),
        marginBottom: hp('25%'),
    },
    text_center: {
        textAlign: 'center',
        fontFamily: 'BalsamiqSans-Bold',
        color: '#fff',
    },
    logout_content: {
        backgroundColor: '#BD1461',
    },
});