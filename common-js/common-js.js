import Toast from "react-native-toast-message";

export const log = (obj) => {
    let key = Object.keys(obj)[0];
    console.log(key + ' = ', obj[key]);
}

const replaceAll = (value, from, to) => {
    while (value.indexOf(from) !== -1) {
        value = value.replace(from, to);
    }
    return value;
}

export const trimNumbers = (data, metricSystem) => {
    for (let key of Object.keys(data)) {
        let value = data[key][metricSystem]
        if (typeof value !== 'number') {
            data[key][metricSystem] = replaceAll(value.trim(),',','.');
        }
    }
    return data;
}

export const validateNumbers = (data, setRed, metricSystem, measurementsConstraints) => {
    let valid = true;
    let red = {};
    for (let key of Object.keys(data)) {
        let value = data[key][metricSystem];
        if (typeof value === 'number') {
            continue;
        }
        const noValid = () => {
            red[key] = true;
            valid =  false;
        }
        let number = parseFloat(value);
        if (number + '' !== value) {
            noValid();
        } else {
            let constraints = measurementsConstraints[key];
            let minMax = constraints[metricSystem];
            if (number < minMax.min) {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: constraints.name + ' cannot be less than ' + minMax.min + ' ' + metricSystem + ' 😧'
                });
                noValid();
            } else if (number > minMax.max) {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: constraints.name + ' cannot be more than ' + minMax.max + ' ' + metricSystem + ' 😧'
                });
                noValid();
            }

        }
    }
    setRed(red);
    return valid;
}

export const notifyError = error => {
    log({error});
    Toast.show({
        type: 'error',
        text1: 'Unknown error!',
        text2: error + ''
    });
}
