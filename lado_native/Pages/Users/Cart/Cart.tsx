import React, { useCallback, useRef, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"

//library
import { Button, makeStyles } from "@rneui/base";
import LottieView from "lottie-react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@react-native-vector-icons/ionicons';

//local
import { safeText, theme } from "../../helper";
import SnacksCard from "../../../Componenet/SnacksCard";
import { listOfItem, snacksAndDrinks, user } from "../Home/helper";
import SelectedItemCard from "../../../Componenet/SelectedItemCard";
import CardBottomSheet from "../../../Componenet/CardBottomSheet";


const Cart = ({ route }: any) => {
    const { totalItem } = route?.params;
    const { location, name, phoneNo } = user;
    const naigation = useNavigation();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const [bottomSheetType, setBottomSheetType] = useState<string>("");

    const totalSelectedItemsIds = [1, 2, 3, 4, 5, 8, 9];
    const allSelectedItems = listOfItem.filter((e) => totalSelectedItemsIds.includes(e?.id));

    const onAddMoreItem = () => {
        console.log("onAddMoreItem");
    }

    const avgDeliveryTime = "40-45 mins";
    const onInfoClick = (type: string) => {
        setBottomSheetType(type);
        bottomSheetRef.current?.expand();

    }
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const onClose = () => {
        bottomSheetRef.current?.close();
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <StatusBar barStyle="light-content" hidden={false} />
                <View style={styles.wrapper}>
                    {allSelectedItems.map((item, idx) => (
                        <SelectedItemCard item={item} key={idx} />
                    ))}

                    <Pressable
                        onPress={onAddMoreItem}
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
                        <Text style={styles.cartText}>₹500</Text>
                    </View>
                </View>

                <View style={styles.snackContainer}>
                    <ScrollView nestedScrollEnabled={true}>
                        {snacksAndDrinks.map((item, idx) => (
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
                        <Text style={styles.cartText}>₹500</Text>
                    </View>
                </View>

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
                        <View style={styles.rowBetween}>
                            <Text style={[styles.textSmall, { marginLeft: 10 }]}>{safeText(location, 50)}</Text>
                            <Pressable onPress={() => onInfoClick("location")}>
                                <Ionicons name="chevron-forward-outline" size={18} color={"#696969"} />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.dashedRowBetween}>
                        <View style={styles.row}>
                            <Ionicons name="call-outline" size={18} color={theme.background.pimary} />
                            <Text style={[styles.textGray, { marginLeft: 10 }]}>
                                {name} - {phoneNo}
                            </Text>
                        </View>
                        <Pressable onPress={() => onInfoClick("information")}>
                            <Ionicons name="chevron-forward-outline" size={18} color={"#696969"} />
                        </Pressable>
                    </View>

                    <View style={styles.dashedRowBetween}>
                        <Pressable onPress={() => onInfoClick("bill")}>
                            <View style={styles.row}>
                                <Ionicons name="receipt-outline" size={18} color={theme.background.pimary} />
                                <Text style={[styles.textGray, { marginLeft: 10 }]}>
                                    Total Bill - <Text style={{ textDecorationLine: "line-through" }}>₹1200</Text> ₹1000
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward-outline" size={18} color={"#696969"} />
                        </Pressable>
                    </View>
                </View>

                <Button
                    title={"Place Order"}
                    buttonStyle={styles.placeOrderButton}
                    onPress={() => onInfoClick("location")}
                />
            </ScrollView>

            <CardBottomSheet
                bottomSheetRef={bottomSheetRef}
                handleSheetChanges={handleSheetChanges}
                onClose={onClose}
                type={bottomSheetType}
            />
        </View>
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
});


export default Cart;