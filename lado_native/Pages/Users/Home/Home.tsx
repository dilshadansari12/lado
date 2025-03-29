import React from "react"
import { Text } from "@react-navigation/elements"
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colorSchema } from "../../Helper";
import HomeHeader from "./HomeHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "react-native";


const Home = () => {
    const navigate = useNavigation();

    return (
        <View style={style.container}>
            <StatusBar barStyle="light-content" backgroundColor="#daebde" />
            <ScrollView>
                <HomeHeader />
            </ScrollView>
        </View >
    )
}

export default Home;

const style = StyleSheet.create({
    container: {
        backgroundColor: colorSchema?.background,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    }
})