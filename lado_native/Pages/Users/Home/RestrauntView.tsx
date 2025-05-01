import React, { useRef, useState } from "react";
import { CardLoader, GoToTop } from "../../../Component/ComponentHelper";
import { finalList } from "./helper";
import { Dimensions, View, StatusBar } from "react-native";
import { FlashList } from "@shopify/flash-list";
import RestrauntItemCard from "./RestrauntItemCard";
import GoToCart from "../../../Component/GoToCart";
import { useNavigation } from "@react-navigation/native";
import RestrauntViewHeader from "../../../Component/RestrauntViewHeader";



const RestrauntView = ({ route }: any) => {
    const listRef = useRef(null);
    const { restrauntId } = route?.params;
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;
    const navigation = useNavigation();


    const [showGoToTop, setShowGoToTop] = useState<boolean>(false);
    const [isRenderingLag, setIsRenderingLag] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [totalItem, setTotalItem] = React.useState(0); //TODO: make seprate state in Restraunt Card
    const [searchValue, setSearchValue] = React.useState<string>('');

    //api call 
    const restraunt = finalList.find(e => e?.id === restrauntId);
    const final = restraunt?.restaurantItems || [];

    //local methods
    const onSearchChange = () => { }
    const onClearSearch = () => setShowSearch(false);

    const searchBusy = true;

    return (
        <View style={{ flex: 1 }}>
            {/* //TODO: show status/hide staus bar and hide on the bases of scroll at the same time show a to header; */}
            <StatusBar barStyle="light-content" hidden={true} />
            <FlashList
                ref={listRef}
                data={final || []}
                renderItem={(props) => <RestrauntItemCard {...props} totalItem={totalItem} setTotalItem={setTotalItem} />}
                keyExtractor={(item, index) => index.toString()} //TODO:change by itemId 
                ListHeaderComponent={<RestrauntViewHeader searchValue={searchValue} onSearchChange={onSearchChange} onClearSearch={onClearSearch} searchBusy={searchBusy} restraunt={restraunt} />}
                // ListFooterComponent={FooterOfList}
                scrollEnabled={true}
                estimatedItemSize={10}
                onScrollBeginDrag={() => console.log("started scrolling")}//TODO: handle in context api and hide bottom when user scrolling
                onMomentumScrollEnd={() => console.log("end scrolling")}
                onScroll={(event) => {
                    const offsetY = event.nativeEvent.contentOffset.y;
                    setShowGoToTop(offsetY > height ? true : false);
                }}
                onBlankArea={({ blankArea }) => {
                    if (blankArea > 1) {
                        setIsRenderingLag(true);
                    } else {
                        setIsRenderingLag(false);
                    }
                }}
            />
            {isRenderingLag && <CardLoader />}
            {!isRenderingLag && showGoToTop && <GoToTop ref={listRef} />}
            {totalItem > 0 && <GoToCart totalItem={totalItem} />}
        </View>
    )
}

export default RestrauntView;


/*
 pending work to do 

 

*/