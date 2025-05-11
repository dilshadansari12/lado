import { Pressable, Text, Touchable, View } from "react-native"
import { safeText, theme } from "../Pages/helper";
import Ionicons from '@react-native-vector-icons/ionicons';
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const GoToCart = ({ cart }: any) => {
    const navigation = useNavigation();

    const onGoToCardPress = () => {
        (navigation as any).navigate("cart")
    }

    const totalRestaurant = Object.keys(cart);
    const restaurantData = totalRestaurant.map((restaurantId, idx) => {
        const restaurnat = cart[restaurantId];
        return {
            id: idx + 1,
            totalItem: restaurnat?.restaurantItems.filter((e) => e?.qty > 0)?.length,
            name: restaurnat?.restaurantMetaData?.name
        }
    }).filter((e) => e?.totalItem > 0);

    //TODO:redux
    return (
        <Pressable
            style={({ pressed }) => [{ height: 70, backgroundColor: pressed ? theme.background.pimary : theme.background.dark, display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", position: "relative" }]}
            onPress={onGoToCardPress}>
            <LottieView
                source={require('../assets/celibration.json')}
                autoPlay
                loop={true}
                style={{ width: 500, height: 100, position: "absolute" }}
            />
            <View>
                {restaurantData.map((e, idx) => {
                    return (
                        <Text key={idx} style={{ fontFamily: theme.font.heading.fontFamily, color: theme.iconColor, fontSize: theme.font.heading.fontSize - 3 }}>{restaurantData?.length > 1 ? `${safeText(e?.name, 12)} : ` : ''} {e?.totalItem} item added</Text>
                    )
                })}
            </View>
            <Ionicons name="arrow-forward-circle-outline" style={{ alignSelf: "center", color: theme.iconColor, marginLeft: 8 }} size={32} />
        </Pressable>
    )
}

export default GoToCart;