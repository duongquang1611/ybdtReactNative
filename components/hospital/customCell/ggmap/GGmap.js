import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {FontAwesome} from "react-native-vector-icons"

import mainColor from '../../constants'


const GGmap = ({ onPressGG, name, location }) => (
  <TouchableOpacity onPress={() => onPressGG()}>
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <FontAwesome
          name="map"
          underlayColor="transparent"
          size={25}
          color={mainColor}
          onPress={() => onPressGG()}
        />
      </View>
      <View style={styles.ggRow}>
        <View style={styles.ggColumn}>
          <Text style={styles.ggText}>{location}</Text>
        </View>
        <View style={styles.ggNameColumn}>
          {name.trim().length !== 0 && (
            <Text style={styles.ggNameText}>{name}</Text>
          )}
        </View>
      </View>
    </View>
  </TouchableOpacity>
)


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
    marginTop: 25

  },
  ggColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
 
  ggNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  ggNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  ggRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  ggText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default GGmap
