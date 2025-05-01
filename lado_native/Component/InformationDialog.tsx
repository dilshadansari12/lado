import { Button, Card, Overlay } from "@rneui/base"
import { Text, View } from "react-native"
import { theme } from "../Pages/helper";
import LottieView from "lottie-react-native";

interface InformationDialogProps {
    visible: boolean,
    closeDialog?: () => void,
    type: string,
    title: string,
    description: string
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

const InformationDialog = ({ visible, closeDialog, type = "info" }: InformationDialogProps) => {
    const { source, iconStyle } = findLotties(type);
    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={closeDialog}
            overlayStyle={{ width: "80%", alignSelf: "center", minHeight: 250, backgroundColor: theme.background.white, borderRadius: 5, position: "relative" }}
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
                <Card.Title style={{ fontFamily: theme.font.body.fontFamily }}>You Are Out Of Boundery</Card.Title>
                <Card.Divider />
                <Text style={{ fontFamily: theme.font.body.fontFamily, color: theme.font.body.color, marginTop: 10, textAlign: "center" }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptatibus obcaecati dolor facere, veniam ut quas id adipisci architecto sequi! Saepe asperiores animi aspernatur nulla, aliquam illo? Animi, ea necessitatibus!</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row-reverse", marginTop: 5 }}>
                <Button title="Ok" containerStyle={{ width: 80, marginRight: 5 }} color={theme.background.pimary} />
                <Button title="close" type="outline" containerStyle={{ width: 80, marginRight: 10 }} onPress={closeDialog} />
            </View>
        </Overlay >
    )
}

export default InformationDialog;
