import React, { Component } from "react";
import { View, Dimensions, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import DetailCLSReport from "./detail-cls-report/DetailCLSReport";
import { ScreenOrientation } from "expo";
const { width, height } = Dimensions.get("window");

class ClsSnapCarousel extends Component {
    static navigationOptions = {
        title: "Chi tiết cận lâm sàng",
    };
    constructor(props) {
        super(props);
        this.state = {
            carouselWidth: width,
            carouselHeight: height,
        };
    }

    async componentWillMount() {
        Dimensions.addEventListener(
            "change",
            this.updateCarouselSize.bind(this)
        );
        await ScreenOrientation.unlockAsync();
    }

    async componentWillUnmount() {
        Dimensions.removeEventListener(
            "change",
            this.updateCarouselSize.bind(this)
        );
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
    }

    updateCarouselSize({ window }) {
        this.setState({
            carouselWidth: window.width,
            carouselHeight: window.height,
        });
    }

    // _renderItem = item =>{
    //     return <View><Text>jfsfidgsf</Text></View>
    // }

    render() {
        let dataHtml = this.props.navigation.getParam("data");

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Carousel
                    data={dataHtml}
                    renderItem={({ item, index }) => (
                        <DetailCLSReport htmlContent={item} />
                    )}
                    sliderWidth={this.state.carouselWidth}
                    itemWidth={this.state.carouselWidth}
                    sliderHeight={this.state.carouselHeight - 50}
                    itemHeight={this.state.carouselHeight - 60}
                    layout="stack"
                />
            </View>
        );
    }
}

export default ClsSnapCarousel;
