import {View, StyleSheet, Text} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {Navigate, useNavigate, useParams} from 'react-router-native';
import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import CustomInput from '../input';
import axios from 'axios';
import Container, {Toast} from 'toastify-react-native';



const LoginDetails = () => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const {handleSubmit, control} = useForm();

  const onLogInPressed = data => {
    axios.post(`http://192.168.1.105:3005/login`, data).then(function (resp) {
      if (resp.data.type == 'Patient' || resp.data.type == 'Donner') {
        navigate('/userdashboard');
        Toast.success('Login Successfully');
      } else if (resp.data.type == 'Admin') {
        navigate('/admindashboard');
      }
    });
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigate('/')} />
      </Appbar.Header>

      <View>
        <Text style={styles.title}>Login Form :</Text>
      </View>
      <View style={styles.container}>
        <CustomInput
          name="userEmail"
          control={control}
          placeholder="Enter your email"
          label="Enter your email"
          rules={{pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
        />

        <CustomInput
          name="userPassword"
          control={control}
          placeholder="Enter your password"
          label="Enter your password"
          secureTextEnter
          rules={{
            required: 'User Password is required',
            minLength: {
              value: 8,
              message: 'Password should be minimum 8 characters',
            },
          }}
        />

        <Button
          icon="account-arrow-right"
          mode="contained"
          onPress={handleSubmit(onLogInPressed)}>
          {' '}
          Log In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 35,
    color: 'white',
    paddingVertical: 30,
    paddingLeft: 10,
  },
});

export default LoginDetails;
