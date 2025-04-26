import React, { useRef, useState } from "react"
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

import {
    Dimensions,
    StyleSheet,
    View,
    StatusBar,
    FlatList,
    Pressable
} from "react-native";

import HomeHeader from "./HomeHeader";
import { theme } from "../../helper";
import LadoLoader from "../../../Componenet/LadoLoader";
import { listOFCategory, finalListOfItem } from "./helper";
import { CardLoader, Category, CategoryFilter, FooterOfList, GoToTop } from "../../../Componenet/ComponentHelper";
import RestrauntCard from "./RestrauntCard";


const Home = () => {
    const listRef = useRef(null);

    const navigate = useNavigation();
    // const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;

    const [vegMode, setVegMode] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<String | null>(null);
    const [searchBusy, setSearchBusy] = useState<boolean>(false);
    const [selectedCategory, setSelectedCatogory] = useState<any>([]);
    const [isRenderingLag, setIsRenderingLag] = useState<boolean>(false);
    const [showGoToTop, setShowGoToTop] = useState<boolean>(false);

    const onCategoryAdd = (id: any) => setSelectedCatogory((prev: any) => {
        if (!prev.includes(id)) {
            return [...prev, id];
        } else {
            return [...prev];
        }
    });

    const onCategoryRemove = (id: any) => setSelectedCatogory((prev: any) => {
        const newList = prev.filter(e => e != id);
        return [...newList];
    })

    const onRestrauntCardClick = (id: Number) => (navigate as any).navigate("restrauntView", { restrauntId: id });
    const onSearchChange = (e: any) => setSearchValue(e);

    let loading = false;

    const ListHeaderComponent = React.useMemo(() => {
        return (
            <View>
                <HomeHeader
                    vegMode={vegMode}
                    setVegMode={setVegMode}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    searchBusy={searchBusy}
                    onSearchChange={onSearchChange}
                />

                <FlatList
                    data={listOFCategory}
                    horizontal
                    renderItem={({ item }) => <Category item={item} onCategoryAdd={onCategoryAdd} selectedCategory={selectedCategory} />}
                    extraData={selectedCategory}
                    keyExtractor={(item, index) => index?.toString()}
                    scrollEnabled={true}
                />

                <FlatList
                    data={selectedCategory}
                    horizontal
                    renderItem={({ item }) => <CategoryFilter id={item} onCategoryRemove={onCategoryRemove} />}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={true}
                />
            </View>
        )
    }, [searchValue, setSearchValue, vegMode, setVegMode, searchBusy, selectedCategory]);


    if (loading) {
        return <LadoLoader /> //TODO: hide footer when loading is true
    }

    return (
        <View style={style.container} renderToHardwareTextureAndroid={true}>
            <StatusBar barStyle="light-content" backgroundColor="#6A1B9A" />
            <FlashList
                ref={listRef}
                data={finalListOfItem}
                renderItem={(props) => <Pressable onPress={() => onRestrauntCardClick(props?.item?.id)}><RestrauntCard {...props} /></Pressable>}
                keyExtractor={(item, index) => index.toString()} //TODO:change by itemId 
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={FooterOfList}
                scrollEnabled={true}
                estimatedItemSize={1200}
                onScrollBeginDrag={() => console.log("started scrolling")}//TODO: handle in context api and hide bottom when user scrolling
                onMomentumScrollEnd={() => console.log("end scrolling")}
                onScroll={(event) => {
                    const offsetY = event.nativeEvent.contentOffset.y;
                    setShowGoToTop(offsetY > height ? true : false);
                }}
                onBlankArea={({ blankArea }) => {
                    if (blankArea > 1) {
                        setIsRenderingLag(true);
                    } else {
                        setIsRenderingLag(false);
                    }
                }}
            />
            {isRenderingLag && <CardLoader />}
            {!isRenderingLag && showGoToTop && <GoToTop ref={listRef} />}
        </View>
    )
}

export default Home;

const style = StyleSheet.create({
    container: {
        backgroundColor: theme.background.white,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    }
})