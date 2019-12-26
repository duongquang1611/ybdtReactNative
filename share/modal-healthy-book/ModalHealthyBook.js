import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  BackHandler,
  AsyncStorage,
  ActivityIndicator,
  Image
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import DrawerHealthyBook from "./drawer-healthy-book/DrawerHealthyBook";
import { ScreenOrientation } from "expo";
import healthyBooksApi from "../../api/healthy-book-api/healthyBooksApi";
import { cutScript } from "../../helpers/cutScript/cutScript";
import { profileApi } from "../../api/profile-api/profileApi";
import { hospitalApi } from "../../api/hospital-api/HospitalApi";
import ItemCarouselModalHealthyBook from "./item-carousel-modal-healthy-book/ItemCarouselModalHealthyBook";
export default class ModalHealthyBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeModal: new Animated.Value(0),
      showDrawer: false,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      screenOrientation: false,
      currentPage: 1,
      html: [],
      screenIos: true,
      reload: false,
      cls: [],
      hospital: {}
    };
    this.scrollRef = React.createRef();
  }

  async componentDidMount() {
    let { allHtml, allCLS, profile, hospital } = await this.getWebView();

    this.setState({ html: allHtml.map(item => cutScript(item)), cls: allCLS, profile, hospital });
    Dimensions.addEventListener("change", async window => {
      if (window.window.width === this.state.width) {
        // let { allHtml } = await this.getWebView();
        let allHtml = this.state.html;
        if (window.screen.width > window.screen.height) {
          this.setState(
            {
              width: window.window.height,
              height: window.window.width,
              screenIos: false,
              html: [],
              reload: true
            },
            () => {
              this.setState({ html: allHtml, reload: false });
            }
          );
        } else {
          this.setState(
            {
              width: window.window.height,
              height: window.window.width,
              screenIos: true,
              html: [],
              reload: true
            },
            () => {
              this.setState({ html: allHtml.map(item => cutScript(item)), reload: false });
            }
          );
        }
      } else {
        if (window.screen.width > window.screen.height) {
          this.setState(
            {
              width: window.window.width,
              height: window.window.height,
              screenIos: false,
              html: [],
              reload: true
            },
            () => {
              this.setState({ html: allHtml.map(item => cutScript(item)), reload: false });
            }
          );
        } else {
          this.setState(
            {
              width: window.window.width,
              height: window.window.height,
              screenIos: true,
              html: [],
              reload: true
            },
            () => {
              this.setState({ html: allHtml.map(item => cutScript(item)), reload: false });
            }
          );
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.html.length == 0 && prevState.reload && !this.state.reload && this.props.showModal) {
      setTimeout(() => {
        this._carousel.snapToItem(this.state.currentPage - 1);
      }, 250);
    }
  }

  getWebView = async () => {
    let token = await AsyncStorage.getItem('token');
    let username = JSON.parse(await AsyncStorage.getItem("token")).username;
    // console.log(token);
    
    let all = await healthyBooksApi.getPhieuKhamTheoUsername(username);
    let allCLS = await Promise.all(all.map(async item => await healthyBooksApi.getChiTietLanKhamTheoIdPhieuKham(item.Id)));
    let profile = await profileApi.getProfile(username);
    profile = profile.data;
    let hospital = await hospitalApi.getHospitalById(JSON.parse(await AsyncStorage.getItem("hospital"))._id);
    let html = await Promise.all(
      allCLS.map(async item => {
        let allStringHtml = [];
        allStringHtml.push({ dataExaminationCard: item, type: "intro" });
        if (item.LstPhieuChiDinh) {
          Array.prototype.push.apply(
            allStringHtml,
            await Promise.all(
              item.LstPhieuChiDinh.map(
                async itemChild => await healthyBooksApi.getHTMLPhieuCLSTheoIdPhieuIn(itemChild.IdPhieuIn)
              )
            )
          );
        }
        allStringHtml.push({ dataMedicine: item, type: "medicine" });

        return allStringHtml;
      })
    );
    let allHtml = [{}];
    html.forEach(item => {
      if (Array.isArray(item)) {
        item.forEach((itemChild, index) => {
          allHtml.push(itemChild);
        });
      } else {
        allHtml.push(item);
      }
    });

    return { allHtml, allCLS, profile, hospital: hospital.data };
  };
  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.showModal) {
      this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        this.closeModalBook();
        return true;
      });
      await ScreenOrientation.unlockAsync();
    }
  }

  closeModalBook = async () => {
    this.props.closeModalBook();
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    this.backHandler.remove();
  };

  closeDrawer = () => {
    this.setState({
      showDrawer: false
    });
  };

  openDrawer = () => {
    this.setState({
      showDrawer: true
    });
  };

  skipCarouelTo = count => {
    this._carousel.snapToItem(count);
  };

  // reloadCarouelFromDrawer = html => {
  //   this.setState({ html: html, reload: false });
  // };

  // closeDrawerByReload = () => {
  //   this.setState({
  //     showDrawer: false,
  //     reload: true
  //   });
  // };

  render() {
    let { height, width } = this.state;
    return (
      <>
        {this.props.showModal && (
          <>
            {this.state.showDrawer && (
              <DrawerHealthyBook
                width={this.state.width}
                height={this.state.height}
                closeDrawer={this.closeDrawer}
                showDrawer={this.state.showDrawer}
                width={this.state.width}
                allCls={this.state.cls}
                reloadCarouelFromDrawer={this.reloadCarouelFromDrawer}
                closeDrawerByReload={this.closeDrawerByReload}
                skipCarouelTo={this.skipCarouelTo}
              />
            )}
            <View
              style={{
                position: "absolute",
                width: width,
                height: height,
                top: 0,
                left: 0,
                backgroundColor: "rgba(22, 22, 23,0.7)",
                zIndex: 2000,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 5,
                  height: height - 100,
                  overflow: "hidden",
                  top: 60,
                  zIndex: 4000
                }}
              >
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30, zIndex: 5000 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("../../assets/moc.png")} style={{ width: 30, height: 30 }} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: width - 40,
                  marginTop: 10
                }}
              >
                <TouchableWithoutFeedback onPress={this.openDrawer}>
                  <View>
                    <AntDesign name="menu-fold" size={24} color="white" />
                  </View>
                </TouchableWithoutFeedback>
                <Text style={{ color: "white" }}>
                  {this.state.currentPage}/{this.state.html.length}
                </Text>
                <TouchableWithoutFeedback onPress={this.closeModalBook}>
                  <View>
                    <FontAwesome name="close" size={24} color="white" />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <View
                  style={{
                    marginVertical: 10,
                    width: width - 40,
                    height: height - 100,
                    zIndex: 2003,
                    backgroundColor: "white"
                  }}
                >
                  {this.state.reload ? (
                    <View style={{ marginTop: 50 }}>
                      <ActivityIndicator size="small" color="#00ff00" />
                    </View>
                  ) : (
                    <Carousel
                      ref={c => {
                        this._carousel = c;
                      }}
                      data={this.state.html}
                      renderItem={({ item, index }) => (
                        <View style={{ backgroundColor: "white", flex: 1, width: width - 40, height: height - 100 }}>
                          <ItemCarouselModalHealthyBook
                            index={index}
                            screenIos={this.state.screenIos}
                            width={this.state.width}
                            item={item}
                            height={this.state.height}
                            profile={this.state.profile}
                            screenIos={this.state.screenIos}
                            hospital={this.state.hospital}
                          />
                        </View>
                      )}
                      sliderWidth={width - 40}
                      itemWidth={width - 40}
                      itemHeight={height - 100}
                      sliderHeight={height - 100}
                      lockScrollWhileSnapping={true}
                      swipeThreshold={0}
                      initialNumToRender={this.state.html.length}
                      firstItem={this.state.currentPage - 1}
                      onSnapToItem={index => {
                        this.setState({
                          currentPage: index + 1
                        });
                      }}
                    />
                  )}
                </View>
                <View
                  style={{
                    position: "absolute",
                    width: width - 40,
                    height: height - 100,

                    bottom: 6,
                    left: 5,
                    zIndex: 2002,
                    backgroundColor: "rgba(237, 239, 242,0.7)"
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    width: width - 40,
                    height: height - 100,

                    bottom: 2,
                    left: 10,
                    zIndex: 2001,
                    backgroundColor: "rgba(237, 239, 242,0.5)"
                  }}
                />
              </View>
              <TouchableWithoutFeedback onPress={() => this._carousel.snapToPrev()}>
                <View
                  style={{
                    position: "absolute",
                    top: height / 2,
                    left: 10,
                    zIndex: 4100,
                    backgroundColor: "rgba(22, 22, 23,0.3)",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="chevron-left" size={24} color="white" />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this._carousel.snapToNext()}>
                <View
                  style={{
                    position: "absolute",
                    top: height / 2,
                    right: 10,
                    zIndex: 4100,
                    backgroundColor: "rgba(22, 22, 23,0.3)",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="chevron-right" size={24} color="white" />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </>
        )}
      </>
    );
  }
}
