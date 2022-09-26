import {ScrollView, View, Text, TextInput, Button} from "react-native";
import {defaultStyles} from "../styles/defaultStyles";
import {createContext, useContext, useState} from "react";
import {MainContext} from "../contexts/MainContext";
import {trimNumbers, validateNumbers} from "../common-js/common-js";
import Toast from 'react-native-toast-message';

const measurementsConstraints = {
    upperBust: {cm: {min: 60, max: 150}, in: {min: 25, max: 60}, name: 'Upper bust'},
    bustOrChest: {cm: {min: 60, max: 150}, in: {min: 25, max: 60}, name: 'Bust/Chest'},
    underBust: {cm: {min: 60, max: 150}, in: {min: 25, max: 60}, name: 'Under bust'},
    waist: {cm: {min: 50, max: 140}, in: {min: 21, max: 50}, name: 'Waist'},
    hips: {cm: {min: 70, max: 150}, in: {min: 25, max: 60}, name: 'Hips'},
    armLength: {cm: {min: 50, max: 100}, in: {min: 20, max: 30}, name: 'Arm length'},
    legLength: {cm: {min: 70, max: 100}, in: {min: 25, max: 40}, name: 'Leg length'},
    neckline: {cm: {min: 25, max: 70}, in: {min: 10, max: 30}, name: 'Neckline'}
}

// TODO maybe we need some input in the form of 1/4, 1/2, 3/4 instead of 0.25, 0.5, 0.75 for inches ...
const Measurement = ({name, nameKey}) => {

    // noinspection JSCheckFunctionSignatures
    const {metricSystem} = useContext(MainContext);

    const {newMeasurements, setNewMeasurements, red, setRed, isCm} = useContext(MeasurementsContext);

    const defaultValue = newMeasurements[nameKey];
    const onChangeText = text => {
        setRed({...red, [nameKey]: false});
        newMeasurements[nameKey][metricSystem] = text;
        setNewMeasurements(newMeasurements);
    }

    return <>
        <View style={defaultStyles.row}>
            <Text style={{width: '45%'}}>{name}</Text>
            <TextInput
                style={{...defaultStyles.input, backgroundColor: red[nameKey] ? 'rgba(239, 36, 36, 0.32)' : 'white'}}
                keyboardType={'numeric'}
                defaultValue={defaultValue[metricSystem] + ''}
                onChangeText={onChangeText}
            />
            <Text style={{marginLeft: 10}}>{isCm ? 'cm' : '\'\'' }</Text>
        </View>
        <View style={defaultStyles.hr} />
    </>
}

const MeasurementsContext = createContext(null);

// 1 in = 2.54 cm
const coefficient = 2.54;

// TODO try react hook form ...
export const Measurements = ({navigation, setMeasurements}) => {

    // noinspection JSCheckFunctionSignatures
    const {gender, measurements, metricSystem, isCm} = useContext(MainContext);

    const isWoman = gender === 'Woman';

    const [newMeasurements, setNewMeasurements] = useState(measurements);
    const [red, setRed] = useState({});

    const save = () => {

        let data = trimNumbers(newMeasurements, metricSystem);
        setNewMeasurements(data);

        // check if it is a valid number ... , -> .
        // validate (max and min in current metric system)
        if (!validateNumbers(data, setRed, metricSystem, measurementsConstraints)) {
            return;
        }

        let otherMetricSystem = metricSystem === 'cm' ? 'in' : 'cm';

        // recalculate values to other metric system
        for (let key of Object.keys(data)) {
            let value = data[key][metricSystem];
            if (isCm) {
                data[key][otherMetricSystem] = value / coefficient;
            } else {
                data[key][otherMetricSystem] = value * coefficient;
            }
            data[key][otherMetricSystem] = parseInt((data[key][otherMetricSystem] * 100) + '') / 100;
        }

        setMeasurements({...data});
        Toast.show({
            type: 'success',
            text1: 'Saved!',
            text2: 'Your measurements are successfully saved 😉'
        });
        navigation.navigate('SelectBrands');
    }

    return <MeasurementsContext.Provider value={{newMeasurements, setNewMeasurements, red, setRed}}>
        <View style={defaultStyles.container}>
            <ScrollView style={{width: '100%'}}>
                <View style={defaultStyles.hr} />
                {isWoman && <Measurement name={'Upper Bust'} nameKey={'upperBust'} />}
                {isWoman && <Measurement name={isWoman ? 'Bust' : 'Chest'} nameKey={'bustOrChest'} />}
                {isWoman && <Measurement name={'Under Bust'} nameKey={'underBust'} />}
                <Measurement name={'Waist'} nameKey={'waist'} />
                <Measurement name={'Hips'} nameKey={'hips'} />
                <Measurement name={'Arm Length'} nameKey={'armLength'} />
                <Measurement name={'Neckline'} nameKey={'neckline'} />
                <Button title={'Save'} onPress={save} />
            </ScrollView>
        </View>
    </MeasurementsContext.Provider>

}
