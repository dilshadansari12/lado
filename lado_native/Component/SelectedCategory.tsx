import { Text, View } from "react-native";
import { listOFCategory } from "../Pages/Users/Home/helper";
import { theme } from "../Pages/helper";
import Ionicons from '@react-native-vector-icons/ionicons';

const SelectedCategory = ({ id, onCategoryRemove }: any) => {

    const find = listOFCategory.find(e => e.id == id);
    const categoryFilterContainer = { marginLeft: 8, marginRight: 3, marginBottom: 10, borderWidth: 0.3, minHeight: 30, flex: 1, flexDirection: "row", justifyContent: "space-around", alignSelf: "center", paddingTop: 5, paddingLeft: 5, borderRadius: 5 }

    return (
        <View style={categoryFilterContainer}>
            <Text style={{ fontFamily: theme.font.body.fontFamily }} >{find?.name}</Text>
            <Ionicons name="close-circle" color={theme.tabIconColor} size={20} onPress={() => onCategoryRemove(find?.id)} style={{ marginLeft: 4, marginRight: 4 }} />
        </View>
    )
};

export default SelectedCategory;