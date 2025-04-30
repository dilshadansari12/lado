import { useCallback } from "react";
import { Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";

interface BottomSheetProps {
    bottomSheetRef: any,
    handleSheetChanges: any;
    onClose: () => void;
    type: string;
}

const CardBottomSheet = ({ bottomSheetRef, handleSheetChanges, onClose, type }: BottomSheetProps) => {

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

    const calculateSanpPoint = type === "information" ? ["25%"] : ["50%", "25%"];

    return (
        <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            enableDynamicSizing={false}
            footerComponent={renderFooter}
            backdropComponent={backDropComponent}
            index={1}
            snapPoints={calculateSanpPoint}
        >
            <BottomSheetView style={{
                flex: 1,
                padding: 36,
                alignItems: 'center',
            }}>

                <Text>Awesome 🎉 {type}</Text>
            </BottomSheetView>
        </BottomSheet>
    )
}


export default CardBottomSheet;