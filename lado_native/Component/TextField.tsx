import React, { useEffect, useRef, useState } from 'react'
import {
    Text,
    TextInput,
    StyleSheet,
    View,
    Animated,
    Easing,
    TouchableWithoutFeedback,
} from 'react-native'
import { theme } from '../Pages/helper'

type Props = React.ComponentProps<typeof TextInput> & {
    label: string
    errorText?: string | null
}

const TextField: React.FC<Props> = (props) => {
    const {
        label,
        errorText,
        value,
        style,
        onBlur,
        onFocus,
        ...restOfProps
    } = props
    const [isFocused, setIsFocused] = useState(false)

    const inputRef = useRef<TextInput>(null)
    const focusAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused || !!value ? 1 : 0,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start()
    }, [focusAnim, isFocused, value])

    let color = isFocused ? '#080F9C' : '#B9C4CA'
    if (errorText) {
        color = '#B00020'
    }

    return (
        <View style={style}>
            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: color,
                    },
                ]}
                ref={inputRef}
                {...restOfProps}
                value={value}
                onBlur={(event) => {
                    setIsFocused(false)
                    onBlur?.(event)
                }}
                onFocus={(event) => {
                    setIsFocused(true)
                    onFocus?.(event)
                }}
            />
            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                <Animated.View
                    style={[
                        styles.labelContainer,
                        {
                            transform: [
                                {
                                    scale: focusAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 0.75],
                                    }),
                                },
                                {
                                    translateY: focusAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [24, -12],
                                    }),
                                },
                                {
                                    translateX: focusAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [16, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.label,
                            {
                                color
                            },
                        ]}
                    >
                        {label}
                        {errorText ? '* ' : ''}
                    </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 4,
        fontFamily: theme.font.body.fontFamily,
        fontSize: 16,
        minWidth: 180
    },
    labelContainer: {
        position: 'absolute',
        paddingHorizontal: 8,
        backgroundColor: 'white',
    },
    label: {
        fontFamily: theme.font.body.fontFamily,
        fontSize: 16,
    },
    error: {
        marginTop: 4,
        marginLeft: 12,
        fontSize: 12,
        color: '#B00020',
        fontFamily: theme.font.body.fontFamily
    },
})

export default TextField