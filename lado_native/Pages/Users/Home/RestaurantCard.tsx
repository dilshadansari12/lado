import { Image } from "@rneui/base";
import React, { useCallback, useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { safeText, theme } from "../../helper";
import { ModeBage } from "../../../Component/ComponentHelper";
import Ionicons from '@react-native-vector-icons/ionicons';


const RestaurantCard = React.memo(({ ...props }: any) => {

    const { name, mode, restaurantOffer, rating, distance, averageDeliveryTime, homeBanner } = props?.item;
    const imageList: [] = useMemo(() => homeBanner || [], [homeBanner]);

    const width = Dimensions.get("window").width;

    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        'worklet';
        runOnJS(scrollToIndex)(index);
    };

    const scrollToIndex = useCallback((index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    }, []);

    // restaurants
    return (
        <View style={[style.container, { width: width - 20 }]} >
            <View style={{ height: 250 }}>
                <Carousel
                    ref={ref}
                    width={width}
                    height={width * 0.56}
                    data={imageList}
                    onProgressChange={progress}
                    renderItem={({ item }: any) => (
                        <View style={{ flex: 1, justifyContent: "center", width: width }}>
                            <Image
                                source={item?.url}
                                alt="Food Item Images"
                                width={undefined}
                                height={undefined}
                                resizeMode="cover"
                                style={[style.imageStyle, { width: width - 25, height: width * 0.56 }]}
                            />
                        </View>
                    )}
                />

                <Pagination.Basic
                    progress={progress}
                    data={imageList}
                    dotStyle={{ backgroundColor: "white", borderRadius: 50 }}
                    containerStyle={{ gap: 5, bottom: 12 }}
                    onPress={onPressPagination}
                />
            </View>

            <View style={style.cardFooterStyle}>

                <View style={style.footerHeadeStyle}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Ionicons name="stopwatch" size={18} color={theme.tabIconColor} />
                        <Text style={{ alignSelf: "center", fontSize: 12, color: "gray", fontFamily: theme.font.body.fontFamily }}>{safeText(averageDeliveryTime)} : </Text>
                    </View>
                    <Text style={{ alignSelf: "center", fontSize: 12, color: "gray", fontFamily: theme.font.body.fontFamily }}>{safeText(distance)}</Text>
                </View>

                <View style={style.footerFirstchild}>
                    <Text style={{ fontFamily: theme.font.heading.fontFamily, fontSize: theme.font.heading.fontSize }}>{safeText(name, 30)}</Text>
                    <View style={style.rating}>
                        <Text style={{ color: "white", fontFamily: theme.font.body.fontFamily }}>{safeText(rating)}</Text>
                        <Ionicons name="star" size={10} color={"white"} style={{ marginLeft: 2, marginBottom: 2 }} />
                    </View>
                </View>

                <View style={style.offerSection}>
                    <View style={style.offerSectionFirstchild}>
                        <Ionicons name="ribbon" size={18} color={theme.tabIconColor} style={{ marginRight: 5 }} />
                        <Text style={{ fontFamily: theme.font.body.fontFamily }}>{safeText(restaurantOffer, 30)}</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <ModeBage mode={mode} />
                    </View>
                </View>
            </View>
        </View >
    )
});


// styling
const style = StyleSheet.create({
    container: {
        height: 330,
        marginTop: 10,
        marginBottom: 10,
        // width: width - 25,
        alignSelf: "center",
        borderColor: "gray",
        boxShadow: "0 8 7 0 rgba(100, 100, 111, 0.2)",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    imageStyle: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 0,
        margin: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    cardFooterStyle: {
        borderColor: "red",
        position: "relative",
        backgroundColor: "white",
        marginRight: 5
    },
    footerHeadeStyle: {
        width: 140,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "white",
        position: "absolute",
        top: -30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderEndEndRadius: 0,
        borderTopEndRadius: 50
    },
    offerSection: {
        marginLeft: 5,
        marginTop: 5,
        borderStyle: "dashed",
        borderTopColor: "gray",
        borderTopWidth: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    offerSectionFirstchild: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row"
    },
    footerFirstchild: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginLeft: 5
    },
    rating: {
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        paddingLeft: 10,
        paddingRight: 10,
        height: 28
    },
    CategoryContainer: {
        // height: 80,
        // width: 70,
        borderRadius: 50,
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    categoryFilterContainer: {
        marginLeft: 8,
        marginRight: 3,
        marginBottom: 10,
        borderWidth: 0.3,
        minHeight: 30,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignSelf: "center",
        paddingTop: 5,
        paddingLeft: 5,
        borderRadius: 5
    }
});

export default RestaurantCard;