import React from 'react';
import { Text, View } from 'react-native';

const ShowOutput = (props) => {
    return (
      <View style={{alignItems: 'center',backgroundColor:props.bgColor,marginTop:10}}>
        <Text>Hello {props.value}!</Text>
      </View>
    );
}