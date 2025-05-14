import { Image, StyleSheet, Text, View } from "react-native";
import { safeText, theme } from "../Pages/helper";
import { ButtonGroup } from "@rneui/base";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useCartStore } from "../Zustand/Stores/Home.store";


const SnacksCard = ({ item }: any) => {
    const { name, price, imageUrl, quantity, inStock, description, brand, restaurantId, qty } = item;

    const { updateSnacksAndDrinks }: any = useCartStore();

    const onGroupPress = (action: number) => {
        console.log({ qty, action });
        const isAdd = action === 0;
        const minus = action === 2
        updateSnacksAndDrinks({ restaurantId, item: { ...item, qty: isAdd ? qty + 1 : qty <= 0 ? 0 : qty - 1 } });
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <Image
                    source={imageUrl}
                    alt="snacks Item Images"
                    style={styles.image}
                />
                <View>
                    <Text style={styles.nameText}>{safeText(name, 100)}</Text>
                    <View style={styles.subDetailsRow}>
                        <Text style={styles.subText}>Qty : {safeText(quantity)}</Text>
                        <Text style={styles.subText}>brand : {safeText(brand)}</Text>
                        <Text style={styles.subText}>Price: ₹{price}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.rightSection}>
                <Text style={styles.priceText}>{qty <= 0 ? '' : `₹${price * qty}`}</Text>
                <ButtonGroup
                    selectMultiple={false}
                    disabled={[1]}
                    disabledSelectedStyle={{ backgroundColor: "white" }}
                    disabledSelectedTextStyle={{ color: "black" }}
                    containerStyle={styles.buttonGroupContainer}
                    buttonStyle={styles.buttonGroupButton}
                    buttons={[
                        <Ionicons name="add-outline" size={10} color={theme.background.pimary} />,
                        `${qty}`,
                        <Ionicons name="remove-outline" size={10} color={theme.background.pimary} />
                    ]}
                    selectedIndexes={[1]}
                    onPress={onGroupPress}
                    activeOpacity={1}
                    underlayColor={theme.background.pimary}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderColor: theme.background.pimary,
        borderRadius: 5,
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#fff",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 30,
        height: 30,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        resizeMode: "stretch",
    },
    nameText: {
        marginLeft: 10,
        color: "#696969",
        fontSize: 14,
        fontFamily: theme.font.body.fontFamily,
    },
    subDetailsRow: {
        flexDirection: "row",
    },
    subText: {
        marginLeft: 10,
        color: "#696969",
        fontSize: 12,
        fontFamily: theme.font.body.fontFamily,
    },
    rightSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    priceText: {
        marginLeft: 10,
        marginRight: 10,
        color: "#696969",
        fontSize: 14,
        fontFamily: theme.font.body.fontFamily,
    },
    buttonGroupContainer: {
        marginLeft: 0,
        height: 25,
        width: 50,
        borderWidth: 1,
        borderColor: theme.background.pimary,
    },
    buttonGroupButton: {
        borderWidth: 0.2,
        borderColor: theme.background.pimary,
    },
});


export default SnacksCard