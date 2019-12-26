import React, { useEffect, useState } from 'react'
import {
    View,
    Dimensions,
    Text,
    ScrollView,
    ImageBackground
} from "react-native";
import { FontAwesome, Ionicons, AntDesign, MaterialCommunityIcons, Entypo, Foundation } from "@expo/vector-icons";
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";




function Guide(props) {
    let { height, width } = Dimensions.get("window");
    const WalkthroughableView = walkthroughable(View);

    useEffect(() => {
        if (props.guide) {
            props.start();
        }
        props.copilotEvents.on('stop', () => {
            props.completeGuide()
        })
    }, []);
    return (
        <>
            <ScrollView style={{ marginBottom: 50 }}>
                <View style={{ backgroundColor: "#47B7BA", overflow: "hidden" }}>
                    <View style={{ padding: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>{props.name}</Text>
                        <FontAwesome name="sign-out" size={28} color="white" />
                    </View>
                    <ImageBackground style={{ flex: 1, height: 250 }} source={require("../../assets/doctor-explaining-explanation-2182972.jpg")}>
                        <View
                            style={{
                                position: "absolute",
                                right: 0,
                                left: 0,
                                top: 0,
                                bottom: 0,
                                backgroundColor: "rgba(148, 184, 184, 0.6)",
                                zIndex: 2,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        />
                        <View
                            style={{
                                position: "absolute",
                                right: 0,
                                left: 0,
                                top: 40,
                                zIndex: 3,
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 20,
                                    width: width,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                    textShadowColor: "#000"
                                }}
                            >
                                sức khỏe, thông minh
              </Text>
                        </View>
                        <View
                            style={{
                                position: "absolute",
                                zIndex: 4,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width:width,
                                bottom: 50
                            }}
                        >

                            <CopilotStep text='Đặt lịch giúp bạn có thể đặt lịch tới bệnh viện từ nhà, bạn cần đến đúng giờ và có thể vào khám không phải chờ xếp hàng' order={1} name="dat lich" >
                                <WalkthroughableView>
                                    <View style={{ flexDirection: "column", alignItems: "center", paddingHorizontal: 10,width:width/3 }}>
                                        <Text>
                                            <Ionicons name="ios-clock" size={50} color="white" />
                                        </Text>
                                        <Text style={{ color: "white" }}>Đặt lịch khám</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>



                            <CopilotStep text="Quy trình khám sẽ hướng dẫn cho bạn các bước khám tại bệnh viện như: bạn cần đi đâu, phòng nào, bao giờ tới lượt bạn" order={2} name="quy trinh kham">
                                <WalkthroughableView>
                                    <View style={{ flexDirection: "column", alignItems: "center", paddingHorizontal: 5, width: width / 3 }}>
                                        <Text>
                                            <MaterialCommunityIcons name="arrow-decision-outline" size={50} color="white" />
                                        </Text>
                                        <Text style={{ color: "white" }}>Quy trình khám</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>


                            <CopilotStep text="Hồ sơ y bạ sẽ giúp bạn có thể xem các kết quả khám bệnh, kết quả Cận lâm sàng, đơn thuốc một cách nhanh nhất tại mọi lúc mọi nơi" order={3} name="hồ sơ y bạ">
                                <WalkthroughableView>
                                    <View style={{ flexDirection: "column", alignItems: "center", paddingHorizontal: 5, width: width / 3 }}>
                                        <Text>
                                            <FontAwesome name="address-book-o" size={50} color="white" />
                                        </Text>
                                        <Text style={{ color: "white" }}>Sổ y tế</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>

                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1 }}>
                    <View>
                        <View
                            style={{
                                backgroundColor: "#2193b0",
                                padding: 5,
                                justifyContent: "center",
                                paddingLeft: 15
                            }}
                        >
                            <Text style={{ marginLeft: 5, marginRight: 5, color: "white" }}>
                                <FontAwesome name="stethoscope" size={16} />
                                <Text style={{ fontSize: 12, fontWeight: "bold" }}> Khám bệnh</Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                paddingTop: 10,
                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingBottom: 5,
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center"
                            }}
                        >

                            <CopilotStep text="Sổ y bạ sẽ giúp bạn có thể xem các kết quả khám bệnh, kết quả Cận lâm sàng,đơn thuốc một cách nhanh nhất tại mọi lúc mọi nơi" order={4} name="Sổ khám bệnh">
                                <WalkthroughableView>
                                    <View
                                        style={{
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            width: width / 3,
                                            marginVertical: 5,
                                            paddingHorizontal: 5
                                        }}
                                    >
                                        <FontAwesome name="heartbeat" size={30} color="red" />
                                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Sổ khám bệnh</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>

                            <CopilotStep text="Bạn có thể xem riêng các kết quả cận lâm sàng" order={5} name="CLS">
                                <WalkthroughableView>
                                    <View
                                        style={{
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            width: width / 3,
                                            marginVertical: 5
                                        }}
                                    >
                                        <Ionicons name="md-paper" size={30} color="#68C9D6" />
                                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Kết quả CLS</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>
                            <CopilotStep text="Bạn có thể xem riêng đơn thuốc" order={6} name="đơn thuốc">
                                <WalkthroughableView>
                                    <View
                                        style={{
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            width: width / 3,
                                            marginVertical: 5
                                        }}
                                    >
                                        <MaterialCommunityIcons name="medical-bag" size={30} color="#ED195E" />
                                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Đơn thuốc</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>

                        </View>
                    </View>
                    <View>
                        <Text
                            style={{
                                backgroundColor: "#2193b0",
                                color: "white",
                                padding: 5,
                                alignItems: "center",
                                paddingLeft: 15
                            }}
                        >
                            <Text style={{ marginLeft: 10, marginRight: 5 }}>
                                <MaterialCommunityIcons name="calendar-clock" size={16} />
                                <Text style={{ fontSize: 12, fontWeight: "bold" }}> Lịch hẹn</Text>
                            </Text>
                        </Text>
                        <View
                            style={{
                                paddingTop: 5,
                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingBottom: 10,
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center"
                            }}
                        >

                            <CopilotStep text="Đặt lịch giúp bạn có thể đặt lịch tới bệnh viện từ nhà, bạn cần đến đúng giờ và có thể vào khám không phải chờ xếp hàng" order={7} name="đặt lịch hẹn">
                                <WalkthroughableView>
                                    <View
                                        style={{
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            width: width / 3,
                                            marginVertical: 5
                                        }}
                                    >
                                        <MaterialCommunityIcons name="av-timer" size={30} color="#7055A3" />
                                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Đặt lịch</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>

                            <CopilotStep text="Xem lại các lịch hẹn đã đặt" order={8} name="lịch hẹn">
                                <WalkthroughableView>
                                    <View
                                        style={{
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            width: width / 3,
                                            marginVertical: 5
                                        }}
                                    >
                                        <MaterialCommunityIcons name="newspaper" size={30} color="#FDBD12" />
                                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Lịch hẹn</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>

                            <CopilotStep text="Xem các thông báo từ bệnh viện" order={9} name="Thông báo">
                                <WalkthroughableView>
                                    <View
                                        style={{
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            width: width / 3,
                                            marginVertical: 5
                                        }}
                                    >
                                        <FontAwesome name="bell-o" size={30} color="#7EBDC2" />
                                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Thông báo</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>

                        </View>
                    </View>
                    <View>
                        <Text
                            style={{
                                backgroundColor: "#2193b0",
                                color: "white",
                                padding: 5,
                                alignItems: "center",
                                paddingLeft: 15
                            }}
                        >
                            <Text style={{ marginLeft: 10, marginRight: 5 }}>
                                <Foundation name="page-search" size={16} />
                                <Text style={{ fontSize: 12, fontWeight: "bold" }}> Thông tin</Text>
                            </Text>
                        </Text>
                        <View
                            style={{
                                paddingTop: 5,
                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingBottom: 5,
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center"
                            }}
                        >

                            <CopilotStep text="Xem thông tin cá nhân" order={10} name="cá nhân">
                                <WalkthroughableView>
                                    <View
                                        style={{
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            width: width / 3,
                                            marginVertical: 5
                                        }}
                                    >
                                        <AntDesign name="user" size={30} color="#EB9486" />
                                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Cá nhân</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>

                            <CopilotStep text="Xem thông tin bệnh viện" order={11} name="bệnh viện">
                                <WalkthroughableView>
                                    <View
                                        style={{
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            width: width / 3,
                                            marginVertical: 5
                                        }}
                                    >
                                        <FontAwesome name="hospital-o" size={30} color="#247BA0" />
                                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Bệnh viện</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>

                            <CopilotStep text="Xem bản đồ" order={12} name="bản đồ">
                                <WalkthroughableView>
                                    <View
                                        style={{
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            width: width / 3,
                                            marginVertical: 5
                                        }}
                                    >
                                        <Entypo name="map" size={30} color="#FF6B35" />
                                        <Text style={{ marginTop: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.6)" }}>Bản đồ</Text>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#F4F4F4",
                    flexDirection: "row",
                    height: 50
                }}
            >
                {/* <CopilotStep text="bước 13" order={13} name="app 1">
                <WalkthroughableView> */}
                <View
                    style={{
                        width: width / 3,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Entypo name="open-book" size={20} color="#4FB0C6" />
                    <Text style={{ color: "#4FB0C6", fontSize: 10 }}>Hướng dẫn</Text>
                </View>
                {/* </WalkthroughableView>
            </CopilotStep> */}

                {/* <CopilotStep text="bước 14" order={14} name="app 2">
                <WalkthroughableView> */}
                <View
                    style={{
                        width: width / 3,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Ionicons name="ios-apps" size={20} color="gray" />
                    <Text style={{ color: "gray", fontSize: 10 }}> App</Text>
                </View>
                {/* </WalkthroughableView>
            </CopilotStep> */}

                {/* <CopilotStep text="bước 15" order={15} name="app 3">
                <WalkthroughableView> */}
                <View
                    style={{
                        width: width / 3,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Ionicons name="ios-apps" size={20} color="gray" />
                    <Text style={{ color: "gray", fontSize: 10 }}> App</Text>
                </View>
                {/* </WalkthroughableView>
            </CopilotStep> */}
            </View>

        </>
    )
}


export default copilot({
    animated: true, // Can be true or false
    overlay: "svg" // Can be either view or svg
})(Guide);
