import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from '@react-native-vector-icons/ionicons';
import { Image, StyleSheet, Text, View } from "react-native";

import { isEmpty, safeText, theme } from "../Pages/helper";
import { SearchBar } from "@rneui/base";

const RestrauntViewHeader = ({ searchValue, onSearchChange, onClearSearch, searchBusy, restraunt }: any) => {

    const navigation = useNavigation();
    const [showSearch, setShowSearch] = useState(false);

    const goBack = () => navigation.goBack();
    const searchIconClick = () => setShowSearch(true);

    return (
        <View style={styles.container}>
            {!isEmpty(restraunt?.restaurantImage) && (
                <Image
                    source={require("../assets/hotel.jpg")}
                    alt="Food Item Images"
                    resizeMode="stretch"
                    style={styles.image}
                />
            )}

            <View style={styles.topIconsWrapper}>
                <Ionicons
                    name="chevron-back-outline"
                    size={26}
                    color={theme.background.pimary}
                    style={[styles.icon, { backgroundColor: theme.background.white }]}
                    onPress={goBack}
                />
                {!showSearch && (
                    <Ionicons
                        name="search-outline"
                        size={26}
                        color={theme.background.pimary}
                        style={[styles.icon, { backgroundColor: theme.background.white }]}
                        onPress={searchIconClick}
                    />
                )}
                {showSearch && (
                    <SearchBar
                        onChangeText={onSearchChange}
                        value={searchValue}
                        placeholder="Search Dinner"
                        searchIcon={<Ionicons name="search" size={22} color={theme.tabIconColor} />}
                        clearIcon={
                            <View style={[styles.clearIconWrapper, { borderLeftColor: theme.tabIconColor }]}>
                                <Ionicons
                                    name="close"
                                    size={22}
                                    color={theme.tabIconColor}
                                    style={styles.clearIcon}
                                    onPress={onClearSearch}
                                />
                            </View>
                        }
                        lightTheme
                        round
                        showLoading={searchBusy}
                        loadingProps={{ color: theme.tabIconColor }}
                        containerStyle={[styles.searchContainer, { borderColor: "gray" }]}
                        inputContainerStyle={styles.searchInputContainer}
                        inputStyle={{ color: theme.textInput }}
                        style={styles.searchInput}
                        autoFocus={false}
                    />
                )}
            </View>

            <LinearGradient
                colors={["#512DA8", "rgba(106, 27, 154, 0)"]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={[
                    styles.gradient,
                    isEmpty(restraunt?.image) ? { justifyContent: "flex-end", alignItems: "center", paddingBottom: 30 } : { justifyContent: "center", alignItems: "flex-end" }
                ]}
            >
                <View style={styles.detailWrapper}>
                    <Text style={[styles.title, { fontFamily: theme.font.body.fontFamily }]}>
                        {restraunt?.name}
                    </Text>

                    <View style={styles.row}>
                        <View style={[styles.badge, { backgroundColor: theme.background.white }]}>
                            <Ionicons name="stopwatch-outline" size={20} color="black" style={styles.badgeIcon} />
                            <Text style={{ color: "black", fontFamily: theme.font.body.fontFamily }}>
                                {safeText(`${restraunt?.averageDeliveryTime}`)}
                            </Text>
                        </View>
                        <View style={styles.ratingBadge}>
                            <Text style={{ color: "white", fontFamily: theme.font.body.fontFamily }}>
                                {safeText(`${restraunt?.rating}`)}
                            </Text>
                            <Ionicons name="star" size={10} color="white" style={styles.starIcon} />
                        </View>
                        <View style={[styles.badge, { backgroundColor: theme.background.white, marginLeft: 20 }]}>
                            <Ionicons name="location-outline" size={20} color="black" style={styles.badgeIcon} />
                            <Text style={{ color: "black", fontFamily: theme.font.body.fontFamily }}>
                                {safeText(`${restraunt?.distance}`)}
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={[
                            styles.address,
                            { fontFamily: theme.font.body.fontFamily },
                        ]}
                    >
                        {safeText(restraunt?.location, 80)}
                    </Text>
                </View>
            </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        position: "relative",
        minHeight: 300,
        width: "100%",
    },
    image: {
        width: "100%",
        height: 400,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    topIconsWrapper: {
        position: "absolute",
        top: 10,
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        marginTop: 20,
    },
    icon: {
        borderRadius: 50,
        padding: 10,
        zIndex: 999,
    },
    searchContainer: {
        width: "85%",
        margin: 0,
        padding: 0,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 10,
        zIndex: 999,
    },
    searchInputContainer: {
        backgroundColor: "white",
        margin: 0,
        padding: 0,
        height: 40,
    },
    searchInput: {
        fontSize: 14,
    },
    clearIconWrapper: {
        borderLeftWidth: 1,
        paddingLeft: 5,
    },
    clearIcon: {
        zIndex: 9999,
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 300,
        flex: 1,
    },
    detailWrapper: {
        width: "90%",
        alignSelf: "center",
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    row: { display: "flex", flexDirection: "row", marginLeft: 10, justifyContent: "center", marginTop: 15 },
    badge: {
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background.white,
        paddingLeft: 10,
        paddingRight: 10,
        height: 28
    },
    ratingBadge: {
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        paddingLeft: 10,
        paddingRight: 10,
        height: 28,
        marginLeft: 20
    },
    badgeIcon: {
        marginRight: 2,
        marginBottom: 2,
    },
    starIcon: {
        marginLeft: 2,
        marginBottom: 2,
    },
    address: {
        textAlign: "center",
        marginTop: 15,
        marginLeft: 10,
        color: "white",
        fontSize: 12,
    },
});

export default RestrauntViewHeader;