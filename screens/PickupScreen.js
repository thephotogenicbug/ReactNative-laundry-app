import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const deliveryTime = [
  {
    id: "0",
    name: "2-3 Days",
  },
  {
    id: "1",
    name: "3-4 Days",
  },
  {
    id: "2",
    name: "4-5 Days",
  },
  {
    id: "3",
    name: "5-6 Days",
  },
  {
    id: "4",
    name: "Tommorrow",
  },
];

const times = [
  {
    id: "0",
    time: "11:00 PM",
  },
  {
    id: "1",
    time: "12:00 PM",
  },
  {
    id: "2",
    time: "1:00 PM",
  },
  {
    id: "2",
    time: "2:00 PM",
  },
  {
    id: "4",
    time: "3:00 PM",
  },
  {
    id: "5",
    time: "4:00 PM",
  },
];
const PickupScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const product = useSelector((state) => state.product.product);
  console.log(product);

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const ProceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert(
        "Empty or invalid",
        "Please select all the fields",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    if (selectedDate && selectedTime && delivery) {
      navigation.replace("Cart");
    }
  };

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 15, fontWeight: "500", marginHorizontal: 10 }}>
        Enter address
      </Text>
      <TextInput
        style={{
          padding: 40,
          borderColor: "gray",
          borderWidth: 0.7,
          paddingVertical: 80,
          borderRadius: 8,
          margin: 10,
        }}
      />
      <Text style={{ fontSize: 15, fontWeight: "500", marginHorizontal: 10 }}>
        Pickup date
      </Text>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date("2023-06-01")}
        endDate={new Date("2024-08-31")}
        initialSelectedDate={new Date("2023-06-01")}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />
      <Text style={{ fontSize: 15, fontWeight: "500", marginHorizontal: 10 }}>
        Select time
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.time)}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "#088F8F",
                      borderWidth: 0.9,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Text style={{ fontSize: 15, fontWeight: "500", marginHorizontal: 10 }}>
        Delivery date
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {deliveryTime.map((item, index) => {
          return (
            <Pressable
              onPress={() => setDelivery(item.name)}
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "#088F8F",
                      borderWidth: 0.9,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
              }
              key={index}
            >
              <Text>{item.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {total == 0 ? null : (
        <>
          <Pressable
            style={{
              backgroundColor: "#088F8F",
              padding: 10,
              marginBottom: 10,
              marginTop: 150,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                {cart.length} item | ${total}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "400",
                  color: "white",
                  marginVertical: 6,
                }}
              >
                extra charges might apply
              </Text>
            </View>
            <Pressable onPress={ProceedToCart}>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                Proceed to Cart
              </Text>
            </Pressable>
          </Pressable>
        </>
      )}
      
    </SafeAreaView>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({});
