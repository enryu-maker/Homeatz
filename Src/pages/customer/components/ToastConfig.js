import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { colors } from '../Assets/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
export const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: "green" }}
            // contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontFamily: "SUSE-Bold",
                fontSize: 12,
                color: "#000"
            }}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: "red" }}
            text1Style={{
                fontFamily: "SUSE-Bold",
                fontSize: 12,
                color: "red"
            }}
        />
    )
};