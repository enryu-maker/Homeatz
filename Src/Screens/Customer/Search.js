import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import Header from './Comp/Header';
import {Controller, useForm} from 'react-hook-form';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../Assets/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import FoodCard from './Comp/FoodCard';
import {getLocation, searchProduct} from '../../../Store/actions';
export default function Search({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const {handleSubmit, control, errors} = useForm();
  const location = JSON.stringify(
    useSelector(state => state.Reducers.location),
  );
  const [query, setQuery] = React.useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const onRefresh = React.useCallback(() => {
    setData([]);
    setQuery('');
    dispatch(getLocation(setLoading, Platform.OS));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  React.useEffect(() => {
    setData([]);
    setQuery('');
    // dispatch(getLocation(setLoading));
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Header navigation={navigation} showBack={false} title="Search" />
      {/* search bar using controller */}
      <ScrollView>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        <Controller
          name="Search"
          control={control}
          defaultValue=""
          render={({field: {onChange, value}}) => (
            <>
              <View style={styles.searchSection}>
                <TextInput
                  style={[
                    styles.text,
                    {
                      color: errors?.name && isUserInvalid ? 'red' : '#424242',
                    },
                  ]}
                  placeholder="Search your Favourite Dish / Cuisine / Chef ..."
                  value={value}
                  onChangeText={text => {
                    // setUserInvalid(false);
                    setQuery(text);
                    onChange(text);
                  }}
                />
                <TouchableOpacity
                  style={{
                    // backgroundColor: colors.logoPink,
                    height: '100%',
                    width: 50,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: colors.darkGrey,
                  }}
                  onPress={() => {
                    dispatch(
                      searchProduct(
                        setLoading,
                        setData,
                        query,
                        JSON.parse(location),
                      ),
                    );
                  }}>
                  <AntDesign name="search1" size={32} color={colors.logoPink} />
                </TouchableOpacity>
              </View>
            </>
          )}
        />
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.logoPink}
            style={{
              marginTop: 100,
            }}
          />
        ) : (
          <FlatList
            style={{
              width: '100%',
              marginTop: 10,
            }}
            data={data}
            renderItem={({item, index}) => (
              <FoodCard data={item} key={index} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
              width: '100%',
            }}
          />
        )}
      </ScrollView>
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
    backgroundColor: '#fff',
    justifyContent: 'center',
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
    height: '100%',
    width: '78%',
    borderRadius: 15,
    borderColor: colors.darkGrey,
    borderWidth: 2,
    paddingHorizontal: 5,
  },
  input_box: {
    borderRadius: wp('1.5%'),
    marginTop: hp('1.5%'),
    marginBottom: hp('1.5%'),
  },
  searchSection: {
    width: wp('98%'),
    flexDirection: 'row',
    // backgroundColor: 'red',
    // borderWidth: 2,
    fontSize: RFValue(4, 200),
    borderColor: 'lightgray',
    borderRadius: 15,
    // overflow: 'hidden',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp('6%'),
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
