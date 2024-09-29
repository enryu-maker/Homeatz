import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors, fonts} from '../../../../Assets/theme';
import {useForm, Controller} from 'react-hook-form';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ActivityIndicator} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from '../../../Component/CheckBox';
import Header from '../Comp/Header';
import {useDispatch, useSelector} from 'react-redux';
import {RegisterAction, getCountryCode} from '../../../../Store/actions';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../Component/ToastConfig';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export default function Signup({navigation, route}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordText, setpasswordText] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [isUserInvalid, setUserInvalid] = useState(false);
  const [termsAlert, setTermsAlert] = useState(false);

  //handleCheckbox function to set checkbox selected or unselected
  const handleCheckBox = () => setTermsAccepted(!termsAccepted);
  const location = useSelector(state => state.Reducers.location);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const {handleSubmit, control, errors} = useForm();
  const [confirmRegistrationModal, setConfirmRegistrationModal] = useState();
  const [existingEmailErr, setExistingEmailErr] = useState(false);
  const [existingMobileErr, setExistingMobileErr] = useState(false);
  const [finalSubmit, setFinalSubmit] = useState(false);
  const [data, setData] = React.useState({
    full_name: '',
    phone: '',
    email: '',
    password: '',
  });

  const [countrycode, setCountrycode] = React.useState(null);

  const isChef = route?.params?.chef;
  const dispatch = useDispatch();
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
      const newImageUri =
        Platform.OS === 'ios'
          ? 'file:///' + result?.sourceURL.split('file:/').join('')
          : 'file:///' + result?.path.split('file:/').join('');
      const uriParts = result?.path?.split('.');
      const fileType = uriParts[uriParts.length - 1];
      setImage({
        type: `image/${fileType}`,
        uri: result?.path,
        name: `photo.${fileType}`,
      });
      setImageError(false);
    }
  };
  React.useEffect(() => {
    dispatch(getCountryCode(location.country, setCountrycode));
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header
        navigation={navigation}
        showBack={true}
        title="Sign Up"
        showAppend={true}
        append={
          <View
            style={{
              height: 45,
              width: 35,
            }}
          />
        }
      />
      <View style={{marginTop: hp('1%')}}>
        <Text
          style={{
            fontSize: RFPercentage(3), // 1.9 equivalent to 14
            textAlign: 'center',
            fontFamily: 'BalsamiqSans-Regular',
            marginBottom: hp('1%'),
          }}>
          {isChef ? 'New Chef' : 'New User'}
        </Text>
      </View>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.content}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              {image ? (
                <View>
                  <Image
                    source={{uri: image?.uri}}
                    style={styles.avatarImg}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <View style={styles.avatar}>
                  <FontAwesome
                    style={{textAlign: 'center'}}
                    name="user"
                    size={45}
                    color="#989898"
                  />
                </View>
              )}
            </View>
            <View style={{marginBottom: hp('2%')}}>
              <Text
                style={{
                  fontSize: RFPercentage(1.8), // 1.8 equivalent to 13
                  textAlign: 'center',
                  fontFamily: 'BalsamiqSans-Bold',
                }}>
                Upload your display pic*
              </Text>
              {image === null && finalSubmit && (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 12,
                    alignSelf: 'center',
                  }}>
                  Image is compulsory
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <Controller
            name="full_name"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message:
                  'Full Name is necessary and expected to be a combination of numbers & alphabets',
              },
              pattern: {
                value: /^[a-z\d\-_\s]+$/i,
                message:
                  'Full Name is necessary and expected to be a combination of numbers & alphabets',
              },
            }}
            render={({field: {onChange, value}}) => (
              <>
                <View style={styles.searchSection}>
                  <TextInput
                    style={[
                      styles.text,
                      {
                        color:
                          errors?.name && isUserInvalid ? 'red' : '#424242',
                      },
                    ]}
                    placeholder="Full Name*"
                    value={data?.full_name}
                    onChangeText={text => {
                      setUserInvalid(false);
                      onChange(text);
                      setData({...data, full_name: text});
                    }}
                  />
                </View>
                {errors?.full_name && (
                  <Text style={styles.errorText}>
                    {errors?.full_name?.message}
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            name="mobile"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message:
                  'Mobile is compulsory and must be max 10 digits Numbers',
              },
            }}
            render={({field: {onChange, value}}) => (
              <>
                <View style={styles.searchSection}>
                  <Text
                    style={{
                      // flex: 1,
                      // fontSize: RFPercentage(2.5),
                      paddingHorizontal: 5,
                      fontFamily: 'BalsamiqSans-Regular',
                    }}>
                    {countrycode}
                  </Text>
                  <TextInput
                    style={[
                      styles.text,
                      {
                        color:
                          (errors?.mobile || existingMobileErr) && isUserInvalid
                            ? 'red'
                            : '#424242',
                      },
                    ]}
                    placeholder="Mobile Number*"
                    value={value}
                    onChangeText={text => {
                      setUserInvalid(false);
                      onChange(text);
                      setData({...data, mobile: countrycode + text});
                    }}
                  />
                </View>
                {errors?.mobile && (
                  <Text style={styles.errorText}>
                    {errors?.mobile?.message}
                  </Text>
                )}
                {existingMobileErr && (
                  <Text style={styles.errorText}>
                    Mobile Number is already registered
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message:
                  'Email is necessary and expected to be a combination of numbers & alphabets and have symbols (@ and .)',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message:
                  'Email is necessary and expected to be a combination of numbers & alphabets and have symbols (@ and .)',
              },
            }}
            render={({field: {onChange, value}}) => (
              <>
                <View style={styles.searchSection}>
                  <TextInput
                    style={[
                      styles.text,
                      {
                        color:
                          (errors?.email || existingEmailErr) && isUserInvalid
                            ? 'red'
                            : '#424242',
                      },
                    ]}
                    placeholder="Email* (also your login username)"
                    value={data.email}
                    onChangeText={text => {
                      setUserInvalid(false);
                      setExistingEmailErr(false);
                      onChange(text);
                      setData({...data, email: text});
                    }}
                  />
                </View>
                {errors?.email && (
                  <Text style={styles.errorText}>{errors?.email?.message}</Text>
                )}

                {existingEmailErr && (
                  <Text style={styles.errorText}>
                    Email Address is already registered
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message:
                  'Login Password is necessary and must be Alphamumeric and/OR symbols (@ and .)',
              },
            }}
            render={({field: {onChange, value}}) => (
              <>
                <View style={styles.searchSection}>
                  <TextInput
                    style={styles.text}
                    secureTextEntry={!showPassword}
                    placeholder="Login Password*"
                    value={data?.password}
                    onChangeText={text => {
                      setUserInvalid(false);
                      onChange(text);
                      setData({...data, password: text});
                    }}
                  />
                </View>

                {errors?.password && (
                  <Text style={styles.errorText}>
                    {errors?.password?.message}
                  </Text>
                )}
              </>
            )}
          />

          <View style={styles.terms}>
            <View>
              <CheckBox
                selected={termsAccepted}
                onPress={handleCheckBox}
                text="By checking this box, you agree to our Terms of Service and Privacy Policy"
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <TouchableOpacity
        style={{
          width: wp('100%'),
          backgroundColor: colors.logoPink,
          height: hp('10%'),
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 0,
        }}
        onPress={() => {
          if (termsAccepted) {
            setFinalSubmit(true);
            data['is_chef'] = isChef ? 1 : 0;
            data['profile_photo'] = image;
            // console.log(data)
            dispatch(RegisterAction(setLoading, data, navigation));
          }
        }}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'BalsamiqSans-Bold',
              color: colors.white,
              textAlign: 'center',
            }}>
            Submit
          </Text>
        )}
      </TouchableOpacity>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
        config={toastConfig}
      />
    </View>
  );
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
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
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
    // flex: 1,
    width: '98%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'between',
    borderWidth: 2.6,
    fontSize: RFValue(4, 200),
    borderColor: colors.darkGrey,
    borderRadius: wp('0.5%'),
    // overflow: 'hidden',
    height: hp('6.5%'),
    marginTop: hp('1.2%'),
  },
  button: {
    minWidth: wp('35%'),
    display: 'flex',
    paddingHorizontal: wp('0%'),
    paddingVertical: hp('1%'),
    backgroundColor: '#BD1461',
    borderRadius: 10,
    shadowOffset: {width: 3, height: 3},
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
