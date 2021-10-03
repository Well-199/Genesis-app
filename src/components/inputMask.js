import React from 'react';
import { Text, StyleSheet } from 'react-native';
import NumberFormat from 'react-number-format';

const InputMask = ({value}) => {
  return(
    <NumberFormat 
      value={parseFloat(value)}
      displayType={"text"}
      thousandSeparator={"."}
      decimalSeparator={","}
      fixedDecimalScale={true}
      decimalScale={2}
      prefix={"R$ "}
      renderText={item => <Text style={styles.maskText}>{item}</Text>}
    />
  );
};
const styles = StyleSheet.create({
  maskText:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
  }
})

export default InputMask;