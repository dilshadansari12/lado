import { Pressable, Text, Touchable, View } from "react-native"
import { theme } from "../Pages/helper";
import Ionicons from '@react-native-vector-icons/ionicons';
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const GoToCart = ({ totalItem }: any) => {
    const navigation = useNavigation();

    const onGoToCardPress = () => {
        (navigation as any).navigate("cart", { totalItem })
    }

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
            <Text style={{ fontFamily: theme.font.heading.fontFamily, color: theme.iconColor, fontSize: theme.font.heading.fontSize - 3 }}>{totalItem} item added</Text>
            <Ionicons name="arrow-forward-circle-outline" style={{ alignSelf: "center", color: theme.iconColor, marginLeft: 8 }} size={22} />
        </Pressable>
    )
}

export default GoToCart;

{/* <ion-icon name="arrow-forward-circle-outline"></ion-icon> */ }