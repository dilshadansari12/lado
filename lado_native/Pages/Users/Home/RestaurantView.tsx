import React, { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StatusBar } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { finalList } from "./helper";
import { isEmpty } from "../../helper";
import GoToCart from "../../../Component/GoToCart";
import RestaurantItemCard from "./RestaurantItemCard";
import { useCartStore, useFooterStore } from "../../../Zustand/Stores/Home.store";
import RestaurantFooter from "../../../Component/RestaurantFooter";
import { CardLoader, GoToTop } from "../../../Component/ComponentHelper";
import RestaurantViewHeader from "../../../Component/RestaurantViewHeader";
import InformationDialog from "../../../Component/InformationDialog";


const RestaurantView = ({ route }: any) => {

    const listRef = useRef(null);
    const lastOffsetY = useRef(0);
    const { restaurantId } = route?.params;

    //zuston
    const { setShowFooter }: any = useFooterStore();
    const { addToCart, cart }: any = useCartStore();
    console.log({ cart, is: isEmpty(cart) });

    //state
    const [showGoToTop, setShowGoToTop] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showGoToCard, setShowGoToCard] = useState<boolean>(false);

    //api call 
    const restaurant = finalList.find(e => e?.id === restaurantId);
    const final = restaurant?.restaurantItems || [];

    //setInitialState
    useEffect(() => {
        const refreshList = isEmpty(cart) || !Object.keys(cart)?.includes(`${restaurantId}`) || (!isEmpty(cart) && cart[restaurantId]?.restaurantItems?.length < final?.length);
        console.log({ refreshList, restaurantId });

        if (refreshList) { // TODO:REVIEW
            const state = {
                [restaurantId]: {
                    restaurantMetaData: { name: restaurant?.name },
                    restaurantItems: final.map((e) => ({ ...e, qty: 0 }))
                }
            }
            addToCart(state);
        }
    }, [cart, restaurantId, final]);

    //show go to card
    useEffect(() => {
        if (!isEmpty(cart)) {
            const key = Object.keys(cart);
            const list = key.map((e) => {
                return cart[e]?.restaurantItems?.filter((e) => e?.qty > 0);
            });
            setShowGoToCard(list.flat(1).length >= 1 ? true : false);
        }
    }, [cart]);

    const searchBusy = true;

    const onSearchSubmit = () => {
        console.log("search submit activeted");
        console.log("hii", { searchValue });
    }

    const onScrollChange = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > lastOffsetY.current) {
            setShowGoToTop(offsetY > 50 ? true : false);
        } else if (offsetY < lastOffsetY.current) {
            setShowFooter(false);
            setShowGoToTop(offsetY > 50 ? true : false);
        }
        lastOffsetY.current = offsetY;
    }

    const onLoading = ({ blankArea }: any) => {
        if (blankArea > 1) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }

    //memorize component
    const Header = useMemo(() => {
        return <RestaurantViewHeader
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchBusy={searchBusy}
            restaurant={restaurant}
            showSearch={showSearchBar}
            setShowSearch={setShowSearchBar}
            onSearchSubmit={onSearchSubmit}
        />
    }, [searchValue, setSearchValue, searchBusy, restaurant, showSearchBar, setShowSearchBar, onSearchSubmit]);

    const Item = useCallback((props: any) => {
        return <RestaurantItemCard {...props} />
    }, [cart, restaurantId, final])

    const GoToCarts = useMemo(() => <GoToCart cart={cart} />, [cart]);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={true} />
            <InformationDialog visible={false} closeDialog={() => { }} type="warning" title="We cont allow" description={"we don't allow more the two restaurant orders"} />
            <FlashList
                ref={listRef}
                data={cart[restaurantId]?.restaurantItems || []}
                renderItem={Item}
                keyExtractor={(item, index) => index.toString()} //TODO:change by itemId 
                ListHeaderComponent={Header}
                estimatedItemSize={50}
                onScrollBeginDrag={() => setShowFooter(true)}
                onScroll={onScrollChange}
                ListFooterComponent={RestaurantFooter}
                onBlankArea={onLoading}
            />
            {isLoading && <CardLoader />}
            {!isLoading && showGoToTop && <GoToTop ref={listRef} />}
            {showGoToCard && GoToCarts}
        </View>
    )
}

export default RestaurantView;

/*
 pending work to do 
     * show a go to cart and show a selected item from different restaurant
     * check not allow user to order more than two hotel
     * enh the informationcart
     * 
     * 
     
||--------state managment --- ||
   * first save all restaurantItem in redux state with qty zero
   * use go back -> and then come first check is there is any thing saved in state (if yes then don;t fetch just);
        -> if the comming list is greter than , state length (clear storage and refetch all new);


*/
