import React, { Component } from 'react';
import { View , ActivityIndicator} from 'react-native';
import ListAppointment from './list-appointment/ListAppointment';
export default class CancelAppointment extends Component {
    render() {
        let {screenProps} = this.props;
        // console.log(screenProps);
        if(screenProps == null){
            return (
                <View
                  style={{
                    flex:1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <ActivityIndicator style={{ color: "dodgerblue", size: "large" }} />
                </View>
              );
        }
        return (
            <View style={{flex: 1}}>
                <ListAppointment data={screenProps.cancelAppointment} route="cancel" />
            </View>

        );
    }
}