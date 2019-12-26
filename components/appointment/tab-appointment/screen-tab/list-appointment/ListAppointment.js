import React, { Component } from "react";
import { ActivityIndicator, Text, RefreshControl, View, FlatList, AsyncStorage } from "react-native";
import appointmentApi from "../../../../../api/appointment-api/appointmentApi";
import ItemAppointment from "./item-appointment/ItemAppointment";
import moment from "moment";
import { w, h } from '../../../../../helpers/dimensions/dimensions';
export default class ListAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false
    };
  }

  // async componentDidMount() {
  //   this.loadData();
  // }

  // loadData = async () => {
  //   let { route } = this.props;
  //   let data;
  //   let token = await AsyncStorage.getItem("token");
  //   let idPatient = JSON.parse(token).id;
  //   let allAppointment = await appointmentApi.getListAppointmentById(idPatient, 0);
  //   let oldAppointment = await appointmentApi.getListAppointmentById(idPatient, 1);
  //   // console.log(newAppointment);
  //   let cancelAppointment = allAppointment.filter(item => {
  //     return (Date.parse(moment(item.start).format("YYYY/MM/DD")) < new Date().getTime())
  //   });
  //   let newAppointment = allAppointment.filter(item => {
  //     return (Date.parse(moment(item.start).format("YYYY/MM/DD")) > new Date().getTime())
  //   });
  //   if (route == "new") data = newAppointment;
  //   if (route == "old") data = oldAppointment;
  //   if (route == "cancel") data = cancelAppointment;
  //   this.setState({
  //     dataList: data,
  //     isLoading: false,
  //     refreshing: false
  //   });
  // };

  // onRefresh() {
  //   this.setState({ refreshing: true });
  //   this.loadData();
  // }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //         alignItems: "center",
    //         justifyContent: "center"
    //       }}
    //     >
    //       <ActivityIndicator style={{ color: "dodgerblue", size: "large" }} />
    //     </View>
    //   );
    // }
    if (this.props.data.length == 0) {
      return (
        <View style={{ top: (h(100) - 200) / 2, alignItems: 'center' }}><Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>Bạn chưa có thông tin lịch hẹn</Text></View>
      )
    }

    return (
      <View style={{ backgroundColor: "#EAEAEA" }}>
        {/* <StatusBar backgroundColor="#BCF6DA" barStyle="light-content" /> */}
        <FlatList
          // data={this.state.dataList}
          data= {this.props.data}
          renderItem={({ item }) => {
            return <ItemAppointment item={item} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          // refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}
        />
      </View>
    );
  }
}
