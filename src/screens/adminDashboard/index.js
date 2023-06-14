import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import { Button } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
const AdminDashboard = () => {
 
    const navigate = useNavigate()

  return (
      <View style={styles.main}>  
          <Button textColor='white' style={styles.singUp} onPress={() => navigate('/singupForm')} >Add User</Button>
      </View>
  )
}

const styles = StyleSheet.create({
    main: {
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    singUp:{
        width:180,
        height:55,
        backgroundColor:'red',
        display:'flex',
        justifyContent:'center',
    },
})

export default AdminDashboard;