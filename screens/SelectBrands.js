import {defaultStyles, skyblue_2} from "../styles/defaultStyles";
import {ScrollView, TextInput, View, Text, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useEffect, useState} from "react";
import {log} from "../common-js/common-js";

// TODO extend ... sizes ...
const brands = ['Aritmia', 'Adidas', 'Forever 21', 'Gap', 'Garage', 'Gym Shark', 'H&M', 'Lululemon', 'Nike', 'Zara'];

// TODO go to brand screen on brand click ...
export const SelectBrands = () => {

    const [found, setFound] = useState(brands);
    const [search, setSearch] = useState('');

    const filter = () => {
        let found = brands;
        if (search) {
            log({search});
            found = brands.filter(brand => brand.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        }
        setFound(found);
    }

    useEffect(filter, [search]);

    return <View style={defaultStyles.container}>
        <ScrollView style={{width: '100%'}}>
            <View style={defaultStyles.row}>
                <TouchableOpacity style={{position: 'relative', left: 10, zIndex: 1}}>
                    <Ionicons name={'search'} size={30} color={skyblue_2} />
                </TouchableOpacity>
                <TextInput style={{...defaultStyles.input, width: '100%', paddingLeft: 50, marginLeft: -30}}
                           onChangeText={setSearch} placeholder={'Search'} />
            </View>
            <View style={{...defaultStyles.row, flexWrap: 'wrap', marginTop: 15}}>
                {(found && found.length) ? found.map((item, key) => <View key={key} style={defaultStyles.brand}>
                        <Text>{item}</Text>
                    </View>) : <Text style={{width: '100%', textAlign: 'center'}}>No brands found</Text>}
            </View>
        </ScrollView>
    </View>

}
