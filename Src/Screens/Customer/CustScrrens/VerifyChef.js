import {
  View,
  Text,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from '../../../Component/CheckBox';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../../Assets/theme';
import {useForm, Controller} from 'react-hook-form';
import {TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../Component/ToastConfig';
export default function VerifyChef({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const {handleSubmit, control, errors} = useForm();
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const handleCheckBox = () => setTermsAccepted(!termsAccepted);
  return (
    <SafeAreaView
      style={{
        // flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          width: wp('100%'),
          flexDirection: 'column',
          alignSelf: 'center',
          backgroundColor: '#ffffff',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: RFPercentage(3.5),
            fontFamily: 'BalsamiqSans-Bold',
            color: colors.darkGrey,
            textAlign: 'center',
          }}>
          Chef Verfiication
        </Text>
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.content}>
          <View
            style={{
              height: 'auto',
              borderColor: colors.darkGrey,
              borderWidth: 3,
              textAlign: 'center',
              alignSelf: 'center',
              marginTop: hp('3%'),
              width: '95%',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: RFPercentage(1.8), //1.6 equivalent to 12
                fontFamily: 'BalsamiqSans-Bold',
                padding: 5,
                textAlign: 'justify',
              }}>
              {`Your benefits as a seller \n \nSave on time and take more orders (₹) \nJust 1 app for everything No hassles with regards to payments, delivery, customer service and marketing. It's all on us!
          \n1. Click island wide delivery \n2. Low platform commission vs alternative options\n3. Your own landing page\n4. Listing on a platform that is focussed only on selling \n \nHome Food By Home Chefs \n Onboarding Process
          \n • Step 1: Submit 'Join as a Chef' application on the app (YOU ARE HERE!)
          \n • Step 2: You will receive an email from Homeatz asking for additional information
          \n • Step 3: We will reach out to help you onboard and start selling on HOMEATZ!`}
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            <Controller
              name="speciality"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message:
                    'Cuisine Speciality is necessary and must be combination of numbers & alphabets',
                },
              }}
              render={({onChange, value}) => (
                <>
                  <View style={styles.searchSection}>
                    <TextInput
                      style={[
                        styles.text,
                        {
                          color: errors?.speciality ? 'red' : '#424242',
                        },
                      ]}
                      placeholder="Cuisine speciality* "
                      value={value}
                      onChangeText={text => {
                        // setUserInvalid(false)
                        onChange(text);
                      }}
                    />
                  </View>
                  {errors?.speciality && (
                    <Text style={styles.errorText}>
                      {errors?.speciality?.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              name="phonepe"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message:
                    'Cuisine Speciality is necessary and must be combination of numbers & alphabets',
                },
              }}
              render={({onChange, value}) => (
                <>
                  <View style={styles.searchSection}>
                    <TextInput
                      style={[
                        styles.text,
                        {
                          color: errors?.speciality ? 'red' : '#424242',
                        },
                      ]}
                      keyboardType="numeric"
                      placeholder="PhonePe Mobile Number* "
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                      }}
                    />
                  </View>
                  {errors?.speciality && (
                    <Text style={styles.errorText}>
                      {errors?.speciality?.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>
          <View style={styles.terms}>
            <View>
              <CheckBox
                selected={termsAccepted}
                onPress={handleCheckBox}
                text="By checking this box, you agree to our Chef Sales Policy"
              />
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
          }}
          onPress={() => {
            if (termsAccepted) {
              Toast.show({
                type: 'success',
                text1: 'Request sent.',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
              });
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
              SUBMIT
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
        config={toastConfig}
      />
    </SafeAreaView>
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
  chefIntro: {
    height: 'auto',
    borderColor: 'black',
    borderWidth: 3,
    textAlign: 'center',
    marginHorizontal: 15,
    marginVertical: 4,
    marginBottom: hp('4%'),
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
    alignSelf: 'center',
  },
  text: {
    fontSize: RFPercentage(2), // equivalent to 18
    fontFamily: 'BalsamiqSans-Regular',
    flexDirection: 'row',
    marginLeft: hp('1%'),
    width: '100%',
  },
  input_box: {
    borderRadius: wp('1%'),
    marginTop: hp('1.5%'),
    marginBottom: hp('1.5%'),
  },
  searchSection: {
    flex: 1,
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
  crossed: {
    height: hp('50%'),
    width: wp('90%'),
    marginVertical: hp('4%'),
  },
  text_center: {
    textAlign: 'center',
    fontFamily: 'BalsamiqSans-Bold',
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

  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    height: '100%',
    width: '100%',
    paddingVertical: hp('9%'),
    padding: 35,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logout_content: {
    marginVertical: hp('0%'),
    paddingTop: hp('1%'),
  },
  text_center: {
    textAlign: 'center',
    fontFamily: 'BalsamiqSans-Bold',
  },
});
