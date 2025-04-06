import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const LadoLoader = () => {
    const letters = ["L", "A", "D", "O"];
    const animatedValues = letters.map(() => useRef(new Animated.Value(0)).current);

    useEffect(() => {
        const animations = animatedValues.map((anim, index) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(index * 155),
                    Animated.timing(anim, {
                        toValue: -10,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ])
            );
        });
        animations.forEach((animation) => animation.start());
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {letters.map((letter, index) => (
                    <Animated.Text
                        key={index}
                        style={[
                            styles.letter,
                            {
                                transform: [{ translateY: animatedValues[index] }],
                            },
                        ]}
                    >
                        {letter}
                    </Animated.Text>
                ))}
            </View>
            <LottieView
                source={require('../assets/loader.json')}
                autoPlay
                loop
                style={{ width: 100, height: 200 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white",
        position: "relative"
    },
    textContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 20
    },
    letter: {
        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 5,
        color: "gray",
    },
});

export default LadoLoader;
