import React, { Component } from "react";
import { Platform, StyleSheet, View, WebView, Dimensions } from "react-native";
import { ScreenOrientation } from "expo";
import { ViewClsDetailApi } from "../../../../../api/view-cls-detail-api/ViewClsDetailApi";

const { width } = Dimensions.get("window");

class WebViewCLS extends Component {
    static navigationOptions = {
        title: "Chi tiết cận lâm sàng",
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: null,
            viewData: null,
            webViewScale: width / 900,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    async componentWillMount() {
        Dimensions.addEventListener(
            "change",
            this.updateWebViewScale.bind(this)
        );
        await ScreenOrientation.unlockAsync();
    }

    async componentWillUnmount() {
        Dimensions.removeEventListener(
            "change",
            this.updateWebViewScale.bind(this)
        );
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
    }

    updateWebViewScale({ window }) {
        this.setState(
            {
                webViewScale: window.width / 900,
                viewData: null,
            },
            () => {
                this.setState({
                    viewData: this.state.viewDataBackup,
                });
            }
        );
    }

    loadData = async () => {
        const { navigation } = this.props;
        let IdPhieuIn = navigation.getParam("IdPhieuIn", "No-Id");
        try {
            let response = await ViewClsDetailApi.getRawHtml(IdPhieuIn);
            this.setState({
                viewData: response.data.ViewData,
                viewDataBackup: response.data.ViewData,
                isLoading: false,
            });
        } catch (errors) {
            console.log(errors);
        }
    };

    render() {
        var htmlContent = this.state.viewData;
        const { webViewScale } = this.state;
        var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        while (SCRIPT_REGEX.test(htmlContent)) {
            htmlContent = htmlContent.replace(SCRIPT_REGEX, "");
        }

        let injectedJavaScript = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=${
            Platform.OS == "android" ? webViewScale : 1
        }, maximum-scale=1.0, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;
        if (Platform.OS == "ios") {
            injectedJavaScript += `
        var page = document.getElementsByClassName('page')[0];
        page.setAttribute('style', page.getAttribute('style') + 'transform: scale(${webViewScale}); transform-origin: 0 0 0;' )
      `;
        }

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                }}
            >
                <WebView
                    style={styles.container}
                    startInLoadingState={true}
                    scalesPageToFit={false}
                    injectedJavaScript={injectedJavaScript}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={
                        Platform.OS === "ios"
                            ? { html: htmlContent }
                            : { html: htmlContent, baseUrl: "" }
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
});

export default WebViewCLS;
