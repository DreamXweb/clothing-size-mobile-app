import {View, Text} from "react-native";
import React, {useContext} from "react";
import {defaultStyles} from "../styles/defaultStyles";
import SelectDropdown from 'react-native-select-dropdown'
import {MainContext} from "../contexts/MainContext";

const genders = ["Man", "Woman"];
const metricSystems = ['cm', 'in'];

export const Settings = ({setSex, setMetricSystem}) => {

    // noinspection JSCheckFunctionSignatures
    const {gender, metricSystem} = useContext(MainContext);

    return <View style={defaultStyles.container}>

        <View style={defaultStyles.row}>
            <Text style={{width: '35%'}}>Gender:</Text>
            <SelectDropdown
                data={genders}
                onSelect={selectedItem => setSex(selectedItem)}
                buttonTextAfterSelection={selectedItem => selectedItem}
                rowTextForSelection={item => item}
                defaultValue={gender}
                defaultButtonText={'Select'}
            />
        </View>

        <View style={{height: 10}} />

        <View style={defaultStyles.row}>
            <Text style={{width: '35%'}}>Metric system:</Text>
            <SelectDropdown
                data={metricSystems}
                onSelect={selectedItem => setMetricSystem(selectedItem)}
                buttonTextAfterSelection={selectedItem => selectedItem}
                rowTextForSelection={item => item}
                defaultValue={metricSystem}
                defaultButtonText={'Select'}
            />
        </View>

    </View>
}
