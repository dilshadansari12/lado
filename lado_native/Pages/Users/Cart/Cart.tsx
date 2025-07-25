import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View, Button } from "react-native"

//library
import LottieView from "lottie-react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@react-native-vector-icons/ionicons';

//local
import { distinctValue, safeText, theme } from "../../helper";
import SnacksCard from "../../../Component/SnacksCard";
import { listOfItem, snacksAndDrinks, user } from "../Home/helper";
import SelectedItemCard from "../../../Component/SelectedItemCard";
import CardBottomSheet from "../../../Component/CardBottomSheet";
import { useCartStore, useStore } from "../../../Zustand/Stores/Home.store";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Cart = () => {
    const { location, name, phoneNo } = user;

    const navigation = useNavigation();
    const { cart }: any = useCartStore();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [bottomSheetType, setBottomSheetType] = useState<string>("");

    const onAddMoreItem = (id: number) => {
        console.log("hii", { id });
        (navigation as any).navigate("restaurantView", { restaurantId: id });
    }

    const avgDeliveryTime = "40-45 mins";

    const onInfoClick = (type: string) => {
        console.log("hii" + " " + " - " + type);
        setBottomSheetType(type);
        bottomSheetRef.current?.expand();

    }

    const onPlaceOrderPress = () => {
        console.log("hii");
    }

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const onClose = () => {
        bottomSheetRef.current?.close();
    }

    const restaunratKeys = distinctValue(Object.values(cart).flatMap((e: any) => e?.restaurantItems.map((e: any) => ({ restaurantId: e?.restaurantId, qty: e?.qty }))).filter((e) => e?.qty > 0).map((e) => e?.restaurantId)) || [];
    return (
        <View style={styles.container}>
            <ScrollView>
                <StatusBar barStyle="light-content" hidden={false} />
                {restaunratKeys.map((key, idx) => {
                    const restaunrat = cart[key];
                    const restaurantSelectedItem = restaunrat?.restaurantItems.filter((e) => e?.qty > 0) || [];
                    const totalAmount = restaurantSelectedItem.reduce((acc, curr) => acc + curr?.price * curr?.qty, 0) || 0;
                    const totalAmoutOfSnacks = restaunrat?.snacksAndDrinks?.filter((e => e?.qty > 0)).reduce((acc, curr) => acc + curr?.price * curr?.qty, 0) || 0;

                    return (
                        <View key={idx} >
                            <Text style={styles.restaurantName}>{safeText(restaunrat?.name, 40)}</Text>
                            <View style={styles.wrapper}>
                                {restaurantSelectedItem.map((item: any, idx: number) => (
                                    <SelectedItemCard item={item} key={idx} />
                                ))}

                                <Pressable
                                    onPress={() => onAddMoreItem(restaunrat?.id)}
                                    style={({ pressed }) => [
                                        styles.addMoreButton,
                                        { borderColor: pressed ? "#696969" : theme.background.pimary }
                                    ]}
                                >
                                    <Ionicons name="add-outline" size={18} color={"#696969"} />
                                    <Text style={styles.textSmall}>Add more item</Text>
                                </Pressable>

                                <View style={styles.cartHeader}>
                                    <View style={styles.cartHeaderLeft}>
                                        <LottieView
                                            source={require('../../../assets/cart.json')}
                                            autoPlay
                                            loop={true}
                                            style={styles.cartIcon}
                                        />
                                        <Text style={styles.cartText}>Cart Item</Text>
                                    </View>
                                    <Text style={[styles.cartText, { marginRight: 10 }]}>Total ₹{totalAmount}</Text>
                                </View>
                            </View>

                            <View style={styles.snackContainer}>
                                <ScrollView nestedScrollEnabled={true}>
                                    {restaunrat?.snacksAndDrinks.map((item, idx) => (
                                        <SnacksCard item={item} key={idx} />
                                    ))}
                                </ScrollView>

                                <View style={styles.snackHeader}>
                                    <View style={styles.snackHeaderLeft}>
                                        <LottieView
                                            source={require('../../../assets/snaks.json')}
                                            autoPlay
                                            loop={true}
                                            style={styles.snackIcon}
                                        />
                                        <Text style={styles.cartText}>Add Snacks</Text>
                                    </View>
                                    <Text style={[styles.cartText, { marginRight: 10 }]}> Total  ₹{totalAmoutOfSnacks}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}

                <View style={styles.infoContainer}>
                    <View style={styles.dashedRow}>
                        <Ionicons name="hourglass-outline" size={18} color={theme.background.pimary} />
                        <Text style={[styles.textGray, { marginLeft: 10 }]}>
                            Delivery in {avgDeliveryTime}
                        </Text>
                    </View>

                    <View style={styles.dashedRowTop}>
                        <View style={styles.row}>
                            <Ionicons name="home-outline" size={18} color={theme.background.pimary} />
                            <Text style={[styles.textGray, { marginLeft: 10 }]}>Delivery Location</Text>
                        </View>

                        <Pressable onPress={() => onInfoClick("location")} style={[styles.rowBetween, { zIndex: 9999 }]}>
                            <Text style={[styles.textSmall, { marginLeft: 10 }]}>{safeText(location, 50)}</Text>
                            <Ionicons name="chevron-forward-outline" size={18} color={"#696969"} />
                        </Pressable>
                    </View>

                    <Pressable onPress={() => onInfoClick("information")} style={styles.dashedRowBetween}>
                        <View style={styles.row}>
                            <Ionicons name="call-outline" size={18} color={theme.background.pimary} />
                            <Text style={[styles.textGray, { marginLeft: 10 }]}>
                                {name} - {phoneNo}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={18} color={"#696969"} />
                    </Pressable>

                    <Pressable onPress={() => onInfoClick("bill")} style={styles.dashedRowBetween} >
                        <View style={styles.row}>
                            <Ionicons name="receipt-outline" size={18} color={theme.background.pimary} />
                            <Text style={[styles.textGray, { marginLeft: 10 }]}>
                                Total Bill - <Text style={{ textDecorationLine: "line-through" }}>₹1200</Text> ₹1000
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={18} color={"#696969"} />
                    </Pressable>

                </View>

                <View style={{ marginBottom: 10 }}>
                    <Button
                        title={"Place Order"}
                        onPress={() => { }}
                        color={theme.background.pimary}
                    />
                </View>
            </ScrollView >

            <CardBottomSheet
                bottomSheetRef={bottomSheetRef}
                handleSheetChanges={handleSheetChanges}
                onClose={onClose}
                type={bottomSheetType}
            />
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        backgroundColor: theme.background.white,
        minHeight: 100,
        width: "95%",
        alignSelf: "center",
        marginTop: 70,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingBottom: 5,
        paddingTop: 5,
        position: "relative",
    },
    addMoreButton: {
        borderWidth: 0.5,
        borderRadius: 5,
        width: 120,
        flexDirection: "row",
        padding: 4,
        marginLeft: 10,
    },
    cartHeader: {
        borderWidth: 0,
        height: 50,
        position: "absolute",
        top: -50,
        width: "100%",
        backgroundColor: theme.background.pimary,
        borderTopLeftRadius: 10,
        borderTopEndRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cartHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    cartText: {
        fontFamily: theme.font.body.fontFamily,
        color: theme.iconColor,
        fontWeight: "700",
        fontSize: 14,
        marginLeft: 5,
    },
    cartIcon: {
        width: 40,
        height: 40,
        marginLeft: 5,
    },
    snackContainer: {
        backgroundColor: theme.background.white,
        height: 300,
        width: "95%",
        alignSelf: "center",
        marginTop: 80,
        borderRadius: 10,
        paddingBottom: 5,
        paddingTop: 5,
    },
    snackHeader: {
        borderWidth: 0,
        height: 50,
        position: "absolute",
        top: -50,
        width: "100%",
        backgroundColor: theme.background.pimary,
        borderTopLeftRadius: 10,
        borderTopEndRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    snackHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    snackIcon: {
        width: 50,
        height: 50,
    },
    infoContainer: {
        backgroundColor: theme.background.white,
        minHeight: 50,
        width: "95%",
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 10,
        paddingBottom: 5,
        paddingTop: 5,
    },
    dashedRow: {
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        borderStyle: "dashed",
        marginBottom: 10,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
    },
    dashedRowBetween: {
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        borderStyle: "dashed",
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    dashedRowTop: {
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        borderStyle: "dashed",
        padding: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textGray: {
        fontFamily: theme.font.body.fontFamily,
        color: "#696969",
        fontSize: 14,
    },
    textSmall: {
        fontFamily: theme.font.body.fontFamily,
        color: "#696969",
        fontSize: 12,
    },
    placeOrderButton: {
        backgroundColor: theme.background.pimary,
        width: "95%",
        height: 60,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    restaurantName: {
        borderWidth: 1,
        borderColor: theme.background.pimary,
        marginTop: 20,
        width: "80%",
        alignSelf: "center",
        textAlign: "center",
        fontFamily: theme.font.heading.fontFamily,
        fontSize: theme.font.heading.fontSize,
        color: theme.background.pimary,
        borderRadius: 5
    }
});


export default Cart;