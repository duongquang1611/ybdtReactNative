import React, { Component } from "react";
import { Platform, StyleSheet, View, WebView, Dimensions } from "react-native";
import { cutScript } from "../../../../../helpers/cutScript/cutScript";

const { width } = Dimensions.get("window");

export default class DetailClsReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            webViewScale: width / 900,
            htmlContent: this.props.htmlContent,
        };
    }

    componentWillMount() {
        Dimensions.addEventListener(
            "change",
            this.updateWebViewScale.bind(this)
        );
    }

    componentWillUnmount() {
        Dimensions.removeEventListener(
            "change",
            this.updateWebViewScale.bind(this)
        );
    }

    updateWebViewScale({ window }) {
        this.setState(
            {
                webViewScale: window.width / 900,
                htmlContent: null,
            },
            () => {
                this.setState({
                    htmlContent: this.props.htmlContent,
                });
            }
        );
    }

    render() {
        let { webViewScale } = this.state;
        let htmlContent = cutScript(this.state.htmlContent);
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
                    justifyContent: "center",
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
});
