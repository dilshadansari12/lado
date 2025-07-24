import { Linking, ToastAndroid, View } from "react-native";
import { Pressable, Text } from "react-native-gesture-handler";
import { theme } from "../Pages/helper";
import Ionicons from '@react-native-vector-icons/ionicons';


const RestaurantFooter = () => {

    const openWhatsApp = () => {
        const phoneNumber = '+917903715443'; // TODO: read from setting
        const message = 'Hello, I have a idea!';
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(() => {
            ToastAndroid.show("something wen'r worng", 1 * 1000);
        });
    };

    return (
        <View style={{
            alignSelf: 'center',
            marginVertical: 20,
            paddingHorizontal: 20,
        }}>
            <Text style={{
                fontSize: 20,
                color: 'gray',
                textAlign: 'center',
                // fontFamily: theme.font.body.fontFamily,
                lineHeight: 24,
                fontWeight: '500',
            }}>
                Didn't find what you were looking for? Tell us what's missing — we’re always open to adds!
            </Text>
            <Pressable onPress={openWhatsApp} style={{ borderWidth: 1, borderColor: theme.background.pimary, width: 200, alignSelf: "center", padding: 10, marginTop: 14, marginBottom: 50, display: "flex", flexDirection: "row-reverse", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontFamily: theme.font.body.fontFamily, color: theme.background.pimary, fontWeight: "bold" }}>suggest something</Text>
                <Ionicons name="logo-whatsapp" color={theme.background.pimary} size={18} style={{ marginRight: 2 }} />
            </Pressable>
        </View>
    )
};

export default RestaurantFooter;