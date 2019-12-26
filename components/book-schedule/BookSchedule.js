import React from "react";
import { View, ActivityIndicator, Text, Dimensions } from "react-native";
import Calendar from "./calendar/Calendar";
import ListTimeSchedule from "./list-time-schedule/ListTimeSchedule";
import { ScheduleApi } from "../../api/schedule-api/scheduleApi";
import { roomApi } from "../../api/room-api/roomApi";
import { doctorApi } from "../../api/doctor-api/doctorApi";
import { addDate } from "../../helpers/date/formatDate";
import RoomDoctor from "./room-doctor/RoomDoctor";

class BookSchedule extends React.Component {
  static navigationOptions = {
    title: "Đặt lịch"
  };
  constructor(props) {
    super(props);
    this.state = {
      datePicker: new Date(),
      listCountSchedule: [],
      rooms: [],
      doctors: [],
      roomSelect: {},
      doctorSelect: {},
      isLoadingSchedule: true,
      zoomOut: false
    };
  }

  async componentDidMount() {
    let rooms = await roomApi.getRooms(20, 1);
    this.setState({ rooms: rooms.data });
  }

  countPatientFormTimeSchedule = (hour, listSchedule) => {
    let countWithHour = [{ hour, minute: "00", count: 0 }, { hour, minute: "30", count: 0 }];
    listSchedule.forEach(schedule => {
      let time = new Date(schedule.start);

      if (time.getHours() - 7 == hour && time.getMinutes() < 30) {
        countWithHour[0].count++;
      }
      if (time.getHours() - 7 == hour && time.getMinutes() >= 30) {
        countWithHour[1].count++;
      }
    });
    return countWithHour;
  };

  updateDatePicker = async date => {
    this.setState(
      {
        datePicker: date
      },
      () => this.updateListSchedule()
    );
  };

  handleGetRoom = async room => {
    let doctors = await doctorApi.getDoctorByRoom(room._id);
    if (doctors.data) {
      this.setState(
        {
          roomSelect: { id: room._id, name: room.name },
          doctors: doctors.data
        },
        () => this.updateListSchedule()
      );
    }
  };
  handleGetDoctor = doctor => {
    this.setState(
      {
        doctorSelect: { id: doctor.id, name: doctor.name }
      },
      () => this.updateListSchedule()
    );
  };

  updateListSchedule = async () => {
    let listCountSchedule = [];
    if (this.state.roomSelect.id && this.state.doctorSelect.id) {
      this.setState(
        {
          listCountSchedule: listCountSchedule,
          isLoadingSchedule: true
        },
        async () => {
          let nextDate = addDate(this.state.datePicker, 1);
          let from = `${this.state.datePicker.getFullYear()}-${this.state.datePicker.getMonth() +
            1}-${this.state.datePicker.getDate()}`;
          let to = `${nextDate.getFullYear()}-${nextDate.getMonth() + 1}-${nextDate.getDate()}`;
          let listSchedule = await ScheduleApi.getScheduleByDate(
            from,
            to,
            -1,
            this.state.roomSelect.id,
            this.state.doctorSelect.id
          );

          for (let i = 7; i < 17; i++) {
            listCountSchedule = [...listCountSchedule, ...this.countPatientFormTimeSchedule(i, listSchedule.data)];
          }
          this.setState({
            listCountSchedule: listCountSchedule,
            isLoadingSchedule: false
          });
        }
      );
    } else {
      this.setState({
        listCountSchedule: listCountSchedule,
        isLoadingSchedule: false
      });
    }
  };

  handleScrollListTime = offsetY => {
    if (offsetY > 100 && !this.state.zoomOut) {
      this.setState({ zoomOut: true });
    }
    if (offsetY < 100 && this.state.zoomOut) {
      this.setState({ zoomOut: false });
    }
  };

  checkRoomDoctor = () => {
    if (this.state.roomSelect.id && this.state.doctorSelect.id) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
        <Calendar updateDatePicker={this.updateDatePicker} zoomOut={this.state.zoomOut} />

        <RoomDoctor
          rooms={this.state.rooms}
          doctor={this.state.doctors}
          getRoom={this.handleGetRoom}
          getDoctor={this.handleGetDoctor}
        />

        {this.state.isLoadingSchedule ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: 50
            }}
          >
            <ActivityIndicator size="small" />
          </View>
        ) : this.checkRoomDoctor() ? (
          <ListTimeSchedule
            navigation={this.props.navigation}
            date={this.state.datePicker}
            room={this.state.roomSelect}
            doctor={this.state.doctorSelect}
            datePicker={this.state.datePicker}
            listCountSchedule={this.state.listCountSchedule}
          />
        ) : (
          <View style={{ flex: 1, marginTop: 10, backgroundColor: "white", alignItems: "center", paddingTop: 20 }}>
            <Text>Hãy chọn khoa phòng và bác sĩ để xem lịch</Text>
          </View>
        )}
      </View>
    );
  }
}

export default BookSchedule;
