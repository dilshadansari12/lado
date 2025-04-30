import { View, Text } from "react-native";
import { theme } from "../Pages/helper";
import { ButtonGroup } from "@rneui/base";
import Ionicons from '@react-native-vector-icons/ionicons';
import { safeText } from "../Pages/helper";

// when user go add more item make sure the what every the selected in this state is not chsnges -> and same thing show on order vieww screen
const SelectedItemCard = ({ item }: any) => {
    const { name, price, mode, availableStatus, imageUrl } = item;

    const onGroupPress = () => { };
    const totalItem = 1;
    const names = "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet"
    return (
        <View style={{ width: "95%", backgroundColor: theme.background.white, alignSelf: "center", marginTop: 2, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "flex-start", alignItems: "center" }}>
                <Ionicons name="stop-circle-outline" size={20} color={mode === "veg" ? "green" : "red"} style={{ marginLeft: 2, marginRight: 4, marginBottom: 2, alignSelf: "center" }} />
                <Text style={{ fontFamily: theme.font.body.fontFamily, marginLeft: 10, color: "#696969", fontSize: 14, width: 200 }}>{safeText(name, 100)}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "flex-end", alignItems: "center" }}>
                <ButtonGroup
                    selectMultiple={false}
                    disabled={[1]}
                    disabledSelectedStyle={{ backgroundColor: "white" }}
                    disabledSelectedTextStyle={{ color: "black" }}
                    containerStyle={{ marginLeft: 0, height: 30, width: 100, borderWidth: 1, borderColor: theme.background.pimary, backgroundColor: theme.background.pimary }}
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
                />
                <Text style={{ fontFamily: theme.font.body.fontFamily, marginLeft: 10, color: "#696969", fontSize: 14 }} >₹{price}</Text>
            </View>
        </View >
    );
};


export default SelectedItemCard;