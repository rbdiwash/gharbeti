import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ReportScreen = () => {
  const navigation = useNavigation();

  const [monthlyDue, setMonthlyDue] = useState(12000);
  const [monthlyCollection, setMonthlyCollection] = useState(8000);
  const [expenses, setExpenses] = useState(5000);

  // Placeholder data for tracking
  const invoiceList = [
    { id: "1", date: "Oct 01, 2024", amount: 3000 },
    { id: "2", date: "Oct 10, 2024", amount: 5000 },
    { id: "3", date: "Oct 20, 2024", amount: 4000 },
  ];

  return (
    <ScrollView className="flex-1 bg-white p-6">
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
          color="bg-red-200"
        />
        <StatCard
          label="Monthly Collection"
          value={`NPR ${monthlyCollection}`}
          color="bg-green-200"
        />
        <StatCard
          label="Expenses"
          value={`NPR ${expenses}`}
          color="bg-yellow-200"
        />
      </View>
      {/* Invoice Section */}
      <View className="mt-6 mb-4">
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
          className="mt-3 bg-indigo-500 py-2 px-4 rounded-md"
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

      {/* Pie Chart - Expense Breakdown */}
      <Text className="text-xl font-semibold text-gray-700 mt-6 mb-4">
        Expense Breakdown
      </Text>
      <PieChart expenses={[2000, 1500, 1000]} />
    </ScrollView>
  );
};

// Stat Card Component
const StatCard = ({ label, value, color }) => (
  <View className={`flex-1 p-4 ${color} rounded-md`}>
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

// Custom Pie Chart Component (Simple Circular Chart)
const PieChart = ({ expenses }) => {
  const total = expenses.reduce((acc, val) => acc + val, 0);
  const getPercentage = (value) => (value / total) * 100;

  return (
    <View className="h-40 w-40 self-center bg-yellow-200 rounded-full justify-center items-center relative mb-32">
      {expenses.map((expense, index) => (
        <View
          key={index}
          className="absolute h-20 w-20 rounded-full bg-yellow-500"
          style={{
            transform: [{ rotate: `${getPercentage(expense) * 3.6}deg` }],
          }}
        />
      ))}
      <Text className="text-xl font-bold">Expenses</Text>
    </View>
  );
};

export default ReportScreen;
