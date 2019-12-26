import React, { Component } from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; // 6.2.2
// import { Ionicons, MaterialIcons, MaterialCommunityIcons } from 'react-native-vector-icons'; // 6.2.2
import { createMaterialTopTabNavigator, createStackNavigator,  createAppContainer } from 'react-navigation';
// import ListAppointment from './list-item/ListAppointment';
import CancelAppointment from './screen-tab/CancelAppointment';
import NewAppointment from './screen-tab/NewAppointment';
import OldAppointment from './screen-tab/OldAppointment';


const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    //   let IconComponent = Ionicons;
    let iconName;
    if (routeName === 'Tất cả') {
        iconName = 'check-all';
        return <MaterialCommunityIcons name={iconName} size={20} color={tintColor} />

    } else if (routeName === 'Sắp tới') {
        iconName = 'new-box';
        return <MaterialCommunityIcons name={iconName} size={20} color={tintColor} />

    } else if (routeName === 'Đã khám') {
        iconName = 'history';
        return <MaterialIcons name={iconName} size={20} color={tintColor} />
    }

};

class TabAppointmentClass extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        // console.log(this.props);
        let {data} = this.props;
        return (
            <TabAppointment screenProps={data}/>
        )
    }
}
const TabAppointment = createAppContainer(createMaterialTopTabNavigator(
    {
        "Trễ lịch": { screen: CancelAppointment },
        "Sắp tới": { screen: NewAppointment },
        "Đã khám": { screen: OldAppointment }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'lightgreen',
            // showIcon: true,
            showLabel: true,
            upperCaseLabel: false,
            inactiveBackgroundColor: 'white',
            style: {
                backgroundColor: "#17B890",
            },
            labelStyle: {
                fontWeight: 'bold',
                fontSize: 15
            },
            indicatorStyle: {
                backgroundColor: 'white'
            }
        },
        backBehavior: 'none',
        navigationOptions: ({
            header: null,
        
        }),
        // lazy: true,
        initialRouteName: "Sắp tới",
        order: ['Sắp tới', 'Đã khám', 'Trễ lịch'],
    }
));

export default TabAppointmentClass;