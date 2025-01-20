import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons"; // For the action button icon

const TenantList = ({}) => {
  // State to manage the list of tenants
  const navigation = useNavigation();

  const [tenants, setTenants] = useState([
    {
      id: "1",
      name: "Ram Sharma",
      address: "Bhaktapur, Kathmandu",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      dueAmount: Math.floor(Math.random() * 5001), // Random value from 0 to 5000
    },
    {
      id: "2",
      name: "Sita Gurung",
      address: "Baneshwor, Kathmandu",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      dueAmount: Math.floor(Math.random() * 5001), // Random value from 0 to 5000
    },
    {
      id: "3",
      name: "Krishna Bhattarai",
      address: "Lalitpur, Kathmandu",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      dueAmount: Math.floor(Math.random() * 5001), // Random value from 0 to 5000
    },
    {
      id: "4",
      name: "Gita Tamang",
      address: "Kalanki, Kathmandu",
      imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      dueAmount: Math.floor(Math.random() * 5001), // Random value from 0 to 5000
    },
    {
      id: "5",
      name: "Hari Khadka",
      address: "Swayambhu, Kathmandu",
      imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      dueAmount: Math.floor(Math.random() * 5001), // Random value from 0 to 5000
    },
    {
      id: "6",
      name: "Manju Shrestha",
      address: "Balaju, Kathmandu",
      imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
      dueAmount: Math.floor(Math.random() * 5001), // Random value from 0 to 5000
    },
    {
      id: "7",
      name: "Dipak Adhikari",
      address: "Maharajgunj, Kathmandu",
      imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
      dueAmount: Math.floor(Math.random() * 5001), // Random value from 0 to 5000
    },
    {
      id: "8",
      name: "Puja Maharjan",
      address: "Thamel, Kathmandu",
      imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      dueAmount: Math.floor(Math.random() * 5001), // Random value from 0 to 5000
    },
    {
      id: "82",
      name: "Puja Maharjan",
      address: "Thamel, Kathmandu",
      imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      dueAmount: Math.floor(Math.random() * 5001), // Random value from 0 to 5000
    },
    {
      id: "81",
      name: "Puja Maharjan",
      address: "Thamel, Kathmandu",
      imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      dueAmount: Math.floor(Math.random() * 5001), // Random value from 0 to 5000
    },
  ]);

  // Function to handle adding a new tenant
  const addTenant = () => {
    const newTenant = {
      id: (tenants.length + 1).toString(),
      name: "New Tenant",
      address: "New Address",
      imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    };
    setTenants([...tenants, newTenant]);
    navigation.navigate("Add Tenants");
  };

  // Render each tenant item
  const renderItem = ({ item }) => (
    <View
      className="bg-white p-3 my-2 xrounded-lg shadow-md flex-row items-center "
      key={item.imageUrl}
    >
      <Image
        source={{ uri: item.imageUrl }}
        className="w-12 h-12 rounded-full"
      />

      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-sm text-gray-500">
          {item.id} Rooms || Due: Rs {item?.dueAmount}
        </Text>
      </View>

      <View className="flex flex-row">
        <TouchableOpacity
          className="text-primary  p-2 rounded-full"
          onPress={() => {
            navigation.navigate("Chat");
          }}
        >
          <Icon name="chat" size={20} className="text-primary" />
        </TouchableOpacity>
        <TouchableOpacity
          className="text-primary  p-2 rounded-full"
          onPress={() => {
            navigation.navigate("Tenant Details");
          }}
        >
          <Icon name="visibility" size={20} className="text-primary" />
        </TouchableOpacity>
        <TouchableOpacity
          className="text-primary  p-2 rounded-full"
          onPress={() => {
            navigation.navigate("Edit Tenant");
          }}
        >
          <Icon name="edit" size={20} className="text-primary" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 relative px-4 h-full">
      <View className="flex justify-between flex-row items-center">
        <Text className="my-4 text-2xl font-bold">Tenants</Text>
        <TouchableOpacity
          className=" w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg"
          onPress={addTenant}
        >
          <Icon name="add" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tenants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default TenantList;
