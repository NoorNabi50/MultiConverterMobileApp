import React, { useState } from 'react';
import { SafeAreaView, View, Image, Button, Alert, StyleSheet, Text, TextInput, StatusBar, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';



export default function App() {
  //state variables of component
  const [selectedUnit, setUnit] = useState(0); // State for the selected unit from the picker
  const [inputValue, setInputValue] = useState(''); // State for the input value
  const [placehodervalue, setPlaceholderValue] = useState('Select Unit First'); // State for the placeholder value
  const [isloading, setLoading] = useState(true); // State for the loading indicator


  //logic goes here
  function OnDropdownChange(val, index) {
    setPlaceholderValue(`${index == 0 ? 'Enter Unit First' : 'Enter Value in ' + val}`);
    setUnit(val);

  }

  function Calculate() {
    debugger;
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
          <Picker.Item label="Pounds" value="Pound" />
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
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    fontWeight: 'bold',
  }
});

