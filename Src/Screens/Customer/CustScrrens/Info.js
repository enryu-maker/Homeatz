import {
  View,
  Text,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../Comp/Header';
import {colors} from '../../../../Assets/theme';
import {useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {getChef, getChefMenuAction} from '../../../../Store/actions';
import Clipboard from '@react-native-community/clipboard';
import {images} from '../../../Assets/image';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../Component/ToastConfig';
import RNRestart from 'react-native-restart';
const useInitialURL = () => {
  const [url, setUrl] = React.useState(null);
  const [processing, setProcessing] = React.useState(true);

  React.useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl?.split('/')[3]);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return {url, processing};
};
export default function Info({navigation, route}) {
  const [loading, setLoading] = React.useState(false);
  const [Item, setItem] = React.useState(null);
  const [menu, setMenu] = React.useState([]);
  const [copied, setCopied] = React.useState(false);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getChef(setLoading, id, setItem));
    dispatch(getChefMenuAction(setLoading, setMenu, id));
  }, []);
  function formatData(data) {
    const arr = [];
    Object.keys(data).map((item, index) => {
      arr.push({
        name: item,
        value: data[item].data,
        icon: data[item].icon,
      });
    });
    return arr;
  }
  // Copy on clicking on share button
  const copyToClipboard = () => {
    let message = `Click here to order from ${Item?.kitchen_name} https://www.homeatz.in/#/chefinfo/${id}`;
    Toast.show({
      type: 'success',
      text1: 'URL Copied Sucessfully',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 40,
    });
    Clipboard.setString(message);
    console.log(message);
    setCopied(true);
  };

  const {url: initialUrl, processing} = useInitialURL();
  console.log(initialUrl);
  console.log(processing);
  const [id, setId] = React.useState(
    initialUrl ? initialUrl : route?.params?.id,
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {initialUrl ? (
        <TouchableOpacity
          onPress={() => {
            RNRestart.Restart();
          }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'BalsamiqSans-Bold',
              color: colors.logoPink,
            }}>
            Go Home
          </Text>
        </TouchableOpacity>
      ) : (
        <Header
          navigation={navigation}
          showBack={true}
          title="Chef Details"
          showAppend={true}
          append={
            <View
              style={{
                height: 25,
                width: 35,
              }}
            />
          }
        />
      )}

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.logoPink} />
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              width: '90%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 60,
                borderColor: 'lightgray',
                borderWidth: 2,
              }}
              source={{uri: Item?.icon}}
            />
            <View
              style={{
                flexDirection: 'column',
                width: '60%',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginLeft: 20,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: 'BalsamiqSans-Bold',
                  color: colors.logoPink,
                }}>
                {Item?.kitchen_name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'BalsamiqSans-Regular',
                  color: colors.darkGrey,
                }}>
                {Item?.description?.length > 50
                  ? Item?.description?.slice(0, 100) + '...'
                  : Item?.description}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '90%',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: 'BalsamiqSans-Bold',
                color: colors.logoPink,
                alignSelf: 'center',
              }}>
              Menu :{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard();
              }}>
              <Image
                source={images.share}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: colors.logoPink,
                }}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            numColumns={2}
            style={{
              alignSelf: 'center',
            }}
            // horizontal={true}
            data={formatData(menu)}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10,
                    // padding: 8,
                    // margin:10
                  }}
                  onPress={() => {
                    navigation.navigate('MenuInfo', {
                      item: item.value,
                      name: item.name,
                      chef: Item,
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: 'BalsamiqSans-Bold',
                    }}>
                    {item.name}
                  </Text>
                  <Image
                    source={{uri: item.icon}}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* <Text style={{
                            fontSize: 30,
                            fontFamily: 'BalsamiqSans-Bold',
                            color: colors.logoPink,
                            alignSelf: 'center',
                            marginTop: 20,
                            width: '90%',
                        }}>Top Rated from chef's : </Text>
                        <FlatList
                            style={{
                                width: '90%',
                            }}
                            horizontal={true}
                            data={formatData(menu)}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{
                                        flexDirection: "column",
                                        // justifyContent: "center",
                                        alignItems: "center",
                                        padding: 8,
                                    }}>
                                        <Image
                                            source={{ uri: baseURL1 + item.icon }}
                                            style={{
                                                width: 120,
                                                height: 120,
                                                borderRadius: 10,
                                            }}
                                            resizeMode='contain'
                                        />
                                        <Text style={{
                                            fontSize: 22,
                                            fontFamily: "BalsamiqSans-Bold"
                                        }}>{item.name}</Text>

                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        /> */}
        </>
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
