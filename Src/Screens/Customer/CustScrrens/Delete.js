import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../Chef/Comp/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccount} from '../../../../Store/actions';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../../../Assets/theme';

export default function Delete({navigation}) {
  const [reason, setReason] = React.useState('');
  const is_chef = useSelector(state => state.Reducers.is_chef);
  const [loading, setLoading] = React.useState(false);

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
        title={'Delete'}
      />
      <Text
        style={{
          fontSize: RFPercentage(2.5), // 1.8 equivalent to 13
          textAlign: 'center',
          fontFamily: 'BalsamiqSans-regular',
          marginTop: hp('5%'),
        }}>
        Are you sure you want to delete your account?
      </Text>
      <TextInput
        style={{
          marginTop: 20,
          borderRadius: 10,
          height: 150,
          width: '88%',
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          alignSelf: 'center',
          padding: 5,
        }}
        multiline
        placeholder="Please Enter the Reason"
        onChangeText={text => setReason(text)}
        value={reason}
      />
      <TouchableOpacity
        style={{
          width: wp('88%'),
          height: hp('6%'),
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          borderRadius: 10,
        }}
        onPress={() => {
          dispatch(deleteAccount(setLoading, is_chef, reason));
        }}>
        {loading ? (
          <ActivityIndicator size={40} color={colors.white} />
        ) : (
          <Text
            style={{
              fontSize: RFPercentage(2.5), // 1.8 equivalent to 13
              textAlign: 'left',
              fontFamily: 'BalsamiqSans-regular',
              color: 'white',
            }}>
            Delete Account?
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
