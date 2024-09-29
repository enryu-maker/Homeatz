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
  Dimensions,
  SafeAreaView,
  Image,
  RefreshControl,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import React, {useState} from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors, fonts} from '../../../Assets/theme';
import {useForm, Controller} from 'react-hook-form';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TextButton from '../../Component/TextButton';
import CircularCard from '../../Component/CircularCard';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from './Comp/Header';
import {
  getBannerAction,
  getLocation,
  getPopularAction,
} from '../../../Store/actions';

export default function Home({navigation}) {
  const [index, setIndex] = React.useState(0);
  const banner = useSelector(state => state.Reducers.banner);
  const popular = useSelector(state => state.Reducers.popular);
  const location = useSelector(state => state.Reducers.location);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    // dispatch(getLocation(setLoading));
    dispatch(getPopularAction(location));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  React.useEffect(() => {
    dispatch(getPopularAction(location));
    dispatch(getBannerAction());
  }, [location]);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Header
          navigation={navigation}
          title="Homeatz"
          textStyle={{
            color: colors.white,
            fontSize: RFPercentage(3),
          }}
          textContainer={{
            backgroundColor: colors.logoPink,
            paddingHorizontal: 20,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
          subtitle={'Home Food By Home Chefs'}
          showBack={false}
        />
        <ScrollView
          style={{
            flex: 1,
            width: wp('100%'),
          }}>
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          <Carousel
            loop
            mode="parallax"
            pagingEnabled={true}
            autoplayInterval={5000}
            scrollAnimationDuration={1000}
            autoPlay={true}
            data={banner}
            renderItem={({item, index}) => {
              return (
                <Image
                  source={{uri: item['img'].uri}}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              );
            }}
            height={hp('30%')}
            width={wp('100%')}
            onSnapToItem={index => setIndex(index)}
          />

          <TextButton
            title={"Order from Chef's Menu"}
            onPress={() => {
              navigation.navigate('Chef');
            }}
          />
          <Text
            style={{
              fontSize: RFPercentage(3.3),
              fontFamily: 'BalsamiqSans-Bold',
              textAlign: 'center',
              marginBottom: hp('1%'),
            }}>
            Popular Home Chefs
          </Text>
          <FlatList
            disableVirtualization={false}
            style={{width: wp('100%')}}
            data={popular}
            renderItem={({item, index}) => {
              return (
                <CircularCard
                  name={item.name}
                  img={item.icon}
                  id={item.id}
                  navigation={navigation}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  initial: {
    backgroundColor: '#fff',
  },
  container: {
    width: wp('100%'),
    marginTop: Platform.OS == 'ios' ? 0 : 0,
    backgroundColor: '#fff',
    height: Dimensions.get('window').height,
    marginBottom: hp('10%'),
  },
  searchSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2.6,
    fontSize: RFValue(4, 200),
    borderColor: colors.darkGrey,
    borderRadius: wp('10%'),
    overflow: 'hidden',
    width: wp('94%'),
    marginVertical: hp('2%'),
  },
  text: {
    fontSize: RFValue(5, 200),
    fontFamily: 'BalsamiqSans-Regular',
    flexDirection: 'row',
    flex: 1,
    paddingRight: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    paddingLeft: wp('5%'),
  },

  content: {
    width: '100%',
    height: '100%',
  },

  editIcon: {
    padding: wp('1.5%'),
  },
  input: {
    flex: 1,
    paddingLeft: wp('2%'),
    backgroundColor: '#fff',
    borderBottomStartRadius: 10000,
    borderTopEndRadius: 100000,
  },
  button_wrapper: {
    // backgroundColor: 'red',
    marginBottom:
      Platform.OS == 'ios' ? hp('5%') : Dimensions.get('window').height * 0.035,
    // marginHorizontal: Platform.OS == 'ios' ? wp('9.5%') : wp('10%'),
  },
  button: {
    backgroundColor: colors.logoPink,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 2,
    height: 'auto',
    shadowOffset: {width: 3, height: 3},
    display: 'flex',
    alignSelf: 'center',
    maxWidth: '90%',
    paddingHorizontal: wp('4%'),
  },
});
