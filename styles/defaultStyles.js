import {StyleSheet} from "react-native";

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    hr: {
        height: 1,
        width: '100%',
        backgroundColor: 'black',
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: 70,
        borderColor: 'gray',
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});
