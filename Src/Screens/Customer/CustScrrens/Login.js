import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {LoginAction} from '../../../../Store/actions';
import Toast from 'react-native-toast-message';
import Header from '../Comp/Header';
import TextButton from '../../../Component/TextButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [loading, setLoading] = useState(false);
  const {handleSubmit, control} = useForm();

  return (
    <View className="flex-1 bg-white">
      <Header
        showBack={true}
        // showAppend={true}
        // append={<View className="w-8 h-5" />}
        navigation={navigation}
        title={'Login/Signup'}
      />
      <ScrollView>
        <View className="mt-6 mb-2 mx-3">
          <Text className="text-md font-balsamiqBold text-gray-700">
            EXISTING USER
          </Text>
        </View>

        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          rules={{required: true}}
          defaultValue=""
          render={({field: {onChange, value}}) => (
            <View className="flex-col w-full justify-between items-center my-1">
              <Text className="text-start w-[91%] pb-2 text-lg font-balsamiqBold">
                Email
              </Text>
              <View className="">
                <View className="flex-row items-center justify-center border-2 border-darkGrey rounded-md h-[50px]">
                  <TextInput
                    className=" w-[88%] h-[45px] px-2 bg-white"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={text => {
                      onChange(text);
                      setIsTyping(true);
                      setCurrentField('email');
                    }}
                    onBlur={() => setIsTyping(false)}
                  />
                  {currentField === 'email' && isTyping ? null : (
                    <TouchableOpacity>
                      <FontAwesome
                        className="p-1"
                        name="edit"
                        size={20}
                        color="#000"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        />

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          rules={{required: true}}
          defaultValue=""
          render={({field: {onChange, value}}) => (
            <View className="flex-col w-full justify-between items-center my-1">
              <Text className="text-start w-[91%] pb-2 text-lg font-balsamiqRegular">
                Password
              </Text>
              <View className="">
                <View className="flex-row items-center justify-center border-2 border-darkGrey rounded-md h-[50px]">
                  <TextInput
                    className=" w-[88%] h-[45px] px-2 bg-white"
                    secureTextEntry={!showPassword}
                    value={value}
                    onChangeText={text => {
                      onChange(text);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}>
                    <FontAwesome
                      className="p-1"
                      name={showPassword ? 'eye' : 'eye-slash'}
                      size={20}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        {/* Forgot Password Link */}
        <View className="">
          <View className="flex-row w-[88%] self-center justify-end  mt-2">
            <Pressable
              onPress={() => navigation.navigate('Reset')}
              className="w-full">
              <Text className="text-base text-right text-blue underline font-balsamiqRegular">
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          {/* Login Button */}
          <TextButton
            title={'LOGIN'}
            loading={loading}
            onPress={handleSubmit(data => {
              dispatch(LoginAction(setLoading, data, navigation));
            })}
          />
        </View>

        {/* Divider */}
        <View className="w-11/12 self-center">
          <View className="border-dotted border-1 border-black my-3 w-full" />
        </View>

        {/* New User Section */}
        <View className="w-full mx-4 mt-6">
          <Text className="text-md font-balsamiqBold text-gray-700">
            NEW USER
          </Text>
        </View>

        <TextButton
          title={'Create an account'}
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
      </ScrollView>
      <Toast
        ref={ref => {
          Toast.setRef(ref);
        }}
      />
    </View>
  );
}
