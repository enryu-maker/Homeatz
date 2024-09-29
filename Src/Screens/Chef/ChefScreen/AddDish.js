import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Pressable,
    Platform,
    Image,

} from 'react-native';
import React from 'react'
import Header from '../Comp/Header';
import RadioForm from 'react-native-simple-radio-button';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useForm, Controller } from 'react-hook-form';
import { colors } from '../../../../Assets/theme'
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { getCurrencyCode, postChefItem } from '../../../../../Store/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { toastConfig } from '../../../../Component/ToastConfig';
import Toast from 'react-native-toast-message';
export default function AddDish({
    navigation
}) {
    const dispatch = useDispatch();
    const [expiry, setExpiry] = React.useState(null)
    const [type, setType] = React.useState([
        { label: 'Veg', value: 1 },
        { label: 'Non-Veg', value: 0 },
    ]);
    const [is_veg, setIsVeg] = React.useState(0)
    const [cat, setCat] = React.useState(2)
    const { handleSubmit, control, errors } = useForm();
    const [imageError, setImageError] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [item, setItems] = React.useState(1)
    const dealtype = useSelector(state => state.Reducers.dealtype)
    const menutype = useSelector(state => state.Reducers.menutype)
    const location = useSelector(state => state.Reducers.location)
    const [loading, setLoading] = React.useState(false)
    const [isUserInvalid, setUserInvalid] = React.useState(false);
    const [data, setData] = React.useState({
        "name": "",
        "description": "",
        "ingredients": "",
        "portion": "",
        "daily_quantity": "",
        "price": ""
    })
    function mapDealType(data) {
        let arr = []
        data.map((item) => {
            arr.push({
                label: item.deal_type,
                value: item.id
            })
        })

        return (arr)
    }
    const [code , setCode] = React.useState("")
    React.useEffect(()=>{
        dispatch(getCurrencyCode(location?.country,setCode))
    },[])

    function mapMenuType(data) {
        let arr = []
        data.map((item) => {
            arr.push({
                label: item.category_name,
                value: item.id
            })
        })
        return (arr)
    }
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
                <View style={{
                    width: 35,
                    height: 35,
                }} />
            } showAppend={true} title='Add New Dish' />
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', paddingBottom: hp("10%") }}
                keyboardShouldPersistTaps='always'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{

                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity onPress={pickImage}>
                    <View
                        style={{
                            justifyContent: 'center',
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
                            <View style={styles.avatar}>
                                <Ionicons
                                    style={{ textAlign: 'center' }}
                                    name='fast-food-outline'
                                    size={55}
                                    color='#989898'
                                />
                            </View>
                        )}
                    </View>
                    <View style={{ marginBottom: hp('2%') }}>
                        <Text
                            style={{
                                fontSize: RFPercentage(1.8), // 1.8 equivalent to 13
                                textAlign: 'center',
                                fontFamily: 'BalsamiqSans-Bold',
                            }}
                        >
                            Upload your Dish pic*
                        </Text>
                        {image === null && (
                            <Text
                                style={{
                                    color: 'red',
                                    fontSize: 12,
                                    alignSelf: 'center',
                                }}
                            >
                                Image is compulsory
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
                <View style={styles.inputWrapper}>
                    <Controller
                        name='name'
                        control={control}
                        defaultValue=''
                        rules={{
                            // required: {
                            //     value: true,
                            //     message:
                            //         'Full Name is necessary and expected to be a combination of numbers & alphabets',
                            // },
                            pattern: {
                                value: /^[a-z\d\-_\s]+$/i,
                                message:
                                    'Full Name is necessary and expected to be a combination of numbers & alphabets',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={[
                                            styles.text,
                                            {
                                                color:
                                                    errors?.name && isUserInvalid
                                                        ? 'red'
                                                        : '#424242',
                                            },
                                        ]}
                                        placeholder='Dish Name*'
                                        value={data.name}
                                        onChangeText={(text) => {
                                            setUserInvalid(false);
                                            setData({ ...data, name: text })
                                            onChange(text);
                                        }}
                                    />
                                </View>
                                {errors?.name && (
                                    <Text style={styles.errorText}>
                                        {errors?.name?.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name='description'
                        control={control}
                        defaultValue=''
                        render={({ field: { onChange, value } }) => (
                            <>
                                <View style={[styles.searchSection, {
                                    height: hp('15%'),
                                }]}>
                                    <TextInput
                                        multiline={true}
                                        style={[
                                            styles.text,
                                            {
                                                color:
                                                    errors?.name && isUserInvalid
                                                        ? 'red'
                                                        : '#424242',
                                            },
                                        ]}
                                        placeholder='Breif Description*'
                                        value={data?.description}
                                        onChangeText={(text) => {
                                            setUserInvalid(false);
                                            setData({ ...data, description: text })
                                            onChange(text);
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
                    <Controller
                        name='ingredients'
                        control={control}
                        defaultValue=''
                        rules={{
                            pattern: {
                                value: /^[a-z\d\-_\s]+$/i,
                                message:
                                    'Ingredients is necessary and expected to be a combination of numbers & alphabets',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <View style={[styles.searchSection, {
                                    height: hp('15%'),
                                }]}>
                                    <TextInput
                                        multiline={true}
                                        style={[
                                            styles.text,
                                            {
                                                color:
                                                    errors?.name && isUserInvalid
                                                        ? 'red'
                                                        : '#424242',
                                            },
                                        ]}
                                        placeholder='Main Ingredient*'
                                        value={data?.ingredients}
                                        onChangeText={(text) => {
                                            setUserInvalid(false);
                                            setData({ ...data, ingredients: text })
                                            onChange(text);
                                        }}
                                    />
                                </View>
                                {errors?.ingredients && (
                                    <Text style={styles.errorText}>
                                        {errors?.ingredients?.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'BalsamiqSans-Bold',
                        color: '#212121',
                        alignSelf: "flex-start"
                    }}>Dish Type</Text>
                    <RadioForm
                        style={{
                            marginVertical: 10,
                            width: "88%",
                            alignSelf: "flex-start"
                        }}
                        labelStyle={{
                            fontFamily: 'BalsamiqSans-Regular',
                        }}
                        radio_props={type}
                        initial={1}
                        buttonColor={colors.logoPink}
                        selectedButtonColor={colors.logoPink}
                        onPress={(value) => { setIsVeg(value) }}
                    />
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'BalsamiqSans-Bold',
                        color: '#212121',
                        alignSelf: "flex-start"
                    }}>Deal Type</Text>
                    <RadioForm
                        style={{
                            marginVertical: 10,
                            width: "88%",
                            alignSelf: "flex-start"
                        }}
                        labelStyle={{
                            fontFamily: 'BalsamiqSans-Regular',
                        }}
                        radio_props={mapDealType(dealtype)}
                        // initial={0}
                        buttonColor={colors.logoPink}
                        selectedButtonColor={colors.logoPink}
                        onPress={(value) => { setItems(value) }}
                    />
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'BalsamiqSans-Bold',
                        color: '#212121',
                        alignSelf: "flex-start"
                    }}>Deal Category</Text>
                    <RadioForm
                        style={{
                            marginVertical: 10,
                            width: "88%",
                            alignSelf: "flex-start"
                        }}
                        labelStyle={{
                            fontFamily: 'BalsamiqSans-Regular',
                        }}
                        radio_props={mapMenuType(menutype)}
                        initial={0}
                        buttonColor={colors.logoPink}
                        selectedButtonColor={colors.logoPink}
                        onPress={(value) => { setCat(value) }}
                    />
                    <Controller
                        name='portion'
                        control={control}
                        defaultValue=''
                        rules={{
                            // required: {
                            //     value: true,
                            //     message:
                            //         'Dish portion is necessary and expected to be a combination of numbers',
                            // },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={[
                                            styles.text,
                                            {
                                                color:
                                                    errors?.name && isUserInvalid
                                                        ? 'red'
                                                        : '#424242',
                                            },
                                        ]}
                                        placeholder='Dish portion (gms/kg)*'
                                        value={data?.portion}
                                        onChangeText={(text) => {
                                            setUserInvalid(false);
                                            setData({ ...data, portion: text })
                                            onChange(text);
                                        }}
                                    />
                                </View>
                                {errors?.portion && (
                                    <Text style={styles.errorText}>
                                        {errors?.portion?.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name='daily_quantity'
                        control={control}
                        defaultValue=''
                        rules={{
                            // required: {
                            //     value: true,
                            //     message:
                            //         'Dish Quantity is necessary and expected to be a combination of numbers',
                            // },
                            pattern: {
                                value: /^[0-9]+$/i,
                                message:
                                    'Dish Quantity is necessary and expected to be a combination of numbers',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={[
                                            styles.text,
                                            {
                                                color:
                                                    errors?.name && isUserInvalid
                                                        ? 'red'
                                                        : '#424242',
                                            },
                                        ]}
                                        placeholder='Dish Quantity*'
                                        keyboardType="number-pad"
                                        value={data?.daily_quantity}
                                        onChangeText={(text) => {
                                            setUserInvalid(false);
                                            setData({ ...data, daily_quantity: text })
                                            onChange(text);
                                        }}
                                    />
                                </View>
                                {errors?.daily_quantity && (
                                    <Text style={styles.errorText}>
                                        {errors?.daily_quantity?.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name='price'
                        control={control}
                        defaultValue=''
                        rules={{
                            // required: {
                            //     value: true,
                            //     message:
                            //         'Dish Price is necessary and expected to be a combination of numbers',
                            // },
                            // pattern: {
                            //     value: /^[0-9]+$/i,
                            //     message:
                            //         'Dish Price is necessary and expected to be a combination of numbers',
                            // },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <View style={styles.searchSection}>
                                    <TextInput
                                        style={[
                                            styles.text,
                                            {
                                                color:
                                                    errors?.name && isUserInvalid
                                                        ? 'red'
                                                        : '#424242',
                                            },
                                        ]}
                                        placeholder={`Price of Dish in ${code}*`}
                                        keyboardType="number-pad"
                                        value={data?.price}
                                        onChangeText={(text) => {
                                            setUserInvalid(false);
                                            setData({ ...data, price: text })
                                            onChange(text);
                                        }}
                                    />
                                </View>
                                {errors?.price && (
                                    <Text style={styles.errorText}>
                                        {errors?.price?.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity
                onPress={(e) => {

                    e.preventDefault();
                    data['is_veg'] = is_veg
                    data['category_id'] = cat
                    data['deal_type'] = item
                    data['image'] = image
                    data['item_expiry'] = expiry
                    dispatch(postChefItem(setLoading, data, navigation))
                }
                }
                style={{
                    width: wp("100%"),
                    backgroundColor: colors.logoPink,
                    height: hp("10%"),
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                {
                    loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) :
                        <Text style={{
                            fontSize: 25,
                            fontFamily: "BalsamiqSans-Bold",
                            color: colors.white,
                            textAlign: "center"
                        }}>ADD DISH</Text>
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
        // height: hp('6%'),
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
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 2.6,
        fontSize: RFValue(4, 200),
        borderColor: colors.darkGrey,
        borderRadius: wp('0.5%'),
        overflow: 'hidden',
        height: hp('6%'),
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