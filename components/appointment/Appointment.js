import React, { Component } from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import ActionButtonApoint from "./action-button/ActionButtonApoint";
import TabAppointment from "./tab-appointment/TabAppointment";
import moment from "moment";
import appointmentApi from "../../api/appointment-api/appointmentApi";
import { NavigationEvents, withNavigation } from "react-navigation";
import { roomApi } from "../../api/room-api/roomApi";
class Appointment extends Component {
    static navigationOptions = {
        title: "Danh sách lịch hẹn",
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
        };
    }

    componentDidMount() {
        this.loadData();
        this.focusListener = this.props.navigation.addListener(
            "didFocus",
            () => {
                this.loadData();
            }
        );
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }
    loadData = async () => {
        let token = await AsyncStorage.getItem("token");
        let idPatient = JSON.parse(token).id;
        let rooms = await roomApi.getRooms(20, 1);
        let allAppointment = await appointmentApi.getListAppointmentById(
            idPatient,
            0
        );

        let oldAppointment = await appointmentApi.getListAppointmentById(
            idPatient,
            1
        );

        if (rooms.data.length != 0) {
            for (let i = 0; i < allAppointment.length; i++) {
                if (allAppointment[i].meta.room != null) {
                    let check = rooms.data.find(
                        e => e._id == allAppointment[i].meta.room
                    );

                    allAppointment[i].meta.roomName =
                        check &&
                        rooms.data.filter(
                            item => item._id == allAppointment[i].meta.room
                        )[0].name;
                }
            }

            for (let i = 0; i < oldAppointment.length; i++) {
                if (oldAppointment[i].meta.room != null) {
                    let check = rooms.data.find(
                        e => e._id == oldAppointment[i].meta.room
                    );

                    oldAppointment[i].meta.roomName =
                        check &&
                        rooms.data.filter(
                            item => item._id == oldAppointment[i].meta.room
                        )[0].name;
                }
            }
        }

        // sort by date
        allAppointment = allAppointment.sort((a, b) => {
            return (
                Date.parse(new Date(b.start)) - Date.parse(new Date(a.start))
            );
        });
        oldAppointment = oldAppointment.sort((a, b) => {
            return (
                Date.parse(new Date(b.start)) - Date.parse(new Date(a.start))
            );
        });

        let cancelAppointment = allAppointment.filter(item => {
            return (
                Date.parse(moment(item.start).format("YYYY/MM/DD HH:MM:SS")) -
                    6.5 * 60 * 60 * 1000 <
                Date.parse(moment(new Date()).format("YYYY/MM/DD HH:MM:SS"))
            );
        });
        let newAppointment = allAppointment.filter(item => {
            return (
                Date.parse(moment(item.start).format("YYYY/MM/DD HH:MM:SS")) -
                    6.5 * 60 * 60 * 1000 >
                Date.parse(moment(new Date()).format("YYYY/MM/DD HH:MM:SS"))
            );
        });

        let data = {
            newAppointment,
            oldAppointment,
            cancelAppointment,
        };

        this.setState({
            data: data,
            isLoading: false,
        });
    };

    render() {
        // console.log(this.state.data);
        // if (this.state.isLoading) {
        //     return (
        //         <View style={{ flex: 1, backgroundColor: "#EAEAEA" }}>
        //             <NavigationEvents onDidFocus={this.loadData} />
        //             <ActivityIndicator color="dodgeblue" size="large" />
        //         </View>
        //     );
        // }
        return (
            <View style={{ flex: 1, backgroundColor: "#EAEAEA" }}>
                {/* <NavigationEvents
                    onDidFocus={payload => {
                        this.loadData();
                    }}
                /> */}
                <TabAppointment data={this.state.data} />
                <ActionButtonApoint navigation={this.props.navigation} />
            </View>
        );
    }
}

// export default AppointmentStack;
export default withNavigation(Appointment);
