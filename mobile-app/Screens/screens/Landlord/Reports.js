import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ReportScreen = () => {
  const navigation = useNavigation();

  const [monthlyDue, setMonthlyDue] = useState(12000);
  const [expenses, setExpenses] = useState(5000);

  // Placeholder data for tracking
  const invoiceList = [
    { id: "1", date: "Oct 01, 2024", amount: 3000 },
    { id: "2", date: "Oct 10, 2024", amount: 5000 },
    { id: "3", date: "Oct 20, 2024", amount: 4000 },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 p-6">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-800">Reports</Text>
        <Text className="text-sm text-gray-500 mt-1">
          Overview of finances and operations
        </Text>
      </View>

      {/* Summary Cards */}
      <View className="flex flex-row mb-6">
        <StatCard
          label="Monthly Due"
          value={`NPR ${monthlyDue}`}
          color="bg-gray-200"
          extraClass={"col-span-1"}
        />
        {/* <StatCard
          label="Monthly Collection"
          value={`NPR ${monthlyCollection}`}
          color="bg-gray-200"
          extraClass={"col-span-1"}
        /> */}
        <StatCard
          label="Expenses"
          value={`NPR ${expenses}`}
          color="bg-gray-200"
          extraClass={"col-span-1"}
        />
      </View>
      {/* Invoice Section */}
      <View className="mb-6 bg-white p-2 rounded">
        <Text className="text-xl font-semibold text-gray-700 mb-4">
          Invoices
        </Text>
        {invoiceList.map((invoice) => (
          <View
            key={invoice.id}
            className="p-4 bg-gray-100 rounded-md mb-2 flex-row justify-between"
          >
            <Text className="text-gray-800">{invoice.date}</Text>
            <Text className="font-semibold">{`NPR ${invoice.amount}`}</Text>
          </View>
        ))}
        <TouchableOpacity
          className="mt-3 bg-primary py-2 px-4 p-4 rounded-md"
          onPress={() => Alert.alert("Invoice Generated!")}
        >
          <Text className="text-white text-center font-medium">
            Generate Invoice
          </Text>
        </TouchableOpacity>
      </View>
      {/* Bar Chart - Monthly Collection */}
      <Text className="text-xl font-semibold text-gray-700 mb-4">
        Monthly Collection
      </Text>
      <BarChart data={[5000, 3000, 7000, 8000, 6000]} maxValue={10000} />
    </ScrollView>
  );
};

// Stat Card Component
const StatCard = ({ label, value, color, extraClass }) => (
  <View className={`flex-1 mr-2 p-4 ${color}  rounded-md ${extraClass}`}>
    <Text className="text-gray-700">{label}</Text>
    <Text className="text-xl font-bold mt-2">{value}</Text>
  </View>
);

// Custom Bar Chart Component
const BarChart = ({ data, maxValue }) => (
  <View className="h-40 bg-gray-200 rounded-md p-4">
    {data.map((value, index) => (
      <View key={index} className="flex-row items-center mb-2">
        <View
          className="bg-blue-500 h-4 rounded-md"
          style={{ width: `${(value / maxValue) * 100}%` }}
        />
        <Text className="ml-2 text-sm">{`NPR ${value}`}</Text>
      </View>
    ))}
  </View>
);

export default ReportScreen;
