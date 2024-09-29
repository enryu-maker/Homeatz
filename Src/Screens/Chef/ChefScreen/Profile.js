import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../../../Assets/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import ImagePicker from 'react-native-image-crop-picker';
import mime from 'mime';
import { ActivityIndicator } from 'react-native-paper';
import TextButton from '../../../../Component/TextButton';
import { useDispatch } from 'react-redux';
import { getProfileAction, updateProfile } from '../../../../../Store/actions';
import { baseURL, baseURL1 } from '../../../../Helper/Helper';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../../../Component/ToastConfig';
import Header from '../Comp/Header';


export default function Profile({ navigation }) {
    const [image, setImage] = React.useState(null);
    const [imageError, setImageError] = React.useState(false);
    const [newImage, setNewImage] = React.useState(false)

    const pickImage = async () => {
        let result = await ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7,

        });
        if (result.cancelled) {
            setImageError(true);
            setNewImage(false)
        }
        if (!result.cancelled) {
            const newImageUri = Platform.OS === "ios" ? 'file:///' + result?.sourceURL.split('file:/').join('') : 'file:///' + result?.path.split('file:/').join('')
            const uriParts = result?.path?.split('.')
            setNewImage(true)
            const fileType = uriParts[uriParts.length - 1];
            setImage({
                type: `image/${fileType}`,
                uri: result?.path,
                name: `photo.${fileType}`
            });
            setImageError(false);
        }
    };
    const dispatch = useDispatch();
    const [Profile, setProfile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        dispatch(getProfileAction(setLoading, setProfile))
    }, [])
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <Header navigation={navigation} append={
                <View style={{
                    width: 30,
                    height: 35,
                }} />
            } showAppend={true} title='My Profile' />
            <ScrollView style={styles.content}
                showsVerticalScrollIndicator={false}
            >

                {
                    loading ?
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <ActivityIndicator
                                size="large"
                                color={colors.logoPink}
                            />
                        </View>
                        :

                        <>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <TouchableOpacity onPress={pickImage}>
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
                                            <View >
                                                <Image
                                                    source={{ uri: Profile?.profile_photo }}
                                                    style={styles.avatarImg}
                                                    resizeMode='cover'
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
                                            Upload / Edit  your display pic
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{
                                    width: wp('100%'),
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    alignSelf: 'center',
                                }}>
                                    <View style={{
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        width: wp("30%"),
                                        height: hp("22%"),
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.5), // 1.8 equivalent to 13
                                                textAlign: 'center',
                                                fontFamily: 'BalsamiqSans-Regular',
                                            }}
                                        >
                                            Name
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.5), // 1.8 equivalent to 13
                                                textAlign: 'center',
                                                fontFamily: 'BalsamiqSans-Regular',
                                            }}
                                        >
                                            Mobile
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.5), // 1.8 equivalent to 13
                                                textAlign: 'center',
                                                fontFamily: 'BalsamiqSans-Regular',
                                            }}
                                        >
                                            Email
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.5), // 1.8 equivalent to 13
                                                textAlign: 'center',
                                                fontFamily: 'BalsamiqSans-Regular',
                                            }}
                                        >
                                            Password
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        width: wp("60%"),
                                        height: hp("22%"),
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.5), // 1.8 equivalent to 13
                                                textAlign: 'center',
                                                fontFamily: 'BalsamiqSans-Regular',
                                            }}
                                        >
                                            {Profile?.full_name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.5), // 1.8 equivalent to 13
                                                textAlign: 'center',
                                                fontFamily: 'BalsamiqSans-Regular',
                                            }}
                                        >
                                            {Profile?.phone}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: RFPercentage(2.5), // 1.8 equivalent to 13
                                                textAlign: 'center',
                                                fontFamily: 'BalsamiqSans-Regular',
                                            }}
                                        >
                                            {Profile?.email}
                                        </Text>
                                        <View style={styles.searchSection}>
                                            <TextInput
                                                style={[
                                                    styles.input,
                                                ]}
                                                placeholder='********'
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                underlineColorAndroid='transparent'
                                                onChangeText={(text) => {
                                                }}
                                            // onBlur={() => setIsTyping(false)}
                                            />
                                            <TouchableOpacity>
                                                <FontAwesome
                                                    style={styles.editIcon}
                                                    name='edit'
                                                    size={20}
                                                    color='#000'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </>
                }
            </ScrollView>
            <TouchableOpacity
                style={{
                    width: wp("100%"),
                    backgroundColor: colors.logoPink,
                    height: hp("10%"),
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => {
                    newImage ?
                        dispatch(updateProfile(image, setLoading))
                        :
                        null
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
                        }}>UPDATE PROFILE</Text>
                }
            </TouchableOpacity>
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
    },
    input_box: {
        borderRadius: wp('1.5%'),
        marginTop: hp('1.5%'),
        marginBottom: hp('1.5%'),
    },
    searchSection: {
        width: wp('60%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('2%'),
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: colors.darkGrey,
        borderRadius: wp('1%'),
        overflow: 'hidden',
        height: hp('5%'),
        borderRadius: wp('1%'),
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