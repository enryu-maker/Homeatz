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
  ResetPassword,
  getCountryCode,
} from '../../../../Store/actions';
import {toastConfig} from '../../../Component/ToastConfig';
import Toast from 'react-native-toast-message';

export default function Reset({navigation}) {
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
    mobile: '',
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
        title={'Forgot Password'}
      />
      {/* Login component content */}
      <ScrollView>
        <View
          style={{
            marginTop: hp('6%'),
            marginBottom: hp('2%'),
            marginLeft: wp('3%'),
          }}>
          <Text
            style={{
              fontSize: RFPercentage(fonts.sm),
              textAlign: 'left',
              fontFamily: 'BalsamiqSans-Bold',
              color: '#52504F',
            }}>
            Phone Number
          </Text>
        </View>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={[styles.inputWrapper]}>
              <View
                style={{
                  flex: 2.7,
                }}>
                <View style={styles.searchSection}>
                  <Text
                    style={{
                      paddingHorizontal: 5,
                      fontFamily: 'BalsamiqSans-Regular',
                    }}>
                    {countrycode}
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {color: isUserInvalid ? 'red' : '#424242'},
                    ]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    underlineColorAndroid="transparent"
                    value={value}
                    onChangeText={text => {
                      onChange(text);
                      setData({...data, mobile: countrycode + text});
                    }}
                    onBlur={() => setIsTyping(false)}
                  />
                </View>
              </View>
            </View>
          )}
          name="mobile"
          rules={{required: true}}
          defaultValue=""
        />
        <TextButton
          title={'Send OTP'}
          loading={loading}
          onPress={() => {
            dispatch(ResetPassword(data.mobile, setLoading, navigation));
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
    marginVertical: hp('0.5%'),
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
    flexDirection: 'row',
    justifyContent: 'center',
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
