import { Pressable, Text } from "react-native";

import { isEmpty, theme } from "../Pages/helper";
import { useCartStore } from "../Zustand/Stores/Home.store";
import Ionicons from '@react-native-vector-icons/ionicons';

const GoToTop = ({ ref }: any) => {
    const { cart }: any = useCartStore();
    const onGoToTop = () => (ref as any).current?.scrollToOffset({ offset: 0, animated: true });

    const addedCart = Object.values(cart).flatMap((e: any) => e?.restaurantItems.map(e => e?.qty)).filter(e => e > 0);
    return (
        <Pressable onPress={onGoToTop}
            style={{
                width: 120,
                position: "absolute",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                bottom: isEmpty(addedCart) ? 10 : 75,
                alignSelf: "center",
                backgroundColor: theme.background.dark,
                padding: 10,
                borderRadius: 100
            }}
        >
            <Text style={{ fontSize: 12, color: "white" }}>Back to top <Ionicons name="arrow-up" color={"white"} /></Text>
        </Pressable >
    )
}

export default GoToTop;