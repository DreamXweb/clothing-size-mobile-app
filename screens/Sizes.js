import {defaultStyles} from "../styles/defaultStyles";
import {ScrollView, View, Text} from "react-native";
import {database} from "../firebase/firebase";
import {useContext} from "react";
import {MainContext} from "../contexts/MainContext";

export const Sizes = ({route}) => {

    const wrap = content => <View style={defaultStyles.container}>
        <ScrollView style={{width: '100%'}}>
            {content}
        </ScrollView>
    </View>

    const brand = route?.params?.brand;

    if (!brand) {
        return wrap(<Text>Please, go to brand selection and select a brand</Text>)
    }

    // --------------------------------------------------- //

    // noinspection JSCheckFunctionSignatures
    const {gender, measurements} = useContext(MainContext);

    const sizeCharts = database[brand][gender];

    // TODO fill {item, size}
    const rows = [];

    for (let item of Object.keys(sizeCharts)) {

        // TODO find the min index
        // TODO find the max index
        // TODO find the corresponding sizes
        // TODO L - XL, 3 - 5 (EU), G - TG (CA),

        let size = '#TODO';

        rows.push({item, size})
    }

    let rowLength = rows.length;

    return wrap(<View style={{fontSize: 18}}>
        <View style={{...defaultStyles.row, height: 50, backgroundColor: '#8ED6FF', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <Text style={{width: '50%', textAlign: 'center', fontWeight: 'bold'}}>Item</Text>
            <Text style={{width: '50%', textAlign: 'center', fontWeight: 'bold'}}>Size</Text>
        </View>
        {rowLength ? rows.map((row, key) => <View style={{...defaultStyles.row, height: 50, backgroundColor: key % 2 === 0 ? '#EBF8FF' : '#CEEDFF', ...(key === rowLength - 1 ? {borderBottomLeftRadius: 20, borderBottomRightRadius: 20} : {}) }}>
            <Text style={{width: '50%', textAlign: 'center',}}>{row.item}</Text>
            <Text style={{width: '50%', textAlign: 'center',}}>{row.size}</Text>
        </View>) : <Text style={{...defaultStyles.row, textAlign: 'center', marginTop: 20}}>No items of the brand found</Text>}
    </View>);

}
