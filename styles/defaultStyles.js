import {StyleSheet} from "react-native";

const skyblue_1 = '#EEFCFF';
export const skyblue_2 = '#9ACBCD';
const pink = '#F79EA5';

const common = {
    border: {
        borderWidth: 2,
        borderRadius: 8,
    }
}

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        backgroundColor: skyblue_1,
        borderColor: skyblue_2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        ...common.border,
    },
    brand: {
        ...common.border,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 14,
        paddingBottom: 14,
        fontSize: 18,
        margin: 10,
        borderColor: pink
    }
});
