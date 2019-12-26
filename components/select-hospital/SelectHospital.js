import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Dimensions, TouchableWithoutFeedback, FlatList, AsyncStorage, ScrollView } from "react-native";
import { statusBarHeight } from "../../share/customStatusBar/CustomStatusBar";
import { FontAwesome } from "@expo/vector-icons";
import { hospitalApi } from "../../api/hospital-api/HospitalApi";
import { convertString } from "../../helpers/string/convertString";
import { Env } from "../../environment";
import axios from "axios";

function SelectHospital(props) {
    const [isFocus, setIsFocus] = useState(false);
    const [hospitalInitial, setHospitalInitial] = useState([]);
    const [hospitalFlatlist, setHospitalFlatlist] = useState([]);
    const [searchValue, setSearchValue] = useState([]);
    const searchRef = useRef(null);

    useEffect(() => {
        getHospital();
    }, []);

    getHospital = async () => {
        let token = await AsyncStorage.getItem("token");
        if (token) {
            props.navigation.navigate("Dashboard");
        } else {
            let hospitals = await hospitalApi.getAllHospital();
            setHospitalInitial(hospitals.data);
            classifyHospital(hospitals.data);
        }
    };

    classifyHospital = hospitals => {
        let classifyHospital = [];
        hospitals.forEach(hospital => {
            let index = classifyHospital.findIndex(item => item.city == hospital.city);
            if (index >= 0) {
                classifyHospital[index].hospitals.push(hospital);
            } else {
                classifyHospital.push({ city: hospital.city, hospitals: [hospital] });
            }
        });

        setHospitalFlatlist(classifyHospital);
    };

    changeText = value => {
        setSearchValue(value);
        let valueRegE = new RegExp(value, "i");
        let valueRegeConvert = new RegExp(convertString.deleteSpeck(value), "i");
        let hospitalFilter = hospitalInitial.filter(
            item => item.name.search(valueRegE) > -1 || convertString.deleteSpeck(item.name).search(valueRegeConvert) > -1
        );

        classifyHospital(hospitalFilter);
    };

    clearSearch = () => {
        searchRef.current.clear();
        classifyHospital(hospitalInitial);
    };

    selectHospital = item => async () => {
        Env.setAppUrl(item.appUrl);
        Env.setAuth(item.oAuthUrl);
        Env.setDomain(item.domain);
        axios.defaults.headers.common["domain"] = item.domain;

        await AsyncStorage.setItem("hospital", JSON.stringify(item));
        props.navigation.navigate("Login");
    };

    const { width, height } = Dimensions.get("window");
    return (
        <View>
            <View
                style={{
                    backgroundColor: "#25239E",
                    flexDirection: "row",
                    width: width,
                    paddingBottom: 10,
                    paddingTop: statusBarHeight + 10,
                    alignItems: "center",
                    paddingLeft: 10,
                }}
            >
                <FontAwesome name="hospital-o" size={18} color="white" />
                <TextInput
                    style={{ color: "white", marginLeft: 5, width: width - 70, padding: 5 }}
                    placeholder="Chọn viện bạn đã khám"
                    placeholderTextColor="white"
                    onFocus={() => setIsFocus(true)}
                    onChangeText={value => changeText(value)}
                    ref={searchRef}
                    foc
                />
                {isFocus ? (
                    <TouchableWithoutFeedback onPress={clearSearch}>
                        <View style={{ padding: 10 }}>
                            <FontAwesome name="close" size={20} color="white" />
                        </View>
                    </TouchableWithoutFeedback>
                ) : (
                    <TouchableWithoutFeedback onPress={() => searchRef.current.focus()}>
                        <View style={{ padding: 10 }}>
                            <FontAwesome name="search" size={20} color="white" />
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </View>
            <View style={{ paddingBottom: 200 }}>
                {hospitalFlatlist.length > 0 ? (
                    <FlatList
                        data={hospitalFlatlist}
                        keyExtractor={item => `${item.city}`}
                        renderItem={({ item }) => (
                            <>
                                <View style={{ backgroundColor: "#d9d7d7", paddingHorizontal: 30, paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>{item.city}</Text>
                                </View>
                                <FlatList
                                    data={item.hospitals}
                                    keyExtractor={item => `${item._id}`}
                                    renderItem={({ item, index }) => (
                                        <TouchableWithoutFeedback onPress={selectHospital(item)}>
                                            <View
                                                style={{
                                                    width: width - 40,
                                                    marginLeft: 20,
                                                    marginTop: 10,
                                                    borderBottomColor: "#F4F4F4",
                                                    borderBottomWidth: 1,
                                                    paddingBottom: 5,
                                                }}
                                            >
                                                <Text style={{ fontSize: 16, marginHorizontal: 10 }}>{item.name}</Text>
                                                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                                                    <FontAwesome name="map-marker" color="gray" />
                                                    <Text style={{ fontSize: 14, color: "gray", marginHorizontal: 5 }}>
                                                        {item.address}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )}
                                />
                            </>
                        )}
                    />
                ) : (
                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <Text style={{ width: width - 100, textAlign: "center" }}>
                            Không có kết quả cho tìm kiếm "{searchValue}"
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

export default SelectHospital;
