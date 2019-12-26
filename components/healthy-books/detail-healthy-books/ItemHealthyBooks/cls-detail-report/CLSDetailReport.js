import React, { Component } from "react";
import { Platform, StyleSheet, View, WebView } from "react-native";
import { ViewClsDetailApi } from "../../../../../api/view-cls-detail-api/ViewClsDetailApi";

export default class WebViewCLS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      viewData: null
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { navigation } = this.props;
    let IdPhieuIn = navigation.getParam("IdPhieuIn", "No-Id");
    try {
      let response = await ViewClsDetailApi.getRawHtml(IdPhieuIn);
      console.log(response.data.ViewData);
      this.setState({
        viewData: response.data.ViewData,
        isLoading: false
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  render() {
    var htmlContent = this.state.viewData;
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    while (SCRIPT_REGEX.test(htmlContent)) {
      htmlContent = htmlContent.replace(SCRIPT_REGEX, "");
    }

    return (
      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "stretch" }}>
        <WebView
          style={styles.container}
          startInLoadingState={true}
          scalesPageToFit={false}
          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=${
            Platform.OS === "android" ? 0.45 : 0.35
          }, maximum-scale=1.0, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ html: htmlContent }}
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
    backgroundColor: "white"
  }
});
