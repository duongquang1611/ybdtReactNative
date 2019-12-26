import React from "react";
import { Platform, WebView, Text } from "react-native";
import MedicineModalHealthyBook from "../medicine-modal-healthy-book/MedicineModalHealthyBook";
import IntroDetailHealthyBook from "../intro-detail-healthy-book/IntroDetailHealthyBook";
import BookCover from "../book-cover/BookCover";

import checkTypes from "../../../helpers/check-types/checkTypes";

function ItemCarouselModalHealthyBook(props) {
  return (
    <>
      {props.index === 0 ? (
        <BookCover
          screenIos={props.screenIos}
          width={props.width}
          height={props.height}
          profile={props.profile}
          hospital={props.hospital}
        />
      ) : checkTypes.checkObject(props.item) ? (
        props.item.type === "intro" ? (
          <IntroDetailHealthyBook data={props.item} />
        ) : (
          <MedicineModalHealthyBook data={props.item} width={props.width} profile={props.profile} />
        )
      ) : (
        <WebView
          source={Platform.OS === "ios" ? { html: props.item } : { html: props.item, baseUrl: "" }}
          scalesPageToFit={false}
          injectedJavaScript={
            Platform.OS === "ios"
              ? props.screenIos
                ? `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.38, maximum-scale=1, user-scalable=2'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);document.getElementsByTagName('body')[0].style.transform = "scaleX(0.73)translateX(-125px)"`
                : `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.38, maximum-scale=1, user-scalable=2'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);document.getElementsByTagName('body')[0].style.transform = 'translateX(150px)scaleX(1.2)'`
              : props.screenIos
              ? `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.38, maximum-scale=1, user-scalable=2'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);document.getElementsByTagName('body')[0].style.transform = 'translateX(50px)'`
              : `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.38, maximum-scale=1, user-scalable=2'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);document.getElementsByTagName('body')[0].style.transform = 'translateX(30px)'`
          }
          style={{ transform: [{ scaleX: Platform.OS === "ios" ? 1 : 1.1 }] }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      )}
    </>
  );
}

export default ItemCarouselModalHealthyBook;
