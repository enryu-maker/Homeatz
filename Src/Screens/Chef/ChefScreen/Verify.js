import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {colors} from '../../../../Assets/theme';
import Header from '../Comp/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {getItemsAction, updateStatus} from '../../../../../Store/actions';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../Component/ToastConfig';
export default function Verify({navigation, route}) {
  const dispatch = useDispatch();
  const otpRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [code, setCode] = React.useState('');
  React.useEffect(() => {
    setTimeout(() => otpRef.current.focusField(0), 250);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.white,
      }}>
      <Header
        navigation={navigation}
        showAppend={true}
        title={'Verify'}
        append={
          <View
            style={{
              width: 30,
              height: 35,
            }}
          />
        }
      />
      <View
        style={{
          marginTop: 20,
          width: '88%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'BalsamiqSans-Bold',
            fontSize: 22,
          }}>
          Enter Code
        </Text>
        <Text
          style={{
            fontFamily: 'BalsamiqSans-Regular',
            fontSize: 16,
            textAlign: 'justify',
            marginTop: 5,
          }}>
          Please verify the code from the customer & please enter the code below
          to complete delivery
        </Text>
      </View>
      <OTPInputView
        style={{width: '88%', height: 100}}
        pinCount={6}
        ref={otpRef}
        autoFocusOnLoad={false}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        // autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          setCode(code);
        }}
      />
      <TouchableOpacity
        style={{
          width: wp('100%'),
          backgroundColor: colors.logoPink,
          position: 'absolute',
          bottom: 0,
          height: hp('10%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          dispatch(
            updateStatus(
              route?.params?.orderId,
              5,
              setLoading,
              code,
              navigation,
            ),
          );
        }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'BalsamiqSans-Bold',
            alignSelf: 'center',
            color: colors.white,
          }}>
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            'Deliver'
          )}
        </Text>
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
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: colors.iconColor,
  },

  underlineStyleBase: {
    color: '#000000',
    borderRadius: 4,
    width: 50,
    height: 50,
    borderWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: colors.iconColor,
  },
});
