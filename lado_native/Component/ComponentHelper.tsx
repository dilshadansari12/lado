import React from "react";

import {
    Image,
    Text,
    View,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    Linking,
    Alert,
    ToastAndroid
} from "react-native"

import { isEmpty, safeText, theme } from "../Pages/helper";
import { listOFCategory } from "../Pages/Users/Home/helper";

import Ionicons from '@react-native-vector-icons/ionicons';
import { FAB } from "@rneui/base";
import { useCartStore, useFooterStore } from "../Zustand/Stores/Home.store";

const vegCss = { backgroundColor: "green", paddingLeft: 10, fontFamily: theme.font.body.fontFamily, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: "white", marginRight: 5, borderRadius: 5, height: 30 };
const nonVegCss = { backgroundColor: theme.background.dark, fontFamily: theme.font.body.fontFamily, paddingLeft: 10, paddingRight: 10, color: "white", paddingTop: 5, paddingBottom: 5, borderRadius: 5, height: 30 };

export const ModeBage = ({ mode }: any) => {
    if (mode === null || mode === '' || mode === undefined) return <Text>N/A</Text>
    const modeList = mode?.split(",")?.filter(e => e != '');

    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            {modeList.map((e: any, idx: number) => <Text key={idx} style={e === "veg" ? vegCss : nonVegCss} >{e}</Text>)}
        </View >
    )
}

// export const FooterOfList = () => {

//     const openWhatsApp = () => {
//         const phoneNumber = '+917903715443'; // TODO: read from setting
//         const message = 'Hello, I have a idea!';
//         const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

//         Linking.openURL(url).catch(() => {
//             ToastAndroid.show("something wen;r worng", 1 * 1000);
//         });
//     };

//     return (
//         <View style={{
//             alignSelf: 'center',
//             marginVertical: 20,
//             paddingHorizontal: 20,
//         }}>
//             <Text style={{
//                 fontSize: 20,
//                 color: 'gray',
//                 textAlign: 'center',
//                 // fontFamily: theme.font.body.fontFamily,
//                 lineHeight: 24,
//                 fontWeight: '500',
//             }}>
//                 Didn't find what you were looking for? Tell us what's missing — we’re always open to adds!
//             </Text>
//             <Pressable onPress={openWhatsApp} style={{ borderWidth: 1, borderColor: theme.background.pimary, width: 200, alignSelf: "center", padding: 10, marginTop: 14, marginBottom: 10, display: "flex", flexDirection: "row-reverse", justifyContent: "center", alignItems: "center" }}>
//                 <Text style={{ textAlign: "center", fontFamily: theme.font.body.fontFamily, color: theme.background.pimary, fontWeight: "bold" }}>suggest something</Text>
//                 <Ionicons name="logo-whatsapp" color={theme.background.pimary} size={18} style={{ marginRight: 2 }} />
//             </Pressable>
//         </View>
//     )
// };

{/* <ion-icon name="logo-whatsapp"></ion-icon> */ }

export const CardLoader = React.memo(() => {
    return <ActivityIndicator size={30} color={theme.background.dark} style={{ marginBottom: 50 }} />
})


// styling
const style = StyleSheet.create({
    container: {
        height: 330,
        marginTop: 10,
        marginBottom: 10,
        // width: width - 25,
        alignSelf: "center",
        borderColor: "gray",
        boxShadow: "0 8 7 0 rgba(100, 100, 111, 0.2)",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    imageStyle: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 0,
        margin: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    cardFooterStyle: {
        borderColor: "red",
        position: "relative",
        backgroundColor: "white",
        marginRight: 5
    },
    footerHeadeStyle: {
        width: 140,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "white",
        position: "absolute",
        top: -30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderEndEndRadius: 0,
        borderTopEndRadius: 50
    },
    offerSection: {
        marginLeft: 5,
        marginTop: 5,
        borderStyle: "dashed",
        borderTopColor: "gray",
        borderTopWidth: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    offerSectionFirstchild: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row"
    },
    footerFirstchild: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginLeft: 5
    },
    rating: {
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        paddingLeft: 10,
        paddingRight: 10,
        height: 28
    },
});

