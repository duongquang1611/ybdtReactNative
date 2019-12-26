import React from 'react'
import {View, ImageBackground, Text, StyleSheet, Platform, Image} from 'react-native'
import {MaterialIcons} from 'react-native-vector-icons'
import PropTypes from "prop-types";

const Header = ({avatar, avatarBackground, name, address}) => {
  return(
    <View>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={20}
          source={
            require('../../../assets/blurbgbv.png')
          }
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: " "
              }}
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <MaterialIcons
                  name="place"
                  underlayColor="transparent"
                  size={30}
                  color={'white'}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>{address}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        
    </View>
  )

}



const styles = StyleSheet.create({
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 35
      },
      
      headerColumn: {
        backgroundColor: "transparent",
        ...Platform.select({
          ios: {
            alignItems: "center",
            elevation: 1,
            marginTop: -1
          },
          android: {
            alignItems: "center"
          }
        })
      },
      placeIcon: {
        color: "white",
        fontSize: 25
      },

      userAddressRow: {
        alignItems: "center",
        flexDirection: "row"
      },
      userCityRow: {
        backgroundColor: "transparent"
      },
      userCityText: {
        color: "#A5A5A5",
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center"
      },
      userImage: {
        borderColor: "transparent",
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170
      },
      userNameText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 8,
        textAlign: "center"
      }
});

export default Header;