import React, { Component } from "react"
import { View, Text, TouchableWithoutFeedback } from "react-native"
import * as firebase from "firebase"

const config = {
    apiKey: "AIzaSyALCyOfmrjrA2duKC043vjHHXqfu3sKwqU",
    authDomain: "yteso-3c594.firebaseapp.com",
    databaseURL: "https://yteso-3c594.firebaseio.com",
    projectId: "yteso-3c594",
    storageBucket: "",
    messagingSenderId: "836935484761",
    appId: "1:836935484761:web:3d57210131d755d8"
};

try {
    firebase.initializeApp(config);
} catch (e) {
    console.log('App reloaded, so firebase did not re-initialize');
}

class db extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount() {
        firebase.database().ref().child('Events').child('Create').on('child_added', (snapshot, prevChildKey) => {
            let val = snapshot.val();
            console.log(val + " " + prevChildKey);
        })
    }
    render() {
        return (
            <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Text>Cac</Text>
                <TouchableWithoutFeedback onPress={this.increase}>
                    <Text style={{ margin: 20 }}>Add</Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.addEvent}>
                    <Text style={{ margin: 20 }}>Click</Text>
                </TouchableWithoutFeedback>

                <Text>Cac</Text>


            </View>
        )
    }

    addCreate = () => {

    }

    addNode = () => {
        firebase.database().ref().child('counter2').child('30').remove();
        firebase.database().ref().child('counter2').on('value', snapshot => {
            let snapshot1 = snapshot.val();
            let arr = []
            Object.keys(snapshot1).map(key => arr.push([key, snapshot1[key]]));
            arr.sort((x, y) => x[1]["a"] - y[1]["a"]);
            let cur = 1;
            arr.forEach(a => {
                firebase.database().ref().child("counter2").child(a[0]).update({ "a": cur++ });
            });
            console.log(arr);
        });
    }


}

export default db;