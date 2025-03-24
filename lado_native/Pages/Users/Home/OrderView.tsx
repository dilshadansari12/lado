import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Button } from "react-native";

const OrderView = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Order view Screen</Text>
            <Button title="Home" onPress={() => { (navigation as any).navigate("home") }} />
        </View>
    )
}

export default OrderView;