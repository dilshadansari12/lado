import { Button, Card, Overlay } from "@rneui/base"
import { Text, View } from "react-native"
import { isEmpty, safeText, theme } from "../Pages/helper";
import LottieView from "lottie-react-native";

interface InformationDialogProps {
    visible: boolean,
    onLeftPress?: () => void,
    onRightPress?: () => void,
    type: string,
    title: string,
    description: string,
    leftButtonTitle?: string,
    rightButtonTitle?: string
}

const findLotties = (type: string) => {
    if (type === "error") {
        return { source: require('../assets/error.json'), iconStyle: { width: 80, height: 80, alignSelf: "center" } };
    } else if (type === "warning") {
        return { source: require('../assets/warning.json'), iconStyle: { width: 130, height: 130, alignSelf: "center" } };
    } else if (type === "success") {
        return { source: require('../assets/tick.json'), iconStyle: { width: 80, height: 80, alignSelf: "center" } };
    } else {
        return { source: require('../assets/info.json'), iconStyle: { width: 100, height: 100, alignSelf: "center" } };
    }
}

const InformationDialog = ({ visible, onRightPress, onLeftPress, type = "info", title, description, leftButtonTitle, rightButtonTitle }: InformationDialogProps) => {
    const { source, iconStyle } = findLotties(type);
    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={onLeftPress}
            overlayStyle={{ width: "80%", alignSelf: "center", minHeight: 50, backgroundColor: theme.background.white, borderRadius: 5, position: "relative" }}
        >
            <View style={{ height: 80, width: 80, borderRadius: 50, position: "absolute", top: -40, left: "40%", backgroundColor: theme.background.white, display: "flex", justifyContent: "center" }}>
                <LottieView
                    source={source}
                    autoPlay
                    loop={true}
                    style={iconStyle}
                />
            </View>

            <View style={{ marginTop: 35 }}>
                <Card.Title style={{ fontFamily: theme.font.body.fontFamily }}>{safeText(title, 100)}</Card.Title>
                <Card.Divider />
                <Text style={{ fontFamily: theme.font.body.fontFamily, color: theme.font.body.color, marginTop: 10, textAlign: "center" }} >{safeText(description, 400)}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row-reverse", marginTop: 5 }}>
                <Button title={isEmpty(rightButtonTitle) ? "Ok" : rightButtonTitle} containerStyle={{ width: 80, marginRight: 5 }} color={theme.background.pimary} onPress={onRightPress} />
                <Button title={isEmpty(leftButtonTitle) ? "close" : leftButtonTitle} type="outline" containerStyle={{ width: 80, marginRight: 10 }} onPress={onLeftPress} />
            </View>
        </Overlay >
    )
}

export default InformationDialog;
