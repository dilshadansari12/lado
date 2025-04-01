import React from "react";

import { Dimensions, View, Image } from "react-native";
import { SearchBar, Switch, Text } from "@rneui/base";
import Ionicons from '@react-native-vector-icons/ionicons';

import { interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";

import { colorSchema } from "../../Helper";
import { useNavigation } from "@react-navigation/native";


const HomeHeader = ({ vegMode, setVegMode, searchValue, setSearchValue, searchBusy }: any) => {

    // const height = Dimensions.get("screen");
    // const mWidth = Dimensions.get("width");
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

    const onSearchChange = (elements: any) => setSearchValue(elements);
    const onModeChange = () => setVegMode(!vegMode);
    const onClearSearch = () => setSearchValue('');
    const onUserPress = () => navigation.navigate("profile");

    return (
        <View style={{ backgroundColor: "#FF574A" }}>
            <View style={{ display: "flex", justifyContent: "space-around", alignContent: "center", alignItems: "center", flexDirection: "row" }}>
                <View style={{ display: "flex", justifyContent: "center", alignContent: "center", width: width - 55 }}>
                    <Text style={{ fontWeight: "bold", color: "black" }}><Ionicons name="location" size={28} color="black" />Home</Text>
                    <Text style={{ marginLeft: 10, color: "gray" }}>near masjid nagar unatri garhwa...</Text>
                </View>
                <Ionicons name="person-circle" size={33} color={"tomato"} onPress={onUserPress} />
            </View>
            <View style={{ display: "flex", justifyContent: "space-around", alignContent: "center", alignItems: "center", flexDirection: "row" }} >
                <SearchBar
                    onChangeText={onSearchChange}
                    value={searchValue}
                    placeholder={"Search Dinner"}
                    searchIcon={<Ionicons name="search" size={22} color={"tomato"} />}
                    clearIcon={<View style={{ borderLeftWidth: 1, paddingLeft: 5, borderLeftColor: "tomato" }}><Ionicons name="close" size={22} color={"tomato"} style={{ zIndex: 9999 }} onPress={onClearSearch} /></View>}
                    lightTheme={true}
                    round={true}
                    showLoading={searchBusy}
                    containerStyle={{ margin: 0, padding: 0, backgroundColor: "white", borderWidth: 1, borderRadius: 10, borderColor: "gray", width: width - 65, marginLeft: 10 }}
                    inputContainerStyle={{ backgroundColor: "white", margin: 0, padding: 0, height: 40 }}
                    inputStyle={{ color: "red" }}
                    style={{ fontSize: 14 }}
                    autoFocus={false}
                // placeholderTextColor="tomato"
                />
                <View>
                    <Text style={{ textAlign: "center", fontSize: 10, fontWeight: "bold" }}>VEG</Text>
                    <Text style={{ textAlign: "center", fontSize: 10, marginTop: -2 }} >MOOD</Text>
                    <Switch value={vegMode} onChange={onModeChange} color={vegMode ? "green" : "white"} style={{ marginTop: -2 }} />
                </View>
            </View>

            <View style={{ marginTop: 5, flex: 1, position: "relative" }}>
                <Carousel
                    ref={ref}
                    width={width}
                    height={width * 0.56}
                    data={allImages}
                    onProgressChange={progress}
                    // scrollAnimationDuration={1000}
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
                    dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                    containerStyle={{ gap: 5, bottom: 12 }}
                    onPress={onPressPagination}
                />
            </View>

        </View>
    )
}

export default HomeHeader;