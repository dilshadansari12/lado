import React from "react";

import { Dimensions, View, Image, StyleSheet } from "react-native";
import { color, SearchBar, Switch, Text } from "@rneui/base";
import Ionicons from '@react-native-vector-icons/ionicons';

import { interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";

import { colorSchema, safeText, theme } from "../../helper";
import { useNavigation } from "@react-navigation/native";


const HomeHeader = ({ vegMode, setVegMode, searchValue, setSearchValue, searchBusy }: any) => {

    const width = Dimensions.get("window").width;
    const navigation = useNavigation();

    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        'worklet';
        runOnJS(scrollToIndex)(index);
    };

    const scrollToIndex = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    const allImages: any = [
        { id: 1, url: require("../../../assets/foodbg1.png") },
        { id: 2, url: require("../../../assets/foodbg2.png") },
        { id: 3, url: require("../../../assets/foodbg3.png") },
        { id: 4, url: require("../../../assets/foodbg4.png") },
        { id: 5, url: require("../../../assets/foodbg5.png") },
        { id: 6, url: require("../../../assets/foodbg6.png") },
        { id: 7, url: require("../../../assets/foodbg7.png") },
        { id: 8, url: require("../../../assets/foodbg8.png") }
    ]

    const onSearchChange = (e: any) => setSearchValue(e);
    const onModeChange = () => setVegMode(!vegMode);
    const onClearSearch = () => setSearchValue('');
    const onUserPress = () => (navigation as any).navigate("profile");

    return (
        <View style={style.container}>

            <View style={style.headerContainer}>
                <View style={[style.locationContainer, { width: width - 55 }]}>
                    <Text style={style.homeText}><Ionicons name="location" size={28} color={theme.iconColor} />Home</Text>
                    <Text style={style.address}>{safeText("near masjid nagar untari", 20)}</Text>
                </View>
                <Ionicons name="person-circle" size={33} color={theme.iconColor} onPress={onUserPress} />
            </View>

            <View style={style.searchContainer} >
                <SearchBar
                    onChangeText={onSearchChange}
                    value={searchValue}
                    placeholder={"Search Dinner"}
                    searchIcon={<Ionicons name="search" size={22} color={theme.tabIconColor} />}
                    clearIcon={<View style={style.clearIcon}><Ionicons name="close" size={22} color={theme.tabIconColor} style={{ zIndex: 9999 }} onPress={onClearSearch} /></View>}
                    lightTheme={true}
                    round={true}
                    showLoading={searchBusy}
                    loadingProps={{ color: theme.tabIconColor }}
                    containerStyle={[style.searchBoxContainer, { width: width - 65, }]}
                    inputContainerStyle={style.inputContainerStyle}
                    inputStyle={{ color: theme.textInput }}
                    style={{ fontSize: 14 }}
                    autoFocus={false}
                />

                <View>
                    <Text style={style.veg}>VEG</Text>
                    <Text style={style.nonVeg} >MOOD</Text>
                    <Switch value={vegMode} onChange={onModeChange} color={vegMode ? "green" : "white"} style={{ marginTop: -2 }} />
                </View>
            </View>

            <View style={style.carosalContainer}>
                <Carousel
                    ref={ref}
                    width={width}
                    height={width * 0.56}
                    data={allImages}
                    onProgressChange={progress}
                    autoPlay={true}
                    loop={true}
                    renderItem={({ item }: any) => (
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                justifyContent: "center",
                                width: width
                            }}
                        >
                            <Image
                                source={item?.url}
                                alt="Food Item Images"
                                // loadingIndicatorSource(uri:"")
                                width={undefined}
                                height={undefined}
                                resizeMode="stretch"
                                style={{ width: width, height: width * 0.56, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
                            />
                        </View>
                    )}
                />

                <Pagination.Basic
                    progress={progress}
                    data={allImages}
                    dotStyle={{ backgroundColor: "#262626", borderRadius: 50 }}
                    containerStyle={{ gap: 5, position: "absolute", bottom: 3 }}
                    onPress={onPressPagination}
                    activeDotStyle={{ backgroundColor: "#f1f1f1" }}
                />
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: theme.background.pimary,
        position: "relative"
    },
    headerContainer: {
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    locationContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },
    homeText: {
        fontWeight: "700",
        color: theme.iconColor,
        fontFamily: (theme.font.heading.fontFamily as any)
    },
    address: {
        marginLeft: 10,
        color: "white",
        fontFamily: (theme.font.heading.fontFamily as any)
    },
    searchContainer: {
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    searchBoxContainer: {
        margin: 0,
        padding: 0,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "gray",
        marginLeft: 10
    },
    inputContainerStyle: {
        backgroundColor: "white",
        margin: 0,
        padding: 0,
        height: 40
    },
    clearIcon: {
        borderLeftWidth: 1,
        paddingLeft: 5,
        borderLeftColor: theme.tabIconColor
    },
    veg: {
        textAlign: "center",
        fontSize: 10,
        fontFamily: (theme.font.highlight.fontFamily as any),
        color: theme.iconColor,
        fontWeight: "bold"
    },
    nonVeg: {
        textAlign: "center",
        fontSize: 10,
        marginTop: -2,
        fontFamily: (theme.font.highlight.fontFamily as any),
        color: theme.iconColor,
    },
    carosalContainer: {
        marginTop: 5,
        flex: 1,
        position: "relative"
    }
})

export default HomeHeader;