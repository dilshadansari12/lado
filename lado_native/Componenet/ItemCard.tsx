import React, { useCallback } from "react";

import { Dimensions, Image, Text, View, StyleSheet } from "react-native"
import { runOnJS, useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";

import Ionicons from '@react-native-vector-icons/ionicons';

const vegCss = { backgroundColor: "green", paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: "white", marginRight: 5, borderRadius: 5 };
const nonVegCss = { backgroundColor: "tomato", paddingLeft: 10, paddingRight: 10, color: "white", paddingTop: 5, paddingBottom: 5, borderRadius: 5 };

const ModeBage = ({ mode }: any) => {
    if (mode === null || mode === '' || mode === undefined) return <Text>N/A</Text>
    const modeList = mode?.split(",")?.filter(e => e != '');

    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
            {modeList.map((e: any, idx: number) => <Text key={idx} style={e === "veg" ? vegCss : nonVegCss} >{e}</Text>)}
        </View >
    )
}
// restaurants
const ItemCard = React.memo(({ ...props }: any) => {
    const { name, mode, location, restrountOffer, restrountRating, distance, averageDeliveryTime, description, homeBanner, key } = props?.item;
    const imageList: [] = homeBanner;

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

    return (
        <View style={[style.container, { width: width - 20 }]} key={key}>
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
                        <Ionicons name="stopwatch" size={18} color={"gray"} />
                        <Text style={{ alignSelf: "center", fontSize: 12, color: "gray" }}>{averageDeliveryTime} : </Text>
                    </View>
                    <Text style={{ alignSelf: "center", fontSize: 12, color: "gray" }}>{distance}</Text>
                </View>

                <View style={style.footerFirstchild}>
                    <Text style={{ fontSize: 22, fontWeight: "600" }}>{name}</Text>
                    <View style={style.rating}>
                        <Text style={{ color: "white" }}>{restrountRating}</Text>
                        <Ionicons name="star" size={12} color={"white"} style={{ marginLeft: 2 }} />
                    </View>
                </View>

                <View style={style.offerSection}>
                    <View style={style.offerSectionFirstchild}>
                        <Ionicons name="ribbon" size={18} color={"sky"} style={{ marginRight: 5 }} />
                        <Text>{restrountOffer}</Text>
                    </View>
                    <ModeBage mode={mode} />
                </View>
            </View>
        </View >
    )
});

export default ItemCard;

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
        flexDirection: "row"
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
        paddingRight: 10
    }

})


export const FooterOfList = () => {
    return (
        <View style={{ alignSelf: "center", marginTop: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 22, color: "gray", lineHeight: 30 }} >didn't find what you are looking for</Text>
            <Text style={{ fontSize: 22, color: "gray", lineHeight: 30 }} >Suggest something & we'll look in to it.</Text>
            <Text style={{ fontSize: 22, color: "gray", textAlign: "center" }} >lado@gmail.com 😒</Text>
        </View>
    )
}
