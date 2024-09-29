import { View, Text, ScrollView, Platform } from 'react-native'
import React from 'react'
import Header from './Comp/Header'
import { colors } from '../../../Assets/theme'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import TextButton from '../../../Component/TextButton';
import { getChefProfile, getCollection, getCurrencyCode, getLocation } from '../../../../Store/actions';
export default function Home({
  navigation
}) {
  const profileCreated = useSelector(state => state.Reducers.profileCreated)
  const chefOrders = useSelector(state => state.Reducers.chefOrders)
  const menuOverview = useSelector(state => state.Reducers.menuOverview)
  const collection = useSelector(state => state.Reducers.collection)
  const location = useSelector(state => state.Reducers.location)
  const dispatch = useDispatch()
  const [profile, setProfile] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [code, setCode] = React.useState("")

  function getTotalOrders() {
    let total = 0;
    let keys = Object.keys(chefOrders)
    keys.map((item) => {
      total += chefOrders[item].length
    })
    return total
  }

  

  React.useEffect(() => {
    dispatch(getChefProfile(setLoading, setProfile))
    dispatch(getCollection(setLoading))
    dispatch(getLocation(setLoading,Platform.OS));
    dispatch(getCurrencyCode(location.country,setCode))
  }, [dispatch])

  return (
    <View style={{
      flex: 1,
      backgroundColor: "white",
      width: wp('100%'),
      alignItems: "center",
      alignSelf: 'center',
      justifyContent: 'center',

    }}>
      <Header
        showBack={false}
        title="Homeatz"
        textStyle={{
          color: colors.white,
          fontSize: RFPercentage(3),
        }}
        containerStyle={{
          backgroundColor: colors.logoPink,
          paddingHorizontal: 20,
          borderTopLeftRadius: 15,
          borderBottomRightRadius: 15
        }}
        navigation={navigation}
        subtitle={"Home Food By Home Chefs"}
      />
      <Text style={{
        width: wp('90%'),
        fontSize: 20,
        textAlign: "center",
        fontFamily: "BalsamiqSans-Bold",
        color: colors.darkGrey,
        paddingTop: hp("2.5%")
      }}>Welcome,
        <Text style={{
          color: colors.iconColor,
          textAlign:"center"
        }}> {`${profile?.kitchen_name} ${profile?.city} `}
        </Text>
      </Text>
      {
        !profileCreated ?
          <View style={{
            width: "90%",
            backgroundColor: colors.white,
            alignSelf: "center",
            shadowColor: "#000",
            paddingBottom: 10,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            marginTop: hp("2%"),
            borderRadius: 15,
            padding: 10
          }}>
            <Text style={{
              width: wp('90%'),
              fontSize: 25,
              textAlign: "center",
              fontFamily: "BalsamiqSans-Bold",
              color: "red",
            }}>Important Notice</Text>
            <Text style={{
              width: wp('90%'),
              fontSize: 20,
              textAlign: "center",
              fontFamily: "BalsamiqSans-Bold",
              color: colors.black,
              marginVertical: 5
            }}>Chef Profile is Not Created</Text>
            <TextButton
              title={"Create Now"}
              onPress={() => {
                navigation.navigate("ChefProfile")
              }}
            />
          </View>
          :
          null
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          display: "flex",
          width: wp('100%'),
          alignSelf: 'center',
        }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{
          width: wp('90%'),
          fontSize: 25,
          textAlign: "left",
          fontFamily: "BalsamiqSans-Bold",
          color: colors.logoPink,
          paddingTop: hp("2.5%")
        }}>Earnings Overview</Text>
        <View style={{
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 10,
          height: hp("25%"),
          marginTop: hp('3%'),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
          justifyContent: "space-around",
          alignItems: "center",
        }}>
          <View style={{
            width: wp('80%'),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <View style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{
                fontSize: 25,
                fontFamily: "BalsamiqSans-Bold",
                color: colors.logoPink,
                padding: hp("1%")
              }}>{code} {collection?.todays_collections}</Text>
              <Text style={{
                fontSize: 18,
                fontFamily: "BalsamiqSans-Bold",
                color: colors.darkGrey,
                padding: hp("1%")
              }}>Today's</Text>
            </View>
            <View style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{
                fontSize: 25,
                fontFamily: "BalsamiqSans-Bold",
                color: colors.logoPink,
                padding: hp("1%")
              }}>{code} {collection?.monthly_collections}</Text>
              <Text style={{
                fontSize: 18,
                fontFamily: "BalsamiqSans-Bold",
                color: colors.darkGrey,
                padding: hp("1%")
              }}>Monthly</Text>
            </View>
          </View>
          <View style={{
            width: wp('90%'),
            borderStyle: "dashed",
            borderWidth: 1,
            borderColor: colors.darkGrey,
            marginVertical: hp("1%")
          }} />
          <View style={{
            width: wp('80%'),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Text style={{
              fontSize: 22,
              fontFamily: "BalsamiqSans-Bold",
              color: colors.darkGrey,
              padding: hp("1%")
            }}>Active Orders</Text>
            <Text style={{
              fontSize: 25,
              fontFamily: "BalsamiqSans-Bold",
              color: colors.logoPink,
              padding: hp("1%")
            }}>{getTotalOrders()}</Text>
          </View>
        </View>
        <Text style={{
          width: wp('90%'),
          fontSize: 25,
          textAlign: "left",
          fontFamily: "BalsamiqSans-Bold",
          color: colors.logoPink,
          marginTop: hp(4)
        }}>Order Overview</Text>
        <View style={{
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 10,
          height: hp("25%"),
          marginTop: hp('3%'),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
          justifyContent: "space-around",
          alignItems: "center",
        }}>
          <View style={{
            width: wp('80%'),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <View style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <View style={{
                backgroundColor: colors.logoPink,
                borderRadius: 10,
                height: hp("5%"),
                paddingHorizontal: wp("2.5%"),
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Text style={{
                  fontSize: 25,
                  fontFamily: "BalsamiqSans-Bold",
                  color: colors.white,
                }}>{chefOrders['12-PM']?.length}</Text>
              </View>
              <Text style={{
                fontSize: 18,
                fontFamily: "BalsamiqSans-Bold",
                color: colors.darkGrey,
                padding: hp("1%")
              }}>12PM Orders</Text>
            </View>
            <View style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <View style={{
                backgroundColor: colors.logoPink,
                borderRadius: 10,
                height: hp("5%"),
                paddingHorizontal: wp("2.5%"),
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Text style={{
                  fontSize: 25,
                  fontFamily: "BalsamiqSans-Bold",
                  color: colors.white,
                }}>{chefOrders['06-PM']?.length}</Text>
              </View>
              <Text style={{
                fontSize: 18,
                fontFamily: "BalsamiqSans-Bold",
                color: colors.darkGrey,
                padding: hp("1%")
              }}>6PM Orders</Text>
            </View>
          </View>
        </View>
        <Text style={{
          width: wp('90%'),
          fontSize: 25,
          textAlign: "left",
          fontFamily: "BalsamiqSans-Bold",
          color: colors.logoPink,
          paddingTop: hp("2.5%")
        }}>Menu Overview</Text>
        <View style={{
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 10,
          marginTop: hp('3%'),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: hp("5%")
        }}>
          {
            Object.entries(menuOverview).map((entry, index) => (
              <View style={{
                width: wp('85%'),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: hp("0.5%"),
              }}>
                <Text style={{
                  fontSize: 20,
                  fontFamily: "BalsamiqSans-Bold",
                  color: colors.darkGrey,
                  padding: hp("1%")
                }}>{entry[0]}</Text>
                <View style={{
                  backgroundColor: colors.logoPink,
                  borderRadius: 10,
                  height: hp("5%"),
                  paddingHorizontal: wp("2.5%"),
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <Text style={{
                    fontSize: 25,
                    fontFamily: "BalsamiqSans-Bold",
                    color: colors.white,
                  }}>{entry[1]}</Text>
                </View>
              </View>
            )
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}