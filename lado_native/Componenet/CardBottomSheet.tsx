import { useCallback, useState } from "react";
import { Text, ToastAndroid, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";
import { FloatingLabelInput } from "react-native-floating-label-input";
import TextField from "./TextField";
import { isEmpty, theme } from "../Pages/helper";
import { Button } from "@rneui/base";

interface BottomSheetProps {
    bottomSheetRef: any,
    handleSheetChanges: any;
    onClose: () => void;
    type: string;
}

const CardBottomSheet = ({ bottomSheetRef, handleSheetChanges, onClose, type }: BottomSheetProps) => {

    const [formText, setFromText] = useState({ name: "", phoneNumber: "" });
    const [error, setError] = useState({ name: "", phoneNumber: "" });

    const renderFooter = useCallback(
        (props: any) => (
            <BottomSheetFooter {...props} bottomInset={24}>
                <View style={{
                    padding: 12,
                    margin: 12,
                    borderRadius: 12,
                    backgroundColor: '#80f',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: '800',
                    }}>Footer</Text>
                </View>
            </BottomSheetFooter>
        ),
        []
    );

    const backDropComponent = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}          // Set backdrop opacity
                pressBehavior="close"  // Close the bottom sheet when the backdrop is pressed
            />
        ),
        []
    );

    const calculateSanpPoint = type === "information" ? [350] : ["50%", "25%"];
    console.log({ type, calculateSanpPoint });

    const onFormSubmit = () => {
        if (type === "information") {
            if (isEmpty(error.name)) {
                setError((prev) => ({ ...prev, name: "Name is required" }))
            }

            if (isEmpty(error.phoneNumber)) {
                setError((prev) => ({ ...prev, phoneNumber: "Phone number is required" }))
            }
        }

        if (!isEmpty(Object.values(error))) {
            ToastAndroid.show("some thing went wrong", 1000)
        }

        console.log("form save");

    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            enableDynamicSizing={false}
            backdropComponent={backDropComponent}
            index={-1}
            snapPoints={calculateSanpPoint}
        >
            <BottomSheetView style={{
                flex: 1,
                alignItems: 'center',
            }}>

                {type === "information" &&
                    <View style={{ marginTop: 30, width: "97%", borderRadius: 5, marginBottom: 10 }}>
                        <TextField
                            value={formText.name}
                            label="Name"
                            errorText={error.name}
                            onChangeText={(value) => setFromText((prev) => ({ ...prev, name: value }))}
                            style={{ width: "90%", alignSelf: "center", marginTop: 10, fontFamily: theme.font.body.fontFamily }}
                        />

                        <TextField
                            value={formText.phoneNumber}
                            label="Phone Number"
                            errorText={error.phoneNumber}
                            onChangeText={(value) => setFromText((prev) => ({ ...prev, phoneNumber: value }))}
                            style={{ width: "90%", alignSelf: "center", marginTop: 10 }}
                        />
                    </View>
                }

                <Button
                    title={'Submit'}
                    containerStyle={{
                        width: "90%",
                        marginHorizontal: 50,
                        marginVertical: 10,
                        marginBottom: 10
                    }}
                    buttonStyle={{ backgroundColor: theme.background.pimary, padding: 10, borderRadius: 5 }}
                    titleStyle={{ fontFamily: theme.font.body.fontFamily, fontSize: 16, letterSpacing: 1 }}
                    onPress={onFormSubmit}
                />
            </BottomSheetView>
        </BottomSheet>
    )
}


export default CardBottomSheet;