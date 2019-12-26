import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {FontAwesome, AntDesign} from 'react-native-vector-icons'

import mainColor from '../../constants'

const Tel = ({
  name,
  phoneNumber,
  onPressSms,
  onPressTel,
}) => {
  return (
    <TouchableOpacity onPress={() => onPressTel(phoneNumber)}>
      <View style={styles.container}>
        <View style={styles.iconRow}>
          <FontAwesome
            name="phone"
            underlayColor="transparent"
            size={30}
            color={mainColor}
            onPress={() => onPressTel(phoneNumber)}
          />

        </View>
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>{phoneNumber}</Text>
          </View>
          <View style={styles.telNameColumn}>
            {name.trim().length !== 0 && (
              <Text style={styles.telNameText}>{name}</Text>
            )}
          </View>
        </View>
        <View style={styles.smsRow}>
          <AntDesign
            name="message1"
            underlayColor="transparent"
            size={25}
            color={'gray'}
            onPress={() => onPressSms()}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
    marginTop: 25
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  smsRow: {
    flex: 2,
    justifyContent: 'flex-start',
  },

  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})


export default Tel
