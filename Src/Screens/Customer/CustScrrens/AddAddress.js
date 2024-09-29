import {View, Image, Text, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import Header from '../Comp/Header';
import Geolocation from '@react-native-community/geolocation';
import {images} from '../../../Assets/image';
import MapView, {PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import TextButton from '../../../Component/TextButton';
import {Marker} from 'react-native-maps';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../../../Assets/theme';
import {getLocation} from '../../../../Store/actions';
export default function AddAddress({navigation, route}) {
  const latitudeDelta = 5;
  const longitudeDelta = 5;
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  const [loc, setLoc] = React.useState({
    region: {},
  });

  const location = useSelector(state => state.Reducers.location);

  const dispatch = useDispatch();
  React.useEffect(() => {
    setLoading(true);
    dispatch(getLocation(setLoading, Platform.OS));
  }, [1]);
  function goToInitialLocation() {
    let initialRegion = Object.assign({}, location);
    initialRegion['latitudeDelta'] = 0.005;
    initialRegion['longitudeDelta'] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  }
  async function onRegionChange(region) {
    await axios
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${region?.latitude}&lon=${region?.longitude}&apiKey=ed8980477f3042a696497425b081fa6a`,
      )
      .then(res => {
        setData({
          address: res.data.features[0].properties.street,
          city: res.data.features[0].properties.city,
          state: res.data.features[0].properties.state,
          country: res.data.features[0].properties.country,
          pincode: res.data.features[0].properties.postcode,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header
        navigation={navigation}
        textStyle={
          {
            // fontSize: RFPercentage(4),
          }
        }
        append={
          <View
            style={{
              // width: 35,
              height: 35,
            }}
          />
        }
        showAppend={true}
        title="Confirm Location"
      />
      {loading ? (
        <ActivityIndicator
          animating={true}
          color="#BD1461"
          size="large"
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
          }}
        />
      ) : (
        <>
          <MapView
            provider={
              Platform.OS == 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
            }
            style={{
              width: '100%',
              height: '65%',
            }}
            onRegionChange={onRegionChange}
            followUserLocation={true}
            ref={ref => (this.mapView = ref)}
            zoomEnabled={true}
            showsUserLocation={true}
            onMapReady={goToInitialLocation}
            initialRegion={location}
            followsUserLocation={true}
            // mapType={Platform.OS == "android" ? "none" : "standard"}
          >
            <Marker
              coordinate={{
                latitude: location?.latitude,
                longitude: location?.longitude,
              }}
              title={'Your Location'}
              description={'Your Location'}
            />
          </MapView>
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                backgroundColor: '#F5F5F5',
                borderRadius: 20,
                justifyContent: 'flex-start',
                padding: 15,
              }}>
              <Feather
                name="map-pin"
                size={25}
                color="#BD1461"
                style={{fontFamily: 'BalsamiqSans-Regular'}}
              />
              <View style={{}}>
                <Text
                  style={{
                    fontSize: RFPercentage(2.5),
                    fontFamily: 'BalsamiqSans-Bold',
                    color: colors.black,
                    marginHorizontal: 5,
                  }}>
                  {data?.address}
                </Text>
                <Text
                  style={{
                    fontSize: RFPercentage(2),
                    fontFamily: 'BalsamiqSans-Regular',
                    color: colors.black,
                    marginHorizontal: 8,
                  }}>
                  {data?.city}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddLine', {
                  data,
                  location,
                  state: route?.params?.state,
                });
              }}
              style={{
                width: '100%',
                width: '90%',
                alignSelf: 'center',
                padding: 15,
                borderRadius: 20,
                backgroundColor: '#BD1461',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(2.5),
                  fontFamily: 'BalsamiqSans-Bold',
                  color: '#ffffff',
                }}>
                Add Complete Address
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
