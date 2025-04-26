import React, { useState } from "react";
import { useWindowDimensions, View, Text, Image } from "react-native";
import { listOfItem } from "./helper";
import { safeText, theme } from "../../helper";
import { ButtonGroup, Button as RneButton } from "@rneui/base";
import Ionicons from '@react-native-vector-icons/ionicons';

const RestrauntItemCard = (props: any) => {
    const { setTotalItem, totalItem } = props;
    const { name, url, price, ladoPrice, itemRatling, mode, offer, description, totalOrderCount } = props?.item;

    // const [totalItem, setTotalItem] = React.useState(0);
    const [selectedItem, setSelectedItem] = useState<object>({});

    const { width, height } = useWindowDimensions();
    const finalCardWidth = width - 10;
    const item = listOfItem[0];




    const onGroupPress = (action: number) => {
        const isAdd = action == 0;
        const isMinus = action === 2;

        if (isAdd) {
            setTotalItem(totalItem + 1);
        } else if (isMinus) {
            setTotalItem(totalItem - 1);
        }
        console.log({ isAdd, isMinus });
    }

    const onFirstAdd = () => {
        setTotalItem(totalItem + 1);
    }


    return (
        <View style={{ marginTop: 10, borderWidth: 0, minHeight: 100, width: finalCardWidth, alignSelf: "center", display: "flex", flexDirection: "row", position: "relative", backgroundColor: theme.background.white, paddingTop: 5, paddingBottom: 5 }}>

            <View style={{ borderWidth: 0, borderColor: "red", width: (finalCardWidth * 65) / 100 }}>
                <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ marginLeft: 10, fontFamily: theme.font.heading.fontFamily, fontSize: 18, color: theme.font.heading.color }}>{safeText(name, 100)}</Text>
                    <Ionicons name="stop-circle-outline" size={20} color={mode === "veg" ? "green" : "red"} style={{ marginLeft: 2, marginBottom: 2 }} />
                </View>
                <Text style={{ fontFamily: theme.font.body.fontFamily, marginLeft: 10, color: "#696969", fontSize: 12 }}>{safeText(description, 100)}</Text>
                <View style={{}}>
                    <View style={{ display: "flex", flexDirection: "row", marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                        <Text style={{ textDecorationLine: "line-through", fontFamily: theme.font.body.fontFamily, color: theme.font.body.color }}>₹{ladoPrice}</Text>
                        <Text style={{ marginLeft: 15, color: theme.background.pimary, fontFamily: theme.font.body.fontFamily, fontWeight: "bold" }}>Get For ₹{price}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}>
                        <View style={{
                            borderRadius: 5,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "green",
                            paddingLeft: 10,
                            paddingRight: 10,
                            height: 28
                        }}>
                            <Text style={{ color: "white", fontFamily: theme.font.body.fontFamily }}>{safeText(`${itemRatling}`)}</Text>
                            <Ionicons name="star" size={10} color={"white"} style={{ marginLeft: 2, marginBottom: 2 }} />
                        </View>
                        <Text style={{ marginLeft: 10, borderWidth: 0, borderColor: "gray", paddingLeft: 10, paddingRight: 10, paddingTop: 3 }}>{totalOrderCount}</Text>
                    </View>
                    {/* <Ionicons name="stop-circle-outline" size={20} color={"green"} style={{ marginLeft: 2, marginBottom: 2 }} /> */}
                    <Text style={{ marginLeft: 10, fontFamily: theme.font.body.fontFamily, color: theme.font.body.color, marginTop: 2 }}>{safeText(offer, 50)}</Text>
                </View>
            </View>

            <View style={{ borderWidth: 0, borderColor: "green", width: (finalCardWidth * 35) / 100, position: "relative" }}>
                <Image
                    source={url}
                    alt="Food Item Images"
                    // loadingIndicatorSource(uri:"")
                    width={undefined}
                    height={undefined}
                    resizeMode="stretch"
                    style={{ width: (finalCardWidth * 35) / 100, height: 150, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
                />

                <View style={{ position: "absolute", bottom: 0, left: 10, width: "85%", height: 45 }}>
                    {totalItem <= 0 && <RneButton title="Add" color={theme.background.pimary} onPress={onFirstAdd} containerStyle={{ marginTop: 5, borderRadius: 5 }} />}
                    {totalItem > 0 && <ButtonGroup
                        selectMultiple={false}
                        disabled={[1]}
                        disabledSelectedStyle={{ backgroundColor: "white" }}
                        disabledSelectedTextStyle={{ color: "black" }}
                        containerStyle={{ marginLeft: 0, height: 40, width: "100%", borderWidth: 1, borderColor: theme.background.pimary, backgroundColor: theme.background.pimary }}
                        selectedButtonStyle={{ backgroundColor: "gray" }}
                        buttons={[
                            <Ionicons name="add-outline" size={28} color={theme.iconColor} />,
                            `${totalItem}`,
                            <Ionicons name="remove-outline" size={28} color={theme.iconColor} />
                        ]}
                        selectedIndexes={[1]}
                        onPress={onGroupPress}
                        activeOpacity={1}
                        underlayColor={"green"}
                    />}
                </View>
            </View>
        </View >
    )
}


export default RestrauntItemCard;