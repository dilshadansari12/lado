import React from "react";
import { Dimensions, Image, Text, View } from "react-native"
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
const ItemCard = ({ imageList, ...props }: any) => {
    const { name, mode, location, restrountOffer, restrountRating, distance, averageDeliveryTime, description } = props;
    const width = Dimensions.get("window").width;

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
    // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    return (
        <View style={{
            height: 330, marginTop: 10, marginBottom: 10, width: width - 25, alignSelf: "center", borderColor: "gray",
            boxShadow: "0 29 7 0 rgba(100, 100, 111, 0.2)"
        }}>
            <View style={{ height: 250, borderColor: "green" }}>
                <Carousel
                    ref={ref}
                    width={width}
                    height={width * 0.56}
                    data={imageList}
                    onProgressChange={progress}
                    // scrollAnimationDuration={1000}
                    // autoPlay={true}
                    // loop={true}
                    renderItem={({ item }: any) => (
                        <View
                            style={{
                                flex: 1,
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
                                resizeMode="cover"
                                style={{ width: width - 25, height: width * 0.56, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, padding: 0, margin: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            />
                        </View>
                    )}
                />

                <Pagination.Basic
                    progress={progress}
                    data={imageList}
                    dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                    containerStyle={{ gap: 5, bottom: 12 }}
                    onPress={onPressPagination}
                />
            </View>
            <View style={{ borderColor: "red", position: "relative", backgroundColor: "white", marginRight: 5 }}>
                <View style={{ width: 140, padding: 2, paddingLeft: 10, paddingRight: 10, backgroundColor: "white", position: "absolute", top: -30, display: "flex", flexDirection: "row", justifyContent: "space-evenly", borderEndEndRadius: 0, borderTopEndRadius: 50 }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Ionicons name="stopwatch" size={18} color={"gray"} />
                        <Text style={{ alignSelf: "center", fontSize: 12, color: "gray" }}>{averageDeliveryTime} : </Text>
                    </View>
                    <Text style={{ alignSelf: "center", fontSize: 12, color: "gray" }}>{distance}</Text>
                </View>
                <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", marginLeft: 5 }}>
                    <Text style={{ fontSize: 22, fontWeight: "600" }}>{name}</Text>
                    <View style={{ borderRadius: 5, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "green", paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{ color: "white" }}>{restrountRating}</Text>
                        <Ionicons name="star" size={12} color={"white"} style={{ marginLeft: 2 }} />
                    </View>
                </View>
                <View style={{ marginLeft: 5, marginTop: 5, borderStyle: "dashed", borderTopColor: "gray", borderTopWidth: 1, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={{ marginTop: 10, display: "flex", flexDirection: "row" }}>
                        <Ionicons name="ribbon" size={18} color={"sky"} style={{ marginRight: 5 }} />
                        <Text>{restrountOffer}</Text>
                    </View>
                    <ModeBage mode={mode} />
                </View>
            </View>
        </View >
    )
}

export default ItemCard;