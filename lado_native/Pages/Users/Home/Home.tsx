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

//local import
import HomeHeader from "./HomeHeader";
import { theme } from "../../helper";
import LadoLoader from "../../../Component/LadoLoader";
import { listOFCategory, finalListOfItem, finalList } from "./helper";
import RestaurantCard from "./RestaurantCard";
import { CardLoader, GoToTop } from "../../../Component/ComponentHelper";
import Category from "../../../Component/Category";
import SelectedCategory from "../../../Component/SelectedCategory";
import RestaurantFooter from "../../../Component/RestaurantFooter";

const Home = () => {
    let loading = false;
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

    const onRestaurantCardClick = (id: Number) => (navigate as any).navigate("restaurantView", { restaurantId: id });

    const onSubmite = () => {
        console.log("submite button clicked", { searchValue, vegMode });
        setSearchBusy(true);

    }

    const ListHeaderComponent = React.useMemo(() => {
        return (
            <View>
                <HomeHeader
                    vegMode={vegMode}
                    setVegMode={setVegMode}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    searchBusy={searchBusy}
                    onSubmite={onSubmite}
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
                    renderItem={({ item }) => <SelectedCategory id={item} onCategoryRemove={onCategoryRemove} />}
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
                data={finalList}
                renderItem={(props) => <Pressable onPress={() => onRestaurantCardClick(props?.item?.id)}><RestaurantCard {...props} /></Pressable>}
                keyExtractor={(item, index) => index.toString()} //TODO:change by itemId 
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={RestaurantFooter}
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


/*
    👉 pendding work need to do
    
    1️⃣ handle search and ved mode; ✅
    * enhance footer message ✅
    * enhance the search input must be look good ui
    
*/