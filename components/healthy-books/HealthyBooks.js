import React, { Component } from "react";
import { View, FlatList, StyleSheet, AsyncStorage, ActivityIndicator, RefreshControl } from "react-native";
import CustomRow from "./customCellBookItem/CustomCellBookItem";
import { ListHealthyBooksApi } from "../../api/list-healthy-books-api/ListHealthyBooksApi";
import { createAppContainer, createStackNavigator } from "react-navigation";
import HealthyBooks from "./detail-healthy-books/DetailHealthyBooks";
import { TouchableOpacity } from "react-native-gesture-handler";

class renderListHealthyBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    let user = await AsyncStorage.getItem("token");
    try {
      let resonse = await ListHealthyBooksApi.getListHealthyBooks(JSON.parse(user).username);
      console.log(resonse.data);
      this.setState({
        listData: resonse.data,
        isLoading: false,
        refreshing: false
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.loadData();
      }
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator style={{ color: "green", size: "large" }} />
        </View>
      );
    }
    return (
      <View style={[styles.container, { backgroundColor: "#F2F6FE" }]}>
        <View style={styles.container}>
          <FlatList
            data={this.state.listData}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("HealthyBooks", { Id: item.Id, ChanDoan: item.ChanDoan })}
              >
                <CustomRow lankham={this.itemLankham(item)} index={index + 1} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />}
          />
        </View>
      </View>
    );
  }

  ConvertMonthToString = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
  ];

  itemLankham = item => {
    const NgayKham = new Date(item.NgayKham);

    return {
      TenBacSi: item.TenBacSi,
      ChanDoan: item.ChanDoan,
      Id: item.Id,
      Ngay: NgayKham.getDate(),
      Thang: this.ConvertMonthToString[NgayKham.getMonth() - 1],
      Gio: NgayKham.getHours(),
      Phut: NgayKham.getMinutes()
    };
  };
}

const AppNavigator = createStackNavigator(
  {
    ListHealthyBooks: {
      screen: renderListHealthyBooks,
      navigationOptions: {
        header: null
      }
    },
    HealthyBooks: {
      screen: HealthyBooks,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "ListHealthyBooks"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default createAppContainer(AppNavigator);
