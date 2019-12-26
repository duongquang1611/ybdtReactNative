import React, { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { getMonday, addDate } from "../../../helpers/date/formatDate";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  DatePickerAndroid,
  DatePickerIOS,
  Dimensions,
  Platform,
  Animated
} from "react-native";

function Calendar(props) {
  const [startOfWeek, setStartOfWeek] = useState(getMonday(new Date()));
  const [datePicker, setDatePicker] = useState(new Date());
  const [canPrev, setCanPrev] = useState(false);
  const [openDatePickerIOS, setOpenDatePickerIOS] = useState(false);
  const [dateIOSChange, setDateIOSChange] = useState(new Date());

  const { width, height } = Dimensions.get("window");

  let toDaySting = `${datePicker.getDate()}-${datePicker.getMonth() + 1}-${datePicker.getFullYear()}`;
  let monday = addDate(startOfWeek, 0);
  let tuesday = addDate(startOfWeek, 1);
  let wednesday = addDate(startOfWeek, 2);
  let thursday = addDate(startOfWeek, 3);
  let friday = addDate(startOfWeek, 4);
  let saturday = addDate(startOfWeek, 5);
  let sunday = addDate(startOfWeek, 6);

  useEffect(
    () => {
      if (startOfWeek.getMonth() < new Date().getMonth()) {
        setCanPrev(false);
      } else if (startOfWeek.getMonth() > new Date().getMonth() || startOfWeek.getFullYear() > new Date().getFullYear()) {
        setCanPrev(true);
      } else {
        if (getMonday(startOfWeek).getDate() > getMonday(new Date()).getDate()) {
          setCanPrev(true);
        } else {
          setCanPrev(false);
        }
      }
    },
    [startOfWeek]
  );

  useEffect(
    () => {
      props.updateDatePicker(datePicker);
    },
    [datePicker]
  );

  changeActiveDate = date => {
    setDatePicker(date);
  };

  openDatePicker = text => async () => {
    if (Platform.OS === "ios") {
      setOpenDatePickerIOS(true);
    } else {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          minDate: new Date(),
          date: datePicker
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          setStartOfWeek(getMonday(new Date(year, month, day)));
          setDatePicker(new Date(year, month, day));
        }
      } catch ({ code, message }) {
        console.warn("Cannot open date picker", message);
      }
    }
  };

  checkDisabledDay = day => {
    if (new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1) < new Date()) {
      return true;
    }

    return false;
  };

  checkActiveDay = dayActive => {
    if (
      dayActive.getFullYear() == datePicker.getFullYear() &&
      dayActive.getMonth() == datePicker.getMonth() &&
      dayActive.getDate() == datePicker.getDate()
    ) {
      return true;
    }
    return false;
  };

  closeDateIOS = () => {
    setOpenDatePickerIOS(false);
    setDateIOSChange(datePicker);
  };

  setNewDateFromIOS = () => {
    setOpenDatePickerIOS(false);
    setStartOfWeek(getMonday(dateIOSChange));
    setDatePicker(dateIOSChange);
  };

  changeDateIOS = date => {
    setDateIOSChange(new Date(date));
  };

  return (
    <>
      {openDatePickerIOS && (
        <>
          <View
            style={{
              position: "absolute",
              zIndex: 3000,
              width: width,
              height: height,
              backgroundColor: "rgba(125, 127, 130,0.7)"
            }}
          />
          <View style={{ position: "absolute", bottom: 20, left: 10, right: 10, zIndex: 3001 }}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 10,
                paddingVertical: 10,
                paddingHorizontal: 20
              }}
            >
              <View style={{ zIndex: 3002 }}>
                <DatePickerIOS
                  date={dateIOSChange}
                  minimumDate={new Date()}
                  mode="date"
                  locale="vi"
                  onDateChange={date => changeDateIOS(date)}
                />
              </View>
              <TouchableWithoutFeedback onPress={setNewDateFromIOS}>
                <Text style={{ color: "#33A1FD", textAlign: "center", marginTop: 20 }}>OK</Text>
              </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback onPress={closeDateIOS}>
              <View style={{ backgroundColor: "white", borderRadius: 10, paddingVertical: 15, alignItems: "center" }}>
                <Text style={{ color: "#33A1FD", textAlign: "center" }}>Hủy</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      )}
      <View style={{ padding: 20, backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text>Ngày hẹn:</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 5 }}>{toDaySting}</Text>
            <TouchableWithoutFeedback onPress={openDatePicker()}>
              <View
                style={{
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#FF194B",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 2
                }}
              >
                <Text>
                  <FontAwesome name="calendar-o" size={23} color="#FF194B" />
                </Text>
                <Text style={{ position: "absolute", fontSize: 12, color: "gray", bottom: 3 }}>{datePicker.getDate()}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              if (canPrev) {
                setStartOfWeek(prevState => new Date(moment(prevState).subtract(1, "w")));
              }
            }}
          >
            <Text style={canPrev ? null : styles.disablePrev}>
              <Entypo name="chevron-left" size={22} />
            </Text>
          </TouchableWithoutFeedback>
          <Text style={{ position: "absolute", left: 0, bottom: 5, fontSize: 12, color: "#D4D2A5" }}>
            Thg {startOfWeek.getMonth() + 1}
          </Text>
          <TouchableWithoutFeedback disabled={checkDisabledDay(monday)} onPress={() => changeActiveDate(monday)}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.dayString}>Thứ 2</Text>
              <View style={[checkActiveDay(monday) ? styles.dayActive : null, styles.day]}>
                <Text
                  style={[
                    checkDisabledDay(monday) ? styles.disableDay : null,
                    { textAlign: "center" },
                    checkActiveDay(monday) ? styles.textDayActive : null
                  ]}
                >
                  {monday.getDate()}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback disabled={checkDisabledDay(tuesday)} onPress={() => this.changeActiveDate(tuesday)}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.dayString}>Thứ 3</Text>
              <View style={[checkActiveDay(tuesday) ? styles.dayActive : null, styles.day]}>
                <Text
                  style={[
                    checkDisabledDay(tuesday) ? styles.disableDay : null,
                    { textAlign: "center" },
                    checkActiveDay(tuesday) ? styles.textDayActive : null
                  ]}
                >
                  {tuesday.getDate()}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback disabled={checkDisabledDay(wednesday)} onPress={() => this.changeActiveDate(wednesday)}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.dayString}>Thứ 4</Text>
              <View style={[checkActiveDay(wednesday) ? styles.dayActive : null, styles.day]}>
                <Text
                  style={[
                    checkDisabledDay(wednesday) ? styles.disableDay : null,
                    { textAlign: "center" },
                    checkActiveDay(wednesday) ? styles.textDayActive : null
                  ]}
                >
                  {wednesday.getDate()}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback disabled={checkDisabledDay(thursday)} onPress={() => this.changeActiveDate(thursday)}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.dayString}>Thứ 5</Text>
              <View style={[checkActiveDay(thursday) ? styles.dayActive : null, styles.day]}>
                <Text
                  style={[
                    checkDisabledDay(thursday) ? styles.disableDay : null,
                    { textAlign: "center" },
                    checkActiveDay(thursday) ? styles.textDayActive : null
                  ]}
                >
                  {thursday.getDate()}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback disabled={checkDisabledDay(friday)} onPress={() => this.changeActiveDate(friday)}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.dayString}>Thứ 6</Text>
              <View style={[checkActiveDay(friday) ? styles.dayActive : null, styles.day]}>
                <Text
                  style={[
                    checkDisabledDay(friday) ? styles.disableDay : null,
                    { textAlign: "center" },
                    checkActiveDay(friday) ? styles.textDayActive : null
                  ]}
                >
                  {friday.getDate()}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback disabled={checkDisabledDay(saturday)} onPress={() => this.changeActiveDate(saturday)}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.dayString}>Thứ 7</Text>
              <View style={[checkActiveDay(saturday) ? styles.dayActive : null, styles.day]}>
                <Text
                  style={[
                    checkDisabledDay(saturday) ? styles.disableDay : null,
                    { textAlign: "center" },
                    checkActiveDay(saturday) ? styles.textDayActive : null
                  ]}
                >
                  {saturday.getDate()}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback disabled={checkDisabledDay(sunday)} onPress={() => this.changeActiveDate(sunday)}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.dayString}>Chủ nhật</Text>
              <View style={[checkActiveDay(sunday) ? styles.dayActive : null, styles.day]}>
                <Text
                  style={[
                    checkDisabledDay(sunday) ? styles.disableDay : null,
                    { textAlign: "center" },
                    checkActiveDay(sunday) ? styles.textDayActive : null
                  ]}
                >
                  {sunday.getDate()}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setStartOfWeek(prevState => new Date(moment(prevState).add(1, "w")));
            }}
          >
            <Text>
              <Entypo name="chevron-right" size={22} />
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dayString: {
    fontSize: 10,
    color: "gray"
  },
  day: {
    marginTop: 10
  },
  dayActive: {
    width: Platform.OS === "ios" ? 21 : 27,
    height: Platform.OS === "ios" ? 21 : 27,
    borderRadius: 27,
    backgroundColor: "#86D8EF",
    justifyContent: "center",
    textAlign: "center"
  },
  textDayActive: {
    color: "white"
  },
  disableDay: {
    color: "#d2d5d9"
  },
  disablePrev: {
    opacity: 0
  }
});

export default Calendar;
