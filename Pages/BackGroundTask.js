import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

const BackGroundTask = (props) => {
  return (
    <WebView
      onMessage={props.function}
      source={{
        html: `<script>
              setInterval(()=>{
                  window.ReactNativeWebView.postMessage("");
                }, ${props.interval})
              </script>`,
      }}
    />
  );
};

export default BackGroundTask;
