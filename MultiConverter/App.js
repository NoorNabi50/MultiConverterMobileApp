import React, { useState } from 'react';
import { SafeAreaView, View, Image, Button, Alert, StyleSheet, Text, TextInput, StatusBar, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';



export default function App() {
  //state variables of component
  const [selectedUnit, setUnit] = useState(0);
  const [selectedIndex, setIndex] = useState(0);

  const [inputValue, setInputValue] = useState('');
  const [placehodervalue, setPlaceholderValue] = useState('Select Unit First');
  const [isloading, setLoading] = useState(false);
  const [ShowElement, setElement] = useState(false);
  const [firstBox, setFirstBox] = useState({ UnitName: '', UnitValue: '' });
  const [secondBox, setSecondBox] = useState({ UnitName: '', UnitValue: '' });
  const [thirdBox, setThirdBox] = useState({ UnitName: '', UnitValue: '' });

  //logic goes here
  function OnDropdownChange(val, index) {
    setPlaceholderValue(`${index == 0 ? 'Enter Unit First' : 'Enter Value in ' + val}`);
    setUnit(val);
    setIndex(index);

    if(index > 0)
       Converter[index]();
  }


  function Reset()
  {
    setInputValue('');
    setPlaceholderValue('Select Unit First');
    setUnit(0);
    setIndex(0);
    setElement(false);

  }

  function Calculate() {
    console.log(selectedUnit);
    let message = "";
    if (inputValue == 0 & selectedUnit == 0) {
      message = "SELECT UNIT AND ENTER INPUT VALUE!!!";
    }
    if (inputValue == 0) {
      message = "ENTER INPUT VALUE!!!";
    }
    if (selectedUnit == 0) {
      message = "SELECT UNIT!!!";
    }
    if (message != "") {
      Alert.alert(
        message,
        "",
        [
          { text: "OK" }
        ]
      );
      return;
    }
    setElement(true)
    Converter[selectedIndex]();
  }



  const Converter = {
    1: ConvertPound,
    2: ConvertGrams,
    3: ConvertKilograms,
    4: Ounces,
  }





  function ConvertPound() {
    setFirstBox(prev => ({ ...prev, UnitName: 'Grams', UnitValue: inputValue * 454 }));
    setSecondBox(prev => ({ ...prev, UnitName: 'Kilograms', UnitValue: inputValue / 2.205 }));
    setThirdBox(prev => ({ ...prev, UnitName: 'Ounces', UnitValue: inputValue * 16 }));
  }

  function ConvertGrams() {
    setFirstBox(prev => ({ ...prev, UnitName: 'Pounds', UnitValue: inputValue / 454 }));
    setSecondBox(prev => ({ ...prev, UnitName: 'Kilograms', UnitValue: inputValue / 1000 }));
    setThirdBox(prev => ({ ...prev, UnitName: 'Ounces', UnitValue: inputValue / 28.35 }));
  }

  function ConvertKilograms() {
    setFirstBox(prev => ({ ...prev, UnitName: 'Pounds', UnitValue: inputValue * 2.205 }));
    setSecondBox(prev => ({ ...prev, UnitName: 'Grams', UnitValue: inputValue * 1000 }));
    setThirdBox(prev => ({ ...prev, UnitName: 'Ounces', UnitValue: inputValue * 35.274 }));
  }

  function Ounces() {
    setFirstBox(prev => ({ ...prev, UnitName: 'Pounds', UnitValue: inputValue / 16 }));
    setSecondBox(prev => ({ ...prev, UnitName: 'Kilograms', UnitValue: inputValue * 35.274 }));
    setThirdBox(prev => ({ ...prev, UnitName: 'Grams', UnitValue: inputValue * 28.35 }));
  }


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.navbar}>
          MultiConverter

          <Image style={{
            width: 25,
            height: 25,
            borderRadius: 10,
            marginLeft: 20
          }}
            source={require('./assets/Images/logo.jpg')}
          ></Image>
        </Text>
      </View>
      <View style={styles.DropdownsArea}>

        <Picker style={styles.picker}
          selectedValue={selectedUnit}
          onValueChange={OnDropdownChange}>

          <Picker.Item label="Select Unit" value="Enter Unit First" />
          <Picker.Item label="Pounds" value="Pounds" />
          <Picker.Item label="Grams" value="Grams" />
          <Picker.Item label="Kilograms" value="Kilograms" />
          <Picker.Item label="Ounces" value="Ounces" />

        </Picker>

        <TextInput style={styles.InputField} onChangeText={(text) => setInputValue(text)} value={inputValue} keyboardType="numeric" placeholder={placehodervalue} />

        <View style={{
          margin: 50,
          width: 200,
          height: 50,

        }}>
          <Button onPress={Calculate} title="Calculate" />
          <ActivityIndicator size="large" animating={isloading} color="blue" />
        </View>
        <View display={ShowElement ? 'flex' : 'none'} style={[styles.OutputBox, { backgroundColor: '#007bff' }]}>
          <Text> {firstBox.UnitValue} {firstBox.UnitName}</Text>
        </View>
        <View display={ShowElement ? 'flex' : 'none'} style={[styles.OutputBox, { backgroundColor: '#28a745' }]}>
          <Text> {secondBox.UnitValue} {secondBox.UnitName} </Text>
        </View>
        <View display={ShowElement ? 'flex' : 'none'} style={[styles.OutputBox, { backgroundColor: '#dc3545' }]}>
          <Text> {thirdBox.UnitValue} {thirdBox.UnitName} </Text>
        </View>

           <View style={{ margin: 50,   width: 200, height: 50,   }} display={ShowElement ? 'flex' : 'none'}>
           <Button  onPress={Reset} color="red" title="Clear" />
      </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'whitesmoke',
  },
  navbar: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#2196F3',
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 5,
    letterSpacing: 4
  },
  picker: {
    borderRadius: 50,
    backgroundColor: 'teal',
    color: 'white',
    height: 40,
    textAlign: 'center',

  },
  DropdownsArea: {
    marginTop: 20,
    margin: 30,
    marginLeft: 50,
  },
  InputField: {
    borderRadius: 30,
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    fontWeight: 'bold',
  },
  OutputBox: {
    marginTop: 10,
    height: 50,
    borderRadius: 10,
    padding: 10,
  }
});

