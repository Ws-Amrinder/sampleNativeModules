import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  NativeModules,
} from "react-native";

// Native Modules
const { QuoteWidget, WidgetBridge } = NativeModules;

export default function HomeScreen() {
  const [text, setText] = useState("");

  const updateWidget = () => {
    if (!text.trim()) return;

    // // -----------------------
    // // ANDROID LOGIC
    // // -----------------------
    // if (Platform.OS === "android") {
    //   if (!QuoteWidget) {
    //     console.log("QuoteWidget native module not found on Android");
    //     return;
    //   }

    //   try {
    //     QuoteWidget.updateQuote(text);
    //     console.log("Android widget updated:", text);
    //   } catch (err) {
    //     console.log("Android update error:", err);
    //   }
    //   return;
    // }

    // -----------------------
    // iOS LOGIC
    // -----------------------
    if (Platform.OS === "ios") {
      if (!WidgetBridge) {
        console.log("WidgetBridge native module not found on iOS");
        return;
      }

      try {
        WidgetBridge.sendTextToWidget(text);
        console.log("iOS widget updated:", text);
      } catch (err) {
        console.log("iOS update error:", err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Home Screen Widget</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter widget text"
        style={styles.input}
      />

      <TouchableOpacity onPress={updateWidget} style={styles.button}>
        <Text style={styles.buttonText}>Update Widget</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});