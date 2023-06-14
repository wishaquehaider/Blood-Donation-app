import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigate} from 'react-router-native';
import MapView from 'react-native-maps';
import {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

const MainScreen = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.main}>
    <Pressable onPress={() => navigate('/')}>
        <View  style={styles.container}>
          <Button textColor='white' style={styles.logIn} onPress={() => navigate('/loginForm')} >Login</Button>
     </View>
     </Pressable>
     </View>

  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    // width:100,
    width: '100%',
    height: 130,
    display: 'flex',
    justifyContent: 'space-between',
  },
  friend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePicture: {
    marginRight: 8,
  },
  singUp: {
    width: 180,
    height: 55,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
  },
  logIn: {
    width: 180,
    height: 55,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default MainScreen;
