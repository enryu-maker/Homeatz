import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Header from '../Comp/Header';
import AddCard from '../Comp/AddCard';
import {ActivityIndicator} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteAddress,
  getActiveAddress,
  getAddressAction,
} from '../../../../Store/actions';
import {colors} from '../../../../Assets/theme';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../Component/ToastConfig';
export default function Address({navigation, route}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [daddress, setAddress] = React.useState([]);
  const activeAdd = useSelector(state => state.Reducers.active);
  React.useEffect(() => {
    dispatch(getAddressAction(setLoading, setAddress));
    dispatch(getActiveAddress(setLoading));
  }, [dispatch]);
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
        title="My Address"
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddAddress', {
            state: route?.params?.state,
          });
        }}
        style={{
          width: '90%',
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 20,
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#bd1461',
          borderRadius: 15,
          paddingHorizontal: 20,
        }}>
        <Feather
          name="plus"
          size={24}
          color="#bd1461"
          style={{
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'BalsamiqSans-Regular',
            color: '#bd1461',
            paddingHorizontal: 5,
            alignSelf: 'center',
          }}>
          Add New Address
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'BalsamiqSans-Regular',
          color: 'darkgrey',
          paddingHorizontal: 20,
          marginTop: 20,
          textAlign: 'center',
        }}>
        ---------- Saved Address ----------
      </Text>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={colors.logoPink}
          style={{
            marginTop: 100,
          }}
        />
      ) : (
        <FlatList
          data={daddress}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <AddCard
                active={activeAdd?.id === item.id ? true : false}
                data={item}
                navigation={navigation}
                setAddress={setAddress}
                onPressDelete={() => {
                  dispatch(deleteAddress(setLoading, item?.id, setAddress));
                }}
              />
            );
          }}
        />
      )}
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
        config={toastConfig}
      />
    </View>
  );
}
