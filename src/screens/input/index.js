import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

const CustomInput = ({control, name, placeholder,label, rules = {}, secureTextEnter}) => {

  return (

         <View>
       <Controller
         control={control}
         name={name}
         rules={rules}
         render={({field: {value, onChange, onBlur} ,fieldState:{error}}) => {
          return  <>
          <TextInput
            style={styles.container}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mode="outlined"
            label={label}
            placeholder={placeholder}
            secureTextEntry={secureTextEnter}
            />
            { error && <Text style={styles.err}>{ error.message || 'error'}</Text>} 
            </>
        }} 
        />
        </View>
    
  )
};

const styles = StyleSheet.create({
     err:{
        color:'red'
    }
})

export default CustomInput;