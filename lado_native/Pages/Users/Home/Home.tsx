import React, { useState } from "react"
import { Text } from "@react-navigation/elements"
import { useNavigation } from "@react-navigation/native";

import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    StatusBar,
    FlatList
} from "react-native";

import HomeHeader from "./HomeHeader";
import { colorSchema } from "../../Helper";

import ItemCard, { FooterOfList } from "../../../Componenet/ItemCard";

import { listOFCategory, listOFRestrount, listOfItem, finalListOfItem } from "./helper";

let Key = 1;

const Home = () => {
    const navigate = useNavigation();
    const width = Dimensions.get("window").width;

    const [vegMode, setVegMode] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<String | null>(null);
    const [searchBusy, setSearchBusy] = useState<boolean>(false);
    const [selectedCategory, setSelectedCatogory] = useState<Number>(0);

    const onCategoryPress = (id: Number) => setSelectedCatogory(id);

    return (
        <View style={style.container}>
            <StatusBar barStyle="light-content" backgroundColor="#FF574A" />
            <ScrollView>
                <HomeHeader
                    vegMode={vegMode}
                    setVegMode={setVegMode}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    searchBusy={searchBusy}
                />
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {listOFCategory.map((item) => {
                        return (
                            <TouchableOpacity onPress={() => onCategoryPress(item.id)} key={`${item.id}${item.name}`}>
                                <View style={{ height: 100, width: 100, borderRadius: 50, flex: 1, alignContent: "center", alignItems: "center" }} key={item.id}>
                                    <Image source={item.image_url} height={undefined} width={undefined} style={{ width: 80, height: 80 }} />
                                    <Text style={selectedCategory === item?.id ? { color: "tomato", textAlign: "center" } : { textAlign: "center", color: "gray" }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <FlatList
                    data={finalListOfItem}
                    renderItem={(props) => <ItemCard {...props} key={`ABCD${Key++}`} />}
                    keyExtractor={(item) => item.id.toString()}
                    ListFooterComponent={FooterOfList}
                    scrollEnabled={true}
                />
            </ScrollView >
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