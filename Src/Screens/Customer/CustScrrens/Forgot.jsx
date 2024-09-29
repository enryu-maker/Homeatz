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
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {colors, fonts} from '../../../../Assets/theme';
import {Controller, useForm} from 'react-hook-form';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextButton from '../../../Component/TextButton';
import Header from '../Comp/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  LoginAction,
  NewPassword,
  getCountryCode,
} from '../../../../Store/actions';
import {toastConfig} from '../../../Component/ToastConfig';
import Toast from 'react-native-toast-message';

export default function Forgot({navigation, route}) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordText, setpasswordText] = useState('');
  const {handleSubmit, control, errors} = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [passwordEsterik, setPasswordEsterik] = useState('');
  const [isUserInvalid, setUserInvalid] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [isPwTyping, setIsPwTyping] = useState(true);
  const [countrycode, setCountrycode] = React.useState(null);
  const location = useSelector(state => state.Reducers.location);
  const [data, setData] = React.useState({
    phone: route.params.number,
    token: '',
    password: '',
  });

  React.useEffect(() => {
    dispatch(getCountryCode(location.country, setCountrycode));
  }, []);
  return (
    <View style={styles.container}>
      <Header
        showBack={true}
        showAppend={true}
        append={
          <View
            style={{
              width: 20,
              height: 35,
            }}
          />
        }
        navigation={navigation}
        title={'Reset Password'}
      />
      {/* Login component content */}
      <ScrollView
        style={{
          marginTop: 18,
        }}>
        <View style={styles.inputWrapper}>
          <Controller
            name="phone"
            disabled={true}
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
                          errors?.phone && isUserInvalid ? 'red' : '#424242',
                      },
                    ]}
                    // placeholder='Mobile NUmbe*'
                    value={data?.phone}
                    onChangeText={text => {
                      setUserInvalid(false);
                      onChange(text);
                      setData({...data, phone: text});
                    }}
                  />
                </View>
                {errors?.phone && (
                  <Text style={styles.errorText}>{errors?.phone?.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Controller
            name="otp"
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
                        color: errors?.otp && isUserInvalid ? 'red' : '#424242',
                      },
                    ]}
                    placeholder="Enter 6 Digit OTP*"
                    value={data?.token}
                    keyboardType="number-pad"
                    maxLength={6}
                    onChangeText={text => {
                      setUserInvalid(false);
                      onChange(text);
                      setData({...data, token: text});
                    }}
                  />
                </View>
                {errors?.otp && (
                  <Text style={styles.errorText}>{errors?.otp?.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Controller
            name="password"
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
                          errors?.password && isUserInvalid ? 'red' : '#424242',
                      },
                    ]}
                    placeholder="Password*"
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
        </View>
        <TextButton
          title={'Update password'}
          loading={loading}
          onPress={() => {
            console.log(data);
            dispatch(NewPassword(data, setLoading, navigation));
          }}
        />
      </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? null : StatusBar.currentHeight,
    fontFamily: 'BalsamiqSans-Bold',
  },

  inputWrapper: {
    flexDirection: 'row',
    width: wp('88%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('3%'),
    marginVertical: hp('1%'),
  },

  errorText: {
    color: 'red',
    fontSize: RFPercentage(1.5),
    alignSelf: 'flex-start',
    marginLeft: wp('2%'),
  },
  input_box: {
    borderRadius: wp('1%'),
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'between',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.darkGrey,
    borderRadius: wp('1%'),
    overflow: 'hidden',
    height: hp('6.5%'),
    borderRadius: wp('1%'),
  },
  editIcon: {
    padding: wp('1%'),
  },
  input: {
    flex: 1,
    paddingLeft: wp('2%'),
    backgroundColor: '#fff',
    textDecorationLine: 'none',
    fontFamily: 'BalsamiqSans-Regular',
  },
  button: {
    // width: wp("60%"),
    minWidth: wp('50%'),
    display: 'flex',
    paddingHorizontal: wp('2%'),
    backgroundColor: '#BD1461',
    // borderWidth: wp('0.5%'),
    // borderRightWidth: wp('1.5%'),
    // borderBottomWidth: wp('1.5%'),
    borderColor: '#000',
    // borderBottomStartRadius: 10,
    // borderTopEndRadius: 10,
    borderRadius: 8,

    shadowColor: '#000',

    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 2,
    shadowOffset: {width: 3, height: 3},
  },
  text: {
    // fontSize: RFPercentage(fonts.xs),
    fontFamily: 'BalsamiqSans-Regular',
    flexDirection: 'row',
    marginLeft: hp('1%'),
    width: '100%',
  },

  // For alert Modal
  alertWrapper: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 1,
  },
  alert_inner: {
    position: 'relative',
    width: wp('90%'),
    marginTop: hp('35%'),
    marginLeft: wp('5%'),
    paddingVertical: hp('3%'),
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#fff',
    zIndex: -1,
  },
  text_center: {
    textAlign: 'center',
    fontFamily: 'BalsamiqSans-Bold',
  },
});
