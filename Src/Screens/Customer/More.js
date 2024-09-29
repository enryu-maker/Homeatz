import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {colors} from '../../../Assets/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Header from './Comp/Header';
import {useDispatch, useSelector} from 'react-redux';
import {LogoutAction, getOrdersAction} from '../../../Store/actions';
import * as Sentry from '@sentry/react-native';

export default function More({navigation}) {
  const access = useSelector(state => state.Reducers.access);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        width: wp('100%'),
        alignSelf: 'center',
        backgroundColor: colors.white,
      }}>
      <Header navigation={navigation} showBack={false} title="More" />

      <View
        style={{
          height: hp('40%'),
          width: wp('90%'),
          justifyContent: 'space-evenly',
          alignSelf: 'center',
        }}>
        {access ? (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: 'BalsamiqSans-Bold',
                  color: colors.darkGrey,
                }}>
                My Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OrderHistory');
                dispatch(getOrdersAction());
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: 'BalsamiqSans-Bold',
                  color: colors.darkGrey,
                }}>
                Order History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Address', {
                  state: true,
                });
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: 'BalsamiqSans-Bold',
                  color: colors.darkGrey,
                }}>
                Address Book
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MoreInfo');
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: 'BalsamiqSans-Bold',
                  color: colors.darkGrey,
                }}>
                Contact & Privacy
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signin');
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: 'BalsamiqSans-Bold',
                  color: colors.darkGrey,
                }}>
                Login / Signup
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup', {
                  chef: true,
                });
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: 'BalsamiqSans-Bold',
                  color: colors.darkGrey,
                }}>
                Join as Chef
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MoreInfo');
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(4.5),
                  fontFamily: 'BalsamiqSans-Bold',
                  color: colors.darkGrey,
                }}>
                Contact & Privacy
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {access ? (
        <View
          style={{
            height: hp('10%'),
            width: wp('90%'),
            justifyContent: 'space-evenly',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: wp('90%'),
              alignSelf: 'center',
            }}
            onPress={() => {
              dispatch(LogoutAction());
            }}>
            <Text
              style={{
                fontSize: RFPercentage(4.5),
                fontFamily: 'BalsamiqSans-Bold',
                color: 'red',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
