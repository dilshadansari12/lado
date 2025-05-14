import BottomSheet, { BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Payemnt = () => {

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const onClose = () => {
        bottomSheetRef.current?.close();
    }

    // renders
    return (
        <View style={{ flex: 1 }}>
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                onClose={onClose}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                    <Button title="close sheet" onPress={onClose} />
                </BottomSheetView>
            </BottomSheet>
            <Button title="Open Sheet" onPress={() => bottomSheetRef.current?.expand()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },
});


export default Payemnt;
