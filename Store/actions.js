import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import axiosIns, { baseURL, baseURL1 } from '../src/helper/Helper';
import Toast from 'react-native-toast-message';
import GetLocation from 'react-native-get-location';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import Geolocation from '@react-native-community/geolocation';
export const Init = () => {
  return async dispatch => {
    let access = await AsyncStorage.getItem('access');
    let is_chef = JSON.parse(await AsyncStorage.getItem('is_chef'));
    let profile = JSON.parse(await AsyncStorage.getItem('profile'));
    if (access !== null) {
      dispatch({
        type: 'LOGIN',
        payload: {
          access: access,
          is_chef: is_chef,
          profile: profile,
        },
      });
    }
  };
};

export const getCountryCode = (country, setData) => {
  return async dispatch => {
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then(res => {
        res?.data?.find(el =>
          el.name.common === country
            ? setData(el.idd.root + el.idd.suffixes[0])
            : null,
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getCurrencyCode = (country, setData) => {
  return async dispatch => {
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then(res => {
        res?.data?.find(el => {
          if (el.name.common === country) {
            var code = Object.keys(el?.currencies);
            setData(el?.currencies[code[0]].symbol);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getLocation = (setLoading, type) => {
  setLoading(true);
  return async dispatch => {
    if (type === 'ios') {
      Geolocation.getCurrentPosition(
        async position => {
          await axios
            .get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=328fd33ba9f0413d9b38d214f042e36c`,
            )
            .then(res => {
              const city = res.data.features[0].properties.city;
              const pin_code = res.data.features[0].properties.postcode;
              const state = res.data.features[0].properties.state;
              const country = res.data.features[0].properties.country;
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              dispatch({
                type: 'GET_LOCATION',
                payload: {
                  city: city,
                  state: state,
                  country: country,
                  pin_code: pin_code,
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 5,
                  longitudeDelta: 5,
                },
              });
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            });
        },
        error => {
          console.log(error.code, error.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 60000 },
      );
    } else {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          axios
            .get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${location?.latitude}&lon=${location?.longitude}&apiKey=328fd33ba9f0413d9b38d214f042e36c`,
            )
            .then(res => {
              const city = res.data.features[0].properties.city;
              const pin_code = res.data.features[0].properties.postcode;
              const state = res.data.features[0].properties.state;
              const country = res.data.features[0].properties.country;
              const latitude = location.latitude;
              const longitude = location.longitude;
              dispatch({
                type: 'GET_LOCATION',
                payload: {
                  city: city,
                  state: state,
                  country: country,
                  pin_code: pin_code,
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 5,
                  longitudeDelta: 5,
                },
              });
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            });
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        });
    }
  };
};

export const ResetPassword = (number, setLoading, navigation) => {
  setLoading(true);
  return async dispatch => {
    await axios
      .get(baseURL + `getresetpasswordtoken/`, {
        params: {
          phone: number,
        },
      })
      .then(res => {
        if (res.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'OTP Sent Successfully',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
          setTimeout(() => {
            navigation.navigate('Forgot', {
              number: number,
            });
            setLoading(false);
          }, 2000);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: err.response.data.msg,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setLoading(false);
      });
  };
};

export const NewPassword = (data, setLoading, navigation) => {
  setLoading(true);
  return async dispatch => {
    await axios
      .post(baseURL + `resetpassword/`, data)
      .then(res => {
        if (res.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'Password Updated Successfully',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
          setTimeout(() => {
            navigation.replace('Signin');
            setLoading(false);
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err.Response);
        Toast.show({
          type: 'error',
          text1: err.response.data.msg,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setLoading(false);
      });
  };
};

export const deleteAccount = (setLoading, type, reason) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.post(
        baseURL + 'deleteaccount/',
        type
          ? {
            reason: reason,
          }
          : {},
      );
      Toast.show({
        type: 'success',
        text1: 'Profile Deleted Successfully',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setTimeout(() => {
        setLoading(false);
        LogoutAction();
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
};

export const getChefProfile = (setLoading, setProfile) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.get(baseURL + 'getcreatechefprofile/');
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const getMetaData = setLoading => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.get(baseURL + 'hemedia/getmetadata/');
      dispatch({
        type: 'GET_META_DATA',
        payload: response.data,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const getNearbyChefAction = (setLoading, setNearbyChef, data) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.get(baseURL + `getnearbychefs/`, {
        params: {
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city,
        },
      });
      setNearbyChef(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const getTopRated = (setLoading, setTop, data) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.get(baseURL + `gettoprateditems/`, {
        params: {
          city: data.city,
        },
      });
      setTop(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const searchProduct = (setLoading, setData, query, location) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.get(baseURL + `searchitems/`, {
        params: {
          city: location?.city,
          q: query,
        },
      });
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const addChefProfile = (setLoading, data) => {
  const formdata = new FormData();
  formdata.append('kitchen_name', data.kitchen_name);
  formdata.append('chef_description', data.description);
  formdata.append('address_line_1', data.address_line_1);
  formdata.append('address_line_2', data.address_line_2);
  formdata.append('city', data.city);
  formdata.append('state', data.state);
  formdata.append('pin_code', data.pin_code);
  formdata.append('latitude', data.latitude);
  formdata.append('longitude', data.longitude);
  formdata.append('logo', data.icon);
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.post(
        baseURL + 'getcreatechefprofile/',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Profile Added Successfully',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        await AsyncStorage.setItem('profile', JSON.stringify(true));
        dispatch({
          type: 'SET_CHEF',
          payload: true,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
};
export const updateChefProfile = (setLoading, data) => {
  const formdata = new FormData();
  Object.entries(data).forEach(([k, v]) => {
    formdata.append(k, v);
  });
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.patch(
        baseURL + 'updatechefprofile/',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'Profile Updated Successfully',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
};

export const getMenuDetails = (setLoading, setMenu, data) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.get(baseURL + `getcreateitems/`, {
        params: {
          typeid: data.id,
        },
      });
      setMenu(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const getDealType = () => {
  return async dispatch => {
    try {
      let response = await axios.get(baseURL + 'getdealtypes/');
      dispatch({
        type: 'GET_DEAL_TYPE',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCatType = () => {
  return async dispatch => {
    try {
      let response = await axiosIns.get(baseURL + 'getmenucategory/');
      dispatch({
        type: 'GET_MENU_TYPE',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postChefItem = (setLoading, data, navigation) => {
  const formdata = new FormData();
  formdata.append('name', data.name);
  formdata.append('description', data.description);
  formdata.append('ingredients', data.ingredients);
  formdata.append('price', data.price);
  {
    data.item_expiry === null
      ? null
      : formdata.append('item_expiry', data.item_expiry);
  }
  formdata.append('is_veg', data.is_veg);
  formdata.append('category_id', data.category_id);
  formdata.append('deal_type', data.deal_type);
  formdata.append('image', data.image);
  formdata.append('daily_limit', data.daily_quantity);
  formdata.append('portion', data.portion);
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.post(
        baseURL + 'getcreateitems/',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Item Added Successfully',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
};

export const LoginAction = (setLoading, data, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      await axios
        .post(baseURL + 'login/', data)
        .then(response => {
          AsyncStorage.setItem('access', response?.data?.access);
          AsyncStorage.setItem(
            'is_chef',
            JSON.stringify(response?.data?.is_chef),
          );
          AsyncStorage.setItem(
            'profile',
            JSON.stringify(response?.data?.profile_created),
          );

          dispatch({
            type: 'LOGIN',
            payload: {
              access: response?.data?.access,
              is_chef: response?.data?.is_chef,
              profile: response?.data?.profile_created,
            },
          });
          setLoading(false);
          navigation.replace('Tab');
        })
        .catch(error => {
          console.log(error.response.data);
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: error.response.data.msg || error.response.data,
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const sendDeviceID = () => {

}

export const RegisterAction = (setLoading, data, navigation) => {
  const formdata = new FormData();
  formdata.append('full_name', data.full_name);
  formdata.append('email', data.email);
  formdata.append('password', data.password);
  formdata.append('phone', data.mobile);
  formdata.append('profile_photo', data.profile_photo);
  formdata.append('is_chef', data.is_chef);
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.post(baseURL + 'register/', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Registered Successfully',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
};

export const getItemsAction = (setLoading, setItems, data) => {
  return async dispatch => {
    const urls = [];
    const names = [];
    data?.map(item => {
      urls.push(baseURL + `getitemdetails/${item}/`);
    });
    console.log(urls);
    setLoading(true);
    try {
      const requests = urls.map(url => axios.get(url));
      setItems(requests);
      await axios.all(requests).then(responses => {
        responses.forEach(resp => {
          console.log(resp?.data);
          names.push(resp.data);
        });
      });
      setItems(names);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const getCollection = setLoading => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.get(baseURL + `getcollections/`);
      dispatch({
        type: 'GET_COLLECTION',
        payload: response?.data,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const updateStatus = (id, data, setLoading, code, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.post(
        baseURL + `setorderstatus/${id}/`,
        data === 5
          ? {
            status: data,
            otp: code,
          }
          : {
            status: data,
          },
      );
      console.log(response?.data);
      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: 'success',
          text1: response?.data?.msg,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        dispatch(GetChefOrders());
        navigation.navigate('Main');
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const addtocartAction = (setLoading, data) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.post(baseURL + 'addtocart/', data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const updateCartAction = data => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE_QUANTITY',
      payload: data,
    });
  };
};

export const createOrder = (data, setLoading, selected, navigation) => {
  setLoading(true);
  return async dispatch => {
    if (selected === 1) {
      data['payment_mode'] = 'ONLINE';
      axiosIns.post(baseURL + 'listcreateorder/', data).then(response => {
        console.log(response.data);
        PhonePePaymentSDK.init(
          'PRODUCTION',
          'HOMEATZONLINE',
          Platform.OS === 'ios'
            ? '842841cba0e14dc688a5b915709f9316'
            : '93fdb4980b5a49a19eb8ff85e3f9d940',
          false,
        )
          .then(() => {
            PhonePePaymentSDK.startPGTransaction(
              response?.data?.payload,
              response?.data?.header,
              '/pg/v1/pay',
              {
                contentType: 'application/json',
                accept: 'application/json',
                'X-VERIFY': response?.data?.header,
              },
              '',
              '',
            )
              .then(async a => {
                if (a?.status === 'FAILURE') {
                  Toast.show({
                    type: 'error',
                    text1: 'Error Processing Payement !',
                    text2: a?.status,
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 50,
                    bottomOffset: 40,
                  });
                  setLoading(false);
                } else {
                  await axiosIns
                    .get(baseURL + `updatepaymentstatus/`, {
                      params: {
                        order_id: response?.data?.order_id,
                      },
                    })
                    .then(res => {
                      if (res.data.status === false) {
                        Toast.show({
                          type: 'error',
                          text1: res.data.msg,
                          visibilityTime: 2000,
                          autoHide: true,
                          topOffset: 50,
                          bottomOffset: 40,
                        });
                        setLoading(false);
                      } else {
                        navigation.navigate('Placed', {
                          item: response.data,
                        });
                        setLoading(false);
                      }
                    });
                }
              })
              .catch(e => {
                console.log(e);
                Toast.show({
                  type: 'error',
                  text1: e.response.data.msg,
                  visibilityTime: 2000,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 40,
                });
                setLoading(false);
              });
          })
          .catch(error => {
            console.log(error);
            Toast.show({
              type: 'error',
              text1: error.response.data.msg,
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });
            setLoading(false);
          });
      });
    } else {
      data['payment_mode'] = 'COD';
      axiosIns
        .post(baseURL + 'listcreateorder/', data)
        .then(response => {
          console.log('Res', response);
          navigation.navigate('Placed', {
            item: response.data,
          });
          setLoading(false);
        })
        .catch(error => {
          console.log('error', error);
          Toast.show({
            type: 'error',
            text1: error.response.data.msg,
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
          setLoading(false);
        });
    }
  };
};

export const getOrdersAction = () => {
  return async dispatch => {
    try {
      let response = await axiosIns.get(baseURL + 'listcreateorder/');
      console.log(response.data);
      dispatch({
        type: 'GET_USER_ORDERS',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMenuOverview = () => {
  return async dispatch => {
    try {
      let response = await axiosIns.get(baseURL + 'countbycategory/');
      dispatch({
        type: 'MENU_OVERVIEW',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfile = (image, setLoading) => {
  return async dispatch => {
    const formdata = new FormData();
    formdata.append('profile_photo', image);
    setLoading(true);
    try {
      let response = await axiosIns.patch(
        baseURL + `updateprofile/`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'Profile Updated Successfully',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response.data.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const getProfileAction = (setLoading, setProfile) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.get(baseURL + `getprofile/`);
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const postAddressAction = (setLoading, data, navigation, nav) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.post(baseURL + 'getcreateaddress/', data);
      console.log(response);
      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Address Added Successfully',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setTimeout(() => {
          nav ? navigation.push('Address') : navigation.push('Checkout');
        }, 3000);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: error.response.data.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
};

export const getAddressAction = (setLoading, setAddress) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.get(baseURL + 'getcreateaddress/');
      setLoading(false);
      setAddress(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const DeleteAddress = (setLoading, id, setAddress) => {
  console.log(id);
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.delete(
        baseURL + `updatedeleteaddress/${id}/`,
      );
      Toast.show({
        type: 'success',
        text1: response.data.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      dispatch(getAddressAction(setLoading, setAddress));
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error Deleting Profile',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const getActiveAddress = setLoading => {
  return async dispatch => {
    setLoading(true);
    try {
      let response2 = await axiosIns.get(baseURL + 'getcreateaddress/');
      let response = await axiosIns.get(baseURL + 'getsetactiveaddress/');
      setLoading(false);
      dispatch({
        type: 'GET_ADDRESS',
        payload: {
          active: response.data,
          address: response2.data,
        },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};
export const setActiveAddress = (setLoading, id) => {
  return async dispatch => {
    setLoading(true);
    try {
      await axiosIns
        .post(baseURL + 'getsetactiveaddress/', {
          address_id: id,
        })
        .then(response => {
          let resp = axiosIns.get(baseURL + 'getsetactiveaddress/');
          dispatch({
            type: 'GET_ADDRESS',
            payload: {
              active: resp.data,
            },
          });
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Address set as active',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Something Went Wrong',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Something Went Wrong',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
};

export const getChef = (setLoading, data, setChef) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.get(baseURL + `getchefdetails/${data}/`);
      setChef(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const deleteAddress = (setLoading, data, setAddress) => {
  console.log(data);
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.delete(
        baseURL + `updatedeleteaddress/${data}/`,
      );
      console.log(response.data);
      Toast.show({
        type: 'success',
        text1: response.data.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      dispatch(getAddressAction(setLoading, setAddress));
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'success',
        text1: error.response.data.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const getPopularAction = data => {
  console.log(data);
  return async dispatch => {
    try {
      await axios
        .get(baseURL + `getpopularchefs/?city=${data?.city}`)
        .then(response => {
          dispatch({
            type: 'GET_POPULAR',
            payload: response.data,
          });
        });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const getBannerAction = () => {
  const data = [];
  return async dispatch => {
    try {
      let response = await axios.get(baseURL + 'hemedia/getbanners/');
      response.data.map(item => {
        data.push({
          img: { uri: item.banner },
        });
      });
      dispatch({
        type: 'GET_BANNER',
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getChefMenuAction = (setLoading, setMenu, data) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.get(baseURL + `getchefmenu/${data}`);
      setMenu(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
};

export const GetChefOrders = () => {
  return async dispatch => {
    try {
      let response = await axiosIns.get(baseURL + 'getcheforders/');
      dispatch({
        type: 'GET_CHEF_ORDERS',
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const LogoutAction = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
  };
};
