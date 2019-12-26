import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

class TitleListCls extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let { NgayKham } = this.props;
        let {ChanDoan} = this.props;
        // title = title.split('@');
        return (
            <View style={styles.container}>
                <View style={styles.allTextWrapper}>
                <Text style={styles.dateText}>
                    {moment(NgayKham).format("DD/MM/YYYY")}
                </Text>
                <Text style={styles.ChanDoanText}>
                    {ChanDoan}
                </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 1,
    },
    ChanDoanText: {
        fontWeight: "bold",
        fontSize: 14,
        color: 'dodgerblue'
    },
    dateText:{
        fontWeight: "bold",
        fontSize: 12,
        color: 'dodgerblue',
    },
    allTextWrapper:{
        marginLeft: 15
    },
    
});


export default TitleListCls;