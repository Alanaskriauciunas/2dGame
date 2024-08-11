import { Text, Pressable, TouchableOpacity, StyleSheet } from "react-native";
export function CustomButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.custombutton} onPress={onPress}>
                <Text>{title}</Text>    
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    custombutton: {
    borderWidth: 1,
    backgroundColor: "#E5E4E2",
    width:60,
    height:40,
    padding: 9,
    borderRadius:15
    }

});