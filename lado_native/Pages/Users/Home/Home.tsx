import React from "react"
import { Text } from "@react-navigation/elements"
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@react-native-vector-icons/ionicons';



const Home = () => {
    const navigate = useNavigation();
    return (
        <View>
            <Text>Home screen</Text>
            <Button title="Order View" onPress={() => { (navigate as any).navigate("orderView") }} />
        </View>
    )
}

export default Home; 