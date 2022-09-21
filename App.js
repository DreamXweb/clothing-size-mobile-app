import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import {Settings} from "./screens/Settings";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Measurements} from "./screens/Measurements";
import {MainContext} from "./contexts/MainContext";
import Toast from 'react-native-toast-message';
import Preference from 'react-native-preference';
import {notifyError} from "./common-js/common-js";
import {log} from "./common-js/common-js";

const Tab = createBottomTabNavigator();

export default function App() {

  // Attempt to invoke virtual method ' int java.util.ArrayList.size()' on a null object reference without this line
  Preference.setWhiteList([]);

  // take from prefs ...
  const [gender, setGender] = useState(Preference.get('gender') || 'Woman');
  const [metricSystem, setMetricSystem] = useState(Preference.get('metricSystem') || 'in');
  // default values ... saved in cms and inches
  // TODO do not use woman's upperBust and underBust when it is a man
  const [measurements, setMeasurements] = useState({
    upperBust: {cm: Preference.get('upperBustCm') || 93, in: Preference.get('upperBustIn') || 36.6},
    bustOrChest: {cm: Preference.get('bustOrChestCm') || 96, in: Preference.get('bustOrChestIn') || 37.75},
    underBust: {cm: Preference.get('underBustCm') || 80, in: Preference.get('underBustIn') || 31.5},
    waist: {cm: Preference.get('waistCm') || 80, in: Preference.get('waistIn') || 31.5},
    hips: {cm: Preference.get('hipsCm') || 99, in: Preference.get('hipsIn') || 38.75},
    armLength: {cm: Preference.get('armLengthCm') || 60.4, in: Preference.get('armLengthIn') || 23.75},
    legLength: {cm: Preference.get('legLengthCm') || 78, in: Preference.get('legLengthIn') || 30.75},
    neckline: {cm: Preference.get('necklineCm') || 39, in: Preference.get('necklineIn') || 15.25}
  });

  useEffect(() => {
    Preference.set('gender', gender + '').then().catch(notifyError);
  }, [gender]);

  useEffect(() => {
    Preference.set('metricSystem', metricSystem + '').then().catch(notifyError);
  }, [metricSystem]);

  useEffect(() => {
    log({measurements});
    Preference.set('upperBustCm', measurements.underBust.cm + '').then().catch(notifyError);
    Preference.set('upperBustIn', measurements.underBust.in + '').then().catch(notifyError);
    Preference.set('bustOrChestCm', measurements.bustOrChest.cm + '').then().catch(notifyError);
    Preference.set('bustOrChestIn', measurements.bustOrChest.in + '').then().catch(notifyError);
    Preference.set('underBustCm', measurements.underBust.cm + '').then().catch(notifyError);
    Preference.set('underBustIn', measurements.underBust.in + '').then().catch(notifyError);
    Preference.set('waistCm', measurements.waist.cm + '').then().catch(notifyError);
    Preference.set('waistIn', measurements.waist.in + '').then().catch(notifyError);
    Preference.set('hipsCm', measurements.hips.cm + '').then().catch(notifyError);
    Preference.set('hipsIn', measurements.hips.in + '').then().catch(notifyError);
    Preference.set('armLengthCm', measurements.armLength.cm + '').then().catch(notifyError);
    Preference.set('armLengthIn', measurements.armLength.in + '').then().catch(notifyError);
    Preference.set('legLengthCm', measurements.legLength.cm + '').then().catch(notifyError);
    Preference.set('legLengthIn', measurements.legLength.in + '').then().catch(notifyError);
    Preference.set('necklineCm', measurements.neckline.cm + '').then().catch(notifyError);
    Preference.set('necklineIn', measurements.neckline.in + '').then().catch(notifyError);
  }, [measurements]);

  const isCm = metricSystem === 'cm';

  return (
      <MainContext.Provider value={{gender, metricSystem, measurements, isCm}}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Settings">
            <Tab.Screen
                name={'Settings'}
                children={() => <Settings setSex={setGender} setMetricSystem={setMetricSystem} />}
                options={{tabBarIcon: ({ focused, color, size }) =>
                      <Ionicons name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'} size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name={'Measurements'}
                children={() => <Measurements setMeasurements={setMeasurements} />}
                options={{tabBarIcon: ({ focused, color, size }) =>
                      <Ionicons name={focused ? 'ios-ellipsis-horizontal-circle' : 'ios-ellipsis-horizontal-circle-outline'} size={size} color={color} />,
                }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <Toast />
      </MainContext.Provider>
  );

}
