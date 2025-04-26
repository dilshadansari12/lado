import React, { useEffect, useRef, useState } from "react";
import { CardLoader, GoToTop } from "../../../Componenet/ComponentHelper";
import { listOfItem, listOFRestrount } from "./helper";
import { Dimensions, View, Text, StatusBar, Easing } from "react-native";
import { FlashList } from "@shopify/flash-list";
import RestrauntItemCard from "./RestrauntItemCard";
import GoToCart from "../../../Componenet/GoToCart";
import { Card, Image, SearchBar } from "@rneui/base";
import { safeText, theme } from "../../helper";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";



const RestrauntView = ({ route }: any) => {
    const listRef = useRef(null);
    const { restrauntId } = route?.params;
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;
    const navigation = useNavigation();


    const [showGoToTop, setShowGoToTop] = useState<boolean>(false);
    const [isRenderingLag, setIsRenderingLag] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [totalItem, setTotalItem] = React.useState(0); //TODO: make seprate state in Restraunt Card
    const [searchValue, setSearchValue] = React.useState<string>('');

    const restraunt = listOFRestrount.find(e => e?.id === restrauntId);
    const allRestrauntItems = listOfItem.filter((e) => e?.restrauntId === restrauntId);
    const final = [...allRestrauntItems, ...allRestrauntItems, ...allRestrauntItems, ...allRestrauntItems, ...allRestrauntItems, ...allRestrauntItems, ...allRestrauntItems, ...allRestrauntItems, ...allRestrauntItems, ...allRestrauntItems]

    const goBack = () => navigation.goBack();
    const searchIconClick = () => setShowSearch(true);
    const onSearchChange = () => { }
    const onClearSearch = () => setShowSearch(false);

    const isRestrauntImageIsAvailable = true;
    const searchBusy = true;

    const ListHeaderComponent = () => {
        return (
            <View style={{ position: "relative", minHeight: 200, width: "100%" }}>
                {isRestrauntImageIsAvailable && <Image
                    source={require("../../../assets/hotel.jpg")}
                    alt="Food Item Images"
                    // loadingIndicatorSource(uri:"")
                    width={undefined}
                    height={undefined}
                    resizeMode="stretch"
                    style={{ width: "100%", borderBottomLeftRadius: 5, height: 400, borderBottomRightRadius: 5 }}
                />}
                <View style={{ position: "absolute", top: 10, width: "90%", display: "flex", justifyContent: "space-between", flexDirection: "row", alignSelf: "center", marginTop: 20 }}>
                    <Ionicons name="chevron-back-outline" size={26} color={theme.background.pimary} style={{ backgroundColor: theme.background.white, borderRadius: 50, padding: 10, zIndex: 999 }} onPress={goBack} />
                    {!showSearch && <Ionicons name="search-outline" size={26} color={theme.background.pimary} style={{ backgroundColor: theme.background.white, borderRadius: 50, padding: 10, zIndex: 999 }} onPress={searchIconClick} />}
                    {showSearch && <SearchBar
                        onChangeText={onSearchChange}
                        value={searchValue}
                        placeholder={"Search Dinner"}
                        searchIcon={<Ionicons name="search" size={22} color={theme.tabIconColor} />}
                        clearIcon={<View style={{
                            borderLeftWidth: 1,
                            paddingLeft: 5,
                            borderLeftColor: theme.tabIconColor
                        }}>
                            <Ionicons name="close" size={22} color={theme.tabIconColor} style={{ zIndex: 9999 }} onPress={onClearSearch} /></View>}
                        lightTheme={true}
                        round={true}
                        showLoading={searchBusy}
                        loadingProps={{ color: theme.tabIconColor }}
                        containerStyle={{
                            width: "85%",
                            margin: 0,
                            padding: 0,
                            backgroundColor: "white",
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: "gray",
                            marginLeft: 10,
                            zIndex: 999
                        }}
                        inputContainerStyle={{
                            backgroundColor: "white",
                            margin: 0,
                            padding: 0,
                            height: 40
                        }}
                        inputStyle={{ color: theme.textInput }}
                        style={{ fontSize: 14 }}
                        autoFocus={false}
                    />}
                </View>

                <LinearGradient
                    colors={['#512DA8', 'rgba(106, 27, 154, 0)']} // dark transparent -> blue -> white
                    start={{ x: 0.5, y: 1 }}  // Bottom center
                    end={{ x: 0.5, y: 0 }}    // Top center
                    style={{
                        flex: 1,
                        justifyContent: !isRestrauntImageIsAvailable ? 'flex-end' : "center",
                        alignItems: isRestrauntImageIsAvailable ? "center" : "flex-end",
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: 300,
                    }}
                >
                    <View style={{ width: "90%", alignSelf: "center" }}>
                        <Text style={{
                            color: "white",
                            fontSize: 24,
                            fontFamily: theme.font.body.fontFamily,
                            fontWeight: 'bold',
                            textAlign: "center"
                        }}>{restraunt?.name}</Text>
                        <View style={{ display: "flex", flexDirection: "row", marginLeft: 10, justifyContent: "center", marginTop: 15 }}>

                            <View style={{
                                borderRadius: 5,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: theme.background.white,
                                paddingLeft: 10,
                                paddingRight: 10,
                                height: 28
                            }}>
                                <Ionicons name="stopwatch-outline" size={20} color={"black"} style={{ marginRight: 2, marginBottom: 2 }} />
                                <Text style={{ color: "black", fontFamily: theme.font.body.fontFamily }}>{safeText(`${restraunt?.averageDeliveryTime}`)}</Text>
                            </View>

                            <View style={{
                                borderRadius: 5,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "green",
                                paddingLeft: 10,
                                paddingRight: 10,
                                height: 28,
                                marginLeft: 20
                            }}>
                                <Text style={{ color: "white", fontFamily: theme.font.body.fontFamily }}>{safeText(`${restraunt?.rating}`)}</Text>
                                <Ionicons name="star" size={10} color={"white"} style={{ marginLeft: 2, marginBottom: 2 }} />
                            </View>

                            <View style={{
                                borderRadius: 5,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: theme.background.white,
                                paddingLeft: 10,
                                paddingRight: 10,
                                height: 28,
                                marginLeft: 20
                            }}>
                                <Ionicons name="location-outline" size={20} color={"black"} style={{ marginRight: 2, marginBottom: 2 }} />
                                <Text style={{ color: "black", fontFamily: theme.font.body.fontFamily }}>{safeText(`${restraunt?.distance}`)}</Text>
                            </View>
                        </View>
                        <Text style={{ textAlign: "center", marginTop: 15, fontFamily: theme.font.body.fontFamily, marginLeft: 10, color: "white", fontSize: 12 }}>
                            {safeText(restraunt?.location, 80)}
                        </Text>
                    </View>
                </LinearGradient>
            </View >
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {/* //TODO: show status/hide staus bar and hide on the bases of scroll at the same time show a to header; */}
            <StatusBar barStyle="light-content" hidden={true} />
            <FlashList
                ref={listRef}
                data={final || []}
                renderItem={(props) => <RestrauntItemCard {...props} totalItem={totalItem} setTotalItem={setTotalItem} />}
                keyExtractor={(item, index) => index.toString()} //TODO:change by itemId
                ListHeaderComponent={ListHeaderComponent}
                // ListFooterComponent={FooterOfList}
                scrollEnabled={true}
                estimatedItemSize={10}
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
            {totalItem > 0 && <GoToCart totalItem={totalItem} />}
        </View>
    )
}

export default RestrauntView;