import React, { useState } from "react"

import { ScrollView, TextBase } from "react-native"
import { Text } from "@react-navigation/elements"
import InformationDialog from "../../../Component/InformationDialog"
import { Button } from "react-native"
import { View } from "react-native"
import LottieView from "lottie-react-native"

const Tracking = () => {
    const [show, setShow] = useState(false);

    const closeDialog = () => {
        setShow(false);
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>Tracking Screen</Text>
            <InformationDialog visible={show} closeDialog={closeDialog} type="success" />
            <Button title="Open" onPress={() => setShow(true)} />
        </View>
    )
}

export default Tracking;