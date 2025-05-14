import { theme } from "../Pages/helper";
import { ButtonGroup } from "@rneui/base";
import { safeText } from "../Pages/helper";

import { View, Text, StyleSheet } from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useCartStore } from "../Zustand/Stores/Home.store";

const SelectedItemCard = ({ item }: any) => {
    const { name, price, mode, qty, restaurantId } = item;
    const { addOrUpdateItem }: any = useCartStore();

    const onGroupPress = (action: any) => {
        console.log({ action });

        const isAdd = action === 0;
        const minus = action === 2;
        addOrUpdateItem({ restaurantId, item: { ...item, qty: isAdd ? qty + 1 : qty - 1 } })
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background.white }]}>
            <View style={styles.leftSection}>
                <Ionicons
                    name="stop-circle-outline"
                    size={20}
                    color={mode === "veg" ? "green" : "red"}
                    style={styles.icon}
                />
                <Text style={[styles.nameText, { fontFamily: theme.font.body.fontFamily }]}>
                    {safeText(name, 100)}
                </Text>
            </View>
            <View style={styles.rightSection}>
                <ButtonGroup
                    selectMultiple={false}
                    disabled={[1]}
                    disabledSelectedStyle={styles.disabledSelectedStyle}
                    disabledSelectedTextStyle={styles.disabledSelectedTextStyle}
                    containerStyle={[
                        styles.buttonGroupContainer,
                        {
                            borderColor: theme.background.pimary,
                            backgroundColor: theme.background.pimary,
                        },
                    ]}
                    selectedButtonStyle={styles.selectedButtonStyle}
                    buttons={[
                        <Ionicons name="add-outline" size={28} color={theme.iconColor} />,
                        `${qty}`,
                        <Ionicons name="remove-outline" size={28} color={theme.iconColor} />,
                    ]}
                    selectedIndexes={[1]}
                    onPress={onGroupPress}
                    activeOpacity={1}
                    underlayColor="green"
                />
                <Text style={[styles.priceText, { fontFamily: theme.font.body.fontFamily }]}>
                    ₹{price * qty}
                </Text>
            </View>
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        width: "95%",
        alignSelf: "center",
        marginTop: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftSection: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    icon: {
        marginLeft: 2,
        marginRight: 4,
        marginBottom: 2,
        alignSelf: "center",
    },
    nameText: {
        marginLeft: 10,
        color: "#696969",
        fontSize: 14,
        width: 200,
    },
    rightSection: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonGroupContainer: {
        marginLeft: 0,
        height: 30,
        width: 100,
        borderWidth: 1,
    },
    selectedButtonStyle: {
        backgroundColor: "gray",
    },
    disabledSelectedStyle: {
        backgroundColor: "white",
    },
    disabledSelectedTextStyle: {
        color: "black",
    },
    priceText: {
        marginLeft: 10,
        color: "#696969",
        fontSize: 14,
    },
});

export default SelectedItemCard;