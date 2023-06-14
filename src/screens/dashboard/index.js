import React, {useEffect, useRef, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Appbar, TextInput, DataTable, Button} from 'react-native-paper';
import {Await, useNavigate} from 'react-router-native';
import axios from 'axios';
import call from 'react-native-phone-call';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import SingupDetails from '../singup';
import {Types} from 'mongoose';
import moment from 'moment';
import Container, {Toast} from 'toastify-react-native';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [aposBlood, setAposBlood] = useState([]);
  const [donateDate, setDonateDate] = useState('');
  const [id, setId] = useState('');
  const [current, setCurrent] = useState({});

  const triggleCall = (phoneNumber, id, item) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const datee = date.getDate().toString().padStart(2, '0');
    const format = `${year}-${month}-${datee}`;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const currentDatee = currentDate.getFullYear().toString().padStart(2, '0');
    const formatCurrentDate = `${currentYear}-${currentMonth}-${currentDatee}`;

    const date_1 = moment(item.date, 'YYYY-MM-DD');
    const date_2 = moment('2023,06,17', 'YYYY-MM-DD');

    const getDifference = date_1.diff(date_2, 'months', true);
    console.log(getDifference);

    if (!item.date || getDifference > 3) {
      let mainData = {currentId: id, date: new Date().toISOString()};

      item.date = mainData.date;
      setAllUsers([...allUsers]);

      // axios.post(`http://192.168.100.34:3005/currentUserDetails`, mainData).then(function (resp) {

      axios.post(`http://192.168.1.105:3005/currentUserDetails`, mainData);

      const args = {
        number: phoneNumber,
        prompt: false,
        skipCanOpen: true,
      };
      call(args).catch(console.error);
    } else if (getDifference <= 3) {
      Toast.error(`This Donar is not avaliable !`);
    }
    // });
  };

  const [values, setValue] = useState('');

  const onSearchPress = () => {
    setInput(currentValue => {
      return !currentValue;
    });
  };

  useEffect(function () {
    axios.get(`http://192.168.1.105:3005/all_users`).then(function (resp) {
      setAllUsers(resp.data);
    });
  }, []);

  return (
    <ScrollView>
      <View>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigate('/')} />
          <Appbar.Action icon="magnify" onPress={onSearchPress} />
        </Appbar.Header>
        {input ? (
          <TextInput
            onChangeText={obj => {
              if (obj == 'A+') {
                const aWalyUsers = allUsers.filter(
                  user =>
                    user.userBloodGroup == 'A+' ||
                    user.userBloodGroup == 'A-' ||
                    user.userBloodGroup == 'O+' ||
                    user.userBloodGroup == 'O-',
                );
                setAposBlood(aWalyUsers);
              } else if (obj == 'O+') {
                const aWalyUsers = allUsers.filter(
                  user =>
                    user.userBloodGroup == 'O+' || user.userBloodGroup == 'O-',
                );
                setAposBlood(aWalyUsers);
              } else if (obj == 'B+') {
                const aWalyUsers = allUsers.filter(
                  user =>
                    user.userBloodGroup == 'B+' ||
                    user.userBloodGroup == 'B-' ||
                    user.userBloodGroup == 'O+' ||
                    user.userBloodGroup == 'O-',
                );
                setAposBlood(aWalyUsers);
              } else if (obj == 'AB+') {
                const aWalyUsers = allUsers.map(user => user);
                setAposBlood(aWalyUsers);
              } else if (obj == 'A-') {
                const aWalyUsers = allUsers.filter(
                  user =>
                    user.userBloodGroup == 'A-' || user.userBloodGroup == 'O-',
                );
                setAposBlood(aWalyUsers);
              } else if (obj == 'O-') {
                const aWalyUsers = allUsers.filter(
                  user => user.userBloodGroup == 'O-',
                );
                setAposBlood(aWalyUsers);
              } else if (obj == 'B-') {
                const aWalyUsers = allUsers.filter(
                  user =>
                    user.userBloodGroup == 'B-' || user.userBloodGroup == 'O-',
                );
                setAposBlood(aWalyUsers);
              } else if (obj == 'AB-') {
                const aWalyUsers = allUsers.filter(
                  user =>
                    user.userBloodGroup == 'AB-' ||
                    user.userBloodGroup == 'A-' ||
                    user.userBloodGroup == 'B-' ||
                    user.userBloodGroup == 'O-',
                );
                setAposBlood(aWalyUsers);
              }

              setValue(obj);
            }}
            style={styles.input}
            placeholder="Enter blood group"
          />
        ) : (
          <Text style={styles.bloodheading}>Find Blood Group</Text>
        )}

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Blood Group</DataTable.Title>
            <DataTable.Title>Contact</DataTable.Title>
          </DataTable.Header>
        </DataTable>

        <DataTable>
          {aposBlood.map((item, i) => (
            <DataTable.Row>
              <DataTable.Cell>{item.userName}</DataTable.Cell>
              <DataTable.Cell>{item.userBloodGroup}</DataTable.Cell>
              <DataTable.Cell
                onPress={() => {
                  // setId();
                  triggleCall(item.userNumber, item._id, item);
                }}>
                {item.userNumber}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    marginHorizontal: 20,
  },
  filteredUser: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filteredUsers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bloodheading: {
    fontSize: 30,
    fontWeight: '500',
    color: 'red',
    textAlign: 'center',
    paddingVertical: 5,
  },
});

export default UserDashboard;
