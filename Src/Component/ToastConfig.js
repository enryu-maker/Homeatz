import {BaseToast, ErrorToast} from 'react-native-toast-message';

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green'}} // Assuming 'green' is defined in tailwind config
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontFamily: 'BalsamiqSans-Bold', // Custom font
        fontSize: 16, // Replace RFPercentage with a fixed size or a Tailwind class if applicable
        color: 'black', // Assuming 'black' is in tailwind config
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'red'}}
      text1Style={{
        fontFamily: 'BalsamiqSans-Bold', // Custom font
        fontSize: 16, // Replace RFPercentage with a fixed size or a Tailwind class if applicable
        color: 'red',
      }}
    />
  ),
};
