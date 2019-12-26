import React, { Component } from 'react';
import { View,ActivityIndicator} from 'react-native';
import ListAppointment from './list-appointment/ListAppointment'

export default class NewAppointment extends Component {
    render() {
        let {screenProps} = this.props;
        if(screenProps == null){
            return (
                <View
                  style={{
                    flex:1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <ActivityIndicator size="large" color="dodgerblue" />
                </View>
              );}
        return (
            <View>
                <ListAppointment  data={screenProps.newAppointment}  route="new"/>
            </View>

        );
    }
}