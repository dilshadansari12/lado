import { Image, Pressable, Text } from "react-native";
import { safeText, theme } from "../Pages/helper";

const Category = ({ item, onCategoryAdd, selectedCategory = [] }: any) => {
    const CategoryContainer = { borderRadius: 50, flex: 1, alignContent: "center", alignItems: "center", borderWidth: 0, marginTop: 10, marginBottom: 10, marginLeft: 10 }

    return (
        <Pressable onPress={() => onCategoryAdd(item.id)} style={CategoryContainer} key={item.id}>
            <Image source={item.image_url} height={undefined} width={undefined} resizeMethod="resize" style={{ width: 60, height: 60, backgroundColor: "white" }} />
            <Text style={selectedCategory.includes(item?.id) ? { color: theme.background.dark, textAlign: "center", fontFamily: theme.font.heading.fontFamily } : { textAlign: "center", color: "gray", fontFamily: theme.font.body.fontFamily }}>{safeText(item.name, 15)?.split(" ").join("\n")}</Text>
        </Pressable>
    )
};

export default Category;