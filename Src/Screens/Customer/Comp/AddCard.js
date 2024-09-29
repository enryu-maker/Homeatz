import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../../Assets/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {
  DeleteAddress,
  getActiveAddress,
  setActiveAddress,
} from '../../../../Store/actions';
import {ActivityIndicator} from 'react-native-paper';
export default function AddCard({data, show = true, active, setAddress}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  return (
    <TouchableOpacity
      style={{
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: active ? 1 : 0,
        borderRadius: 8,
        shadowColor: 'lightgray',
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {width: 3, height: 3},
        backgroundColor: colors.white,
        padding: 18,
      }}
      onPress={() => {
        dispatch(setActiveAddress(setLoading, data?.id));
        dispatch(getActiveAddress(setLoading));
      }}>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.logoPink} />
      ) : (
        <>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'BalsamiqSans-Bold',
              color: colors.darkGrey,
            }}>
            {data?.address_type}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'BalsamiqSans-Regular',
              color: colors.darkGrey,
            }}>
            {`${data?.address_line_1} ${data?.address_line_2}, ${data?.city}, ${data?.state}, ${data?.country}, ${data?.pin_code}`}
          </Text>
          {show ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(DeleteAddress(setLoading, data?.id, setAddress));
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colors.logoPink,
                }}>
                <AntDesign name="delete" size={20} color={colors.logoPink} />
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      )}
    </TouchableOpacity>
  );
}
