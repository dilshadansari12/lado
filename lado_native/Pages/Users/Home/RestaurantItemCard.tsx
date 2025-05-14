import React, { useState } from "react";
import { useWindowDimensions, View, Text, Image, StyleSheet } from "react-native";
import { distinctValue, safeText, theme } from "../../helper";
import { ButtonGroup, Button as RneButton } from "@rneui/base";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useCartStore } from "../../../Zustand/Stores/Home.store";

const RestaurantItemCard = (props: any) => {
    const { item, setShowDialog } = props;
    const { name, url, price, ladoPrice, itemRating, mode, offer, description, totalOrderCount, restaurantId, id, qty } = item;
    const { addOrUpdateItem, cart }: any = useCartStore();

    const { width } = useWindowDimensions();
    const finalCardWidth = width - 10;
    const s = styles(finalCardWidth, theme);

    const onPress = (action = null) => {
        const isAdd = action === 0;
        const isMinus = action === 2;
        if (Object.keys(cart).length > 2 && `${restaurantId}` === Object.keys(cart)[2]) {
            setShowDialog(true);
        } else {
            addOrUpdateItem({ restaurantId, item: { ...item, qty: action != null ? isAdd ? qty + 1 : qty - 1 : qty + 1 } })
        }
    }

    return (
        <View style={s.container}>
            <View style={s.leftSection}>
                <View style={s.nameRow}>
                    <Text style={s.nameText}>{safeText(name, 100)}</Text>
                    <Ionicons name="stop-circle-outline" size={20} color={mode === "veg" ? "green" : "red"} />
                </View>
                <Text style={s.description}>{safeText(description, 100)}</Text>

                <View>
                    <View style={s.priceRow}>
                        <Text style={s.originalPrice}>₹{ladoPrice}</Text>
                        <Text style={s.finalPrice}>Get For ₹{price}</Text>
                    </View>

                    <View style={s.ratingRow}>
                        <View style={s.ratingBox}>
                            <Text style={s.ratingText}>{safeText(`${itemRating}`)}</Text>
                            <Ionicons name="star" size={10} color={"white"} style={{ marginLeft: 2, marginBottom: 2 }} />
                        </View>
                        <Text style={s.orderCount}>{totalOrderCount}</Text>
                    </View>

                    <Text style={s.offerText}>{safeText(offer, 50)}</Text>
                </View>
            </View>

            <View style={s.rightSection}>
                <Image source={url} alt="Food Item Images" resizeMode="stretch" style={s.image} />
                <View style={s.buttonContainer}>
                    {qty <= 0 && (
                        <RneButton title="Add" color={theme.background.pimary} onPress={() => onPress(null)} containerStyle={{ marginTop: 5, borderRadius: 5 }} />
                    )}
                    {qty > 0 && (
                        <ButtonGroup
                            selectMultiple={false}
                            disabled={[1]}
                            disabledSelectedStyle={{ backgroundColor: "white" }}
                            disabledSelectedTextStyle={{ color: "black" }}
                            containerStyle={{
                                marginLeft: 0,
                                height: 40,
                                width: "100%",
                                borderWidth: 1,
                                borderColor: theme.background.pimary,
                                backgroundColor: theme.background.pimary,
                            }}
                            selectedButtonStyle={{ backgroundColor: "gray" }}
                            buttons={[
                                <Ionicons name="add-outline" size={28} color={theme.iconColor} />,
                                `${qty}`,
                                <Ionicons name="remove-outline" size={28} color={theme.iconColor} />,
                            ]}
                            selectedIndexes={[1]}
                            onPress={onPress}
                            activeOpacity={1}
                            underlayColor={"green"}
                        />
                    )}
                </View>
            </View>
        </View>
    )
}


export const styles = (finalCardWidth: number, theme: any) =>
    StyleSheet.create({
        container: {
            marginTop: 10,
            borderWidth: 0,
            minHeight: 100,
            width: finalCardWidth,
            alignSelf: "center",
            display: "flex",
            flexDirection: "row",
            position: "relative",
            backgroundColor: theme.background.white,
            paddingTop: 5,
            paddingBottom: 5,
        },
        leftSection: {
            borderWidth: 0,
            borderColor: "red",
            width: (finalCardWidth * 65) / 100,
        },
        nameRow: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
        },
        nameText: {
            marginLeft: 10,
            fontFamily: theme.font.heading.fontFamily,
            fontSize: 18,
            color: theme.font.heading.color,
        },
        description: {
            fontFamily: theme.font.body.fontFamily,
            marginLeft: 10,
            color: "#696969",
            fontSize: 12,
        },
        priceRow: {
            display: "flex",
            flexDirection: "row",
            marginLeft: 10,
            marginTop: 5,
            marginBottom: 5,
        },
        originalPrice: {
            textDecorationLine: "line-through",
            fontFamily: theme.font.body.fontFamily,
            color: theme.font.body.color,
        },
        finalPrice: {
            marginLeft: 15,
            color: theme.background.pimary,
            fontFamily: theme.font.body.fontFamily,
            fontWeight: "bold",
        },
        ratingRow: {
            display: "flex",
            flexDirection: "row",
            marginLeft: 10,
        },
        ratingBox: {
            borderRadius: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
            paddingLeft: 10,
            paddingRight: 10,
            height: 28,
        },
        ratingText: {
            color: "white",
            fontFamily: theme.font.body.fontFamily,
        },
        orderCount: {
            marginLeft: 10,
            borderWidth: 0,
            borderColor: "gray",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
        },
        offerText: {
            marginLeft: 10,
            fontFamily: theme.font.body.fontFamily,
            color: theme.font.body.color,
            marginTop: 2,
        },
        rightSection: {
            borderWidth: 0,
            borderColor: "green",
            width: (finalCardWidth * 35) / 100,
            position: "relative",
        },
        image: {
            width: (finalCardWidth * 35) / 100,
            height: 150,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
        },
        buttonContainer: {
            position: "absolute",
            bottom: 0,
            left: 10,
            width: "85%",
            height: 45,
        },
    })


export default RestaurantItemCard;