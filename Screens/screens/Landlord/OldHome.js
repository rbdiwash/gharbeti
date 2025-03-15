import AutoScroll from "@homielab/react-native-auto-scroll";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import connectIPS from "../../../assets/connectIPS.png";
import divash from "../../../assets/divash.jpeg";
import esewa from "../../../assets/esewa.png";
import fonePay from "../../../assets/fonepay.png";
import khalti from "../../../assets/khalti.png";

const HomeScreen = ({ username = "Divash" }) => {
  const [isDueVisible, setIsDueVisible] = useState(true);
  const navigation = useNavigation();

  const handleToggleDueVisibility = () => {
    setIsDueVisible(!isDueVisible);
  };

  const renderActionBlock = (icon, label, screen) => (
    <TouchableOpacity
      className="bg-white p-4 m-2 rounded-lg shadow-lg items-center justify-center"
      onPress={() => navigation.navigate(screen)}
      style={{ width: "30%" }} // Ensures 3 blocks in a row
    >
      <Icon name={icon} size={28} color="#0e2f4f" />
      <Text className="mt-2 text-gray-800 font-bold text-center">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="w-full flex flex-row justify-between bg-primary items-center">
        <View className="flex flex-row items-center px-4 py-4 text-white ">
          <Image source={divash} className="h-8 w-8 rounded-full mr-4" />
          <Text className="text-2xl font-bold text-white">Hi, {username}</Text>
        </View>
        <View className="flex flex-row gap-5 items-center mr-4">
          <Icon name="refresh" size={24} color="white" />
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Icon name="notifications" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-4">
        {/* Greeting */}

        {/* Total Due Block */}
        <View className="bg-white p-4 rounded-lg shadow-md flex-row justify-between items-center">
          <View className="border-r pr-8">
            <Text className="text-gray-500">
              Total due
              {/* <Text className="text-xs">this month</Text> */}
            </Text>
            <Text className="text-2xl font-bold text-gray-800">
              {isDueVisible ? "Rs. 25,000" : "****"}
            </Text>
          </View>
          <View>
            <Text className="text-gray-500">Total received</Text>
            <Text className="text-2xl font-bold text-gray-800">
              {isDueVisible ? "Rs. 12,000" : "****"}
            </Text>
          </View>
          <TouchableOpacity onPress={handleToggleDueVisibility}>
            <Icon
              name={isDueVisible ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mt-6">
          <View className="bg-primary p-4 rounded-lg shadow-md items-center flex-1 mr-2">
            <Text className="text-white">Rooms</Text>
            <Text className="text-2xl font-bold text-white">12</Text>
          </View>
          <View className="bg-primary p-4 rounded-lg shadow-md items-center flex-1 ml-2">
            <Text className="text-white">Tenants</Text>
            <Text className="text-2xl font-bold text-white">5</Text>
          </View>
          <View className="bg-primary p-4 rounded-lg shadow-md items-center flex-1 ml-2">
            <Text className="text-white">Vacant</Text>
            <Text className="text-2xl font-bold text-white">0</Text>
          </View>
        </View>
        {/* 
        <View>
          <TextTicker
            style={{ fontSize: 18 }}
            duration={9000}
            loop
            bounce={false}
            repeatSpacer={0}
            marqueeDelay={0}
          >
            <Text className="bg-green-400 rounded p-2 text-white font-bold mr-4">
              Reminder: Rent of Mr Divash is due tomorrow worth Rs 4000.
            </Text>
            <Text className="bg-blue-400 rounded p-2 text-white font-bold">
              Tip: Schedule maintenance early!
            </Text>
          </TextTicker>
        </View> */}

        {/* Notice Section */}
        <AutoScroll duration={10000} endPaddingWidth={10}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            className="mt-6"
          >
            <View className="bg-white p-4 rounded-lg mr-2">
              <Text className="text-primary shadow-lg font-bold">
                Reminder: Rent due tomorrow
              </Text>
            </View>
            <View className="bg-white p-4 rounded-lg mr-2">
              <Text className="text-primary font-bold">
                Tip: Schedule maintenance early!
              </Text>
            </View>
            <View className="bg-white p-4 rounded-lg mr-2">
              <Text className="text-primary font-bold">
                Tip: Schedule maintenance early!
              </Text>
            </View>
            <View className="bg-white p-4 rounded-lg mr-2">
              <Text className="text-primary font-bold">
                Tip: Schedule maintenance early!
              </Text>
            </View>
          </ScrollView>
        </AutoScroll>

        {/* Action Blocks */}
        <Text className="font-bold text-base mb-2 mt-6">Featured Services</Text>
        <View className=" flex-row flex-wrap gap-0 justify-between">
          {renderActionBlock("group", "Tenants", "Tenants")}
          {renderActionBlock("person-add", "Add Tenants", "Add Tenants")}
          {renderActionBlock("build", "Maintenance", "Maintenance Requests")}
          {renderActionBlock("account-balance", "Dues", "Dues")}
          {renderActionBlock("campaign", "Notice", "Announcements")}
          {renderActionBlock("account-circle", "Profile", "Profile")}
          {/* Add more action blocks as needed */}
        </View>

        {/* <View className="mt-6 p-4 bg-yellow-100 rounded-md shadow-md">
          <Text className="text-lg font-semibold text-yellow-900">
            Sponsored Ad
          </Text>
          <Text className="text-gray-700 mt-1">
            Find the best rental properties with Gharbeti App!
          </Text>
          <TouchableOpacity
            className="mt-3 bg-yellow-500 py-2 px-4 rounded-md"
            onPress={() => alert("Ad Clicked!")}
          >
            <Text className="text-white font-medium text-center">
              Explore Now
            </Text>
          </TouchableOpacity>
        </View> */}
        <View className="mt-6 p-4 bg-yellow-100 rounded-md shadow-md">
          <Text className="text-lg font-semibold text-yellow-900">
            Sponsored Ad
          </Text>
          <Text className="text-gray-700 mt-1">
            Discover the best rental properties with Gharbeti App!
          </Text>

          {/* Ad Image */}
          <View className="mt-4 rounded-md overflow-hidden">
            <Image
              source={{
                uri: "https://picsum.photos/id/29/4000/2670",
              }}
              className="w-full h-40 object-cover"
            />
          </View>
        </View>

        {/* Add Other Custom Sections */}
        <TouchableOpacity onPress={() => navigation.navigate("Tenant Invite")}>
          <View className="bg-white p-4 rounded-lg shadow-lg mt-6">
            <Text className="text-lg font-bold text-gray-800">Summary</Text>
            <Text className="text-sm text-gray-500 mt-2">
              Quick summary of activities and updates.
            </Text>
          </View>
        </TouchableOpacity>
        <View className="bg-white p-4 mt-6 rounded-lg shadow-lg">
          <Text className="font-bold text-base mb-2">
            We accept payments from
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            className="mb-4 flex flex-row"
          >
            <View className="border border-gray-300 text-center  p-4 px-6 rounded-lg mr-2">
              <Text className="text-primary font-bold text-center">Esewa</Text>
              <Image source={esewa} className="w-20 h-20" />
            </View>
            <View className="border border-gray-300 p-4 rounded-lg mr-2">
              <Text className="text-primary text-center font-bold">Khalti</Text>
              <Image source={khalti} className="w-20 h-20" />
            </View>
            <View className="border border-gray-300 p-4 rounded-lg mr-2">
              <Text className="text-primary text-center font-bold">
                ConnectIPS
              </Text>
              <Image source={connectIPS} className="w-20 h-20" />
            </View>
            <View className="border border-gray-300 p-4 rounded-lg mr-2">
              <Text className="text-primary text-center font-bold">
                Fonepay
              </Text>
              <Image source={fonePay} className="w-20 h-20" />
            </View>
          </ScrollView>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-lg mt-6">
          <Text className="text-lg font-bold text-gray-800">
            Recent Activity
          </Text>
          <Text className="text-sm text-gray-500 mt-2">
            Display recent actions or notifications.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
