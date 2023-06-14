import {ImageBackground, StyleSheet, View} from 'react-native';
import {PaperProvider, Text} from 'react-native-paper';
import {BottomNavigation as Screens} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useState} from 'react';
import MainScreen from './src/screens/buttons';
import {NativeRouter, Routes, Route} from 'react-router-native';
import SingupDetails from './src/screens/singup';
import LoginDetails from './src/screens/login';
import UserDashboard from './src/screens/dashboard';
import AdminDashboard from './src/screens/adminDashboard';
import React from 'react';
import {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Container, {Toast} from 'toastify-react-native';

const App = () => {
  // const image = {uri: 'https://img.freepik.com/free-vector/world-blood-donor-day-realistic-illustration_23-2149393892.jpg?w=740&t=st=1686611733~exp=1686612333~hmac=06fe7c0bc1a778c58c8c43759cd51469d6113104fc440de2ff8ba9684446af06'}

  return (
    <>
      <SafeAreaProvider>
        <PaperProvider>
          <Container position="top" />
          <NativeRouter>
            <Routes>
              <Route path="/" element={<MainScreen />} />
              <Route path="/singupForm" element={<SingupDetails />} />
              <Route
                path="/singupForm/:donateDate"
                element={<SingupDetails />}
              />
              <Route path="/loginForm" element={<LoginDetails />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
            </Routes>
          </NativeRouter>
        </PaperProvider>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'red',
    backgroundColor: 'white',
    marginBottom: 70,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});

export default App;
