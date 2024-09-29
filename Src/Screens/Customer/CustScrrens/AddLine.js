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
import Header from '../Comp/Header';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {colors} from '../../../../Assets/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import TextButton from '../../../Component/TextButton';
import {useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {postAddressAction} from '../../../../Store/actions';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../Component/ToastConfig';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export default function AddLine({navigation, route}) {
  const {data, location, address} = route.params;
  const [loading, setLoading] = React.useState(false);
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header
        navigation={navigation}
        append={
          <View
            style={{
              width: 35,
              height: 35,
            }}
          />
        }
        showAppend={true}
        title="Fill Address"
      />
      <KeyboardAwareScrollView>
        {/* <Controller
                    disabled={true}
                    control={control}
                    render={({ field: { onChange, value } }) => ( */}
        <View style={[styles.inputWrapper]}>
          <Text
            style={{
              flex: 1,
              fontSize: RFPercentage(2.5),
              fontFamily: 'BalsamiqSans-Regular',
              color: colors.darkGrey,
              textAlign: 'left',
            }}>
            Address Type*
          </Text>
          <View
            style={{
              flex: 2.7,
            }}>
            <View style={styles.searchSection}>
              <TextInput
                style={[styles.input]}
                placeholder="Home/Office/Other"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                value={'Home'}
                // onChangeText={(text) => {
                //     if(text){
                //         onChange(text || "Home");
                //     }
                //     else{
                //         onChange("Home")
                //     }
                // }}
              />
              {errors?.address_type && (
                <Text style={styles.errorText}>
                  {errors?.address_type.message}
                </Text>
              )}
            </View>
          </View>
        </View>
        {/* //     )}
                //     name='address_type'
                //     rules={{
                //         required: {
                //             value: true,
                //             message: "Please enter a valid address type"
                //         }
                //     }}
                //     defaultValue=''
                // />  */}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={[styles.inputWrapper]}>
              <Text
                style={{
                  flex: 1,
                  fontSize: RFPercentage(2.5),
                  fontFamily: 'BalsamiqSans-Regular',
                  color: colors.darkGrey,
                  textAlign: 'left',
                }}>
                Address Line 1
              </Text>
              <View
                style={{
                  flex: 2.7,
                }}>
                <View style={styles.searchSection}>
                  <TextInput
                    style={[styles.input]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    value={value}
                    onChangeText={text => {
                      onChange(text);
                    }}
                  />
                  {errors?.address_line_1 && (
                    <Text style={styles.errorText}>
                      {errors?.address_line_1.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
          name="address_line_1"
          rules={{
            required: {
              value: true,
              message: 'Please enter a valid address',
            },
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={[styles.inputWrapper]}>
              <Text
                style={{
                  flex: 1,
                  fontSize: RFPercentage(2.5),
                  fontFamily: 'BalsamiqSans-Regular',
                  color: colors.darkGrey,
                  textAlign: 'left',
                }}>
                Address Line 2
              </Text>
              <View
                style={{
                  flex: 2.7,
                }}>
                <View style={styles.searchSection}>
                  <TextInput
                    style={[styles.input]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    value={value}
                    onChangeText={text => {
                      onChange(text);
                    }}
                  />
                  {errors?.address_line_2 && (
                    <Text style={styles.errorText}>
                      {errors?.address_line_2.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
          name="address_line_2"
          rules={{
            required: {
              value: true,
              message: 'Please enter a valid address',
            },
          }}
          defaultValue={data?.address}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={[styles.inputWrapper]}>
              <Text
                style={{
                  flex: 1,
                  fontSize: RFPercentage(2.5),
                  fontFamily: 'BalsamiqSans-Regular',
                  color: colors.darkGrey,
                  textAlign: 'left',
                }}>
                City
              </Text>
              <View
                style={{
                  flex: 2.7,
                }}>
                <View style={styles.searchSection}>
                  <TextInput
                    style={[styles.input]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    value={value}
                    onChangeText={text => {
                      onChange(text);
                    }}
                  />
                  {errors?.city && (
                    <Text style={styles.errorText}>{errors?.city.message}</Text>
                  )}
                </View>
              </View>
            </View>
          )}
          name="city"
          rules={{
            required: {
              value: true,
              message: 'Please enter a valid city',
            },
          }}
          defaultValue={data.city}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={[styles.inputWrapper]}>
              <Text
                style={{
                  flex: 1,
                  fontSize: RFPercentage(2.5),
                  fontFamily: 'BalsamiqSans-Regular',
                  color: colors.darkGrey,
                  textAlign: 'left',
                }}>
                State
              </Text>
              <View
                style={{
                  flex: 2.7,
                }}>
                <View style={styles.searchSection}>
                  <TextInput
                    style={[styles.input]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    value={value}
                    onChangeText={text => {
                      onChange(text);
                    }}
                  />
                  {errors?.state && (
                    <Text style={styles.errorText}>
                      {errors?.state.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
          name="state"
          rules={{
            required: {
              value: true,
              message: 'Please enter a valid state',
            },
          }}
          defaultValue={data.state}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={[styles.inputWrapper]}>
              <Text
                style={{
                  flex: 1,
                  fontSize: RFPercentage(2.5),
                  fontFamily: 'BalsamiqSans-Regular',
                  color: colors.darkGrey,
                  textAlign: 'left',
                }}>
                Country
              </Text>
              <View
                style={{
                  flex: 2.7,
                }}>
                <View style={styles.searchSection}>
                  <TextInput
                    style={[styles.input]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    value={value}
                    onChangeText={text => {
                      onChange(text);
                    }}
                  />
                  {errors?.country && (
                    <Text style={styles.errorText}>
                      {errors?.country.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
          name="country"
          rules={{
            required: {
              value: true,
              message: 'Please enter a valid country',
            },
          }}
          defaultValue={data.country}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={[styles.inputWrapper]}>
              <Text
                style={{
                  flex: 1,
                  fontSize: RFPercentage(2.5),
                  fontFamily: 'BalsamiqSans-Regular',
                  color: colors.darkGrey,
                  textAlign: 'left',
                }}>
                Pin Code
              </Text>
              <View
                style={{
                  flex: 2.7,
                }}>
                <View style={styles.searchSection}>
                  <TextInput
                    style={[styles.input]}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    value={value}
                    onChangeText={text => {
                      onChange(text);
                    }}
                  />
                  {errors?.pin_code && (
                    <Text style={styles.errorText}>
                      {errors?.pin_code.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
          name="pin_code"
          rules={{
            required: {
              value: true,
              message: 'Please enter a valid pincode',
            },
          }}
          defaultValue={data.pincode}
        />
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
          handleSubmit(data => {
            data['latitude'] = location?.latitude;
            data['longitude'] = location?.longitude;
            data['address_type'] = 'Home';
            console.log(data);
            var nav = route?.params?.state;
            dispatch(postAddressAction(setLoading, data, navigation, nav));
          })();
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
            Save Address
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? null : StatusBar.currentHeight,
    fontFamily: 'BalsamiqSans-Bold',
  },

  inputWrapper: {
    flexDirection: 'column',

    width: wp('90%'),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
    // marginHorizontal: wp('3%'),
    marginVertical: hp('1.5%'),
  },

  errorText: {
    color: 'red',
    fontSize: RFPercentage(1.5),
    alignSelf: 'flex-start',
    marginLeft: wp('2%'),
    fontFamily: 'BalsamiqSans-Regular',
  },
  input_box: {
    borderRadius: wp('1%'),
  },
  searchSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.darkGrey,
    borderRadius: wp('1%'),
    overflow: 'hidden',
    height: hp('6%'),
    borderRadius: wp('1%'),
  },
  editIcon: {
    padding: wp('1%'),
  },
  input: {
    flex: 1,
    paddingLeft: wp('2.5%'),
    backgroundColor: '#fff',
    textDecorationLine: 'none',
    fontFamily: 'BalsamiqSans-Bold',
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
