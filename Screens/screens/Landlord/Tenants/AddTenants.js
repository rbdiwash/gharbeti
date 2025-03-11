import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as ImagePicker from "expo-image-picker";

const AddTenants = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    document: null,
    profileImage: null,
    rooms: "",
    totalRent: "",
    startDate: new Date(),
    emergencyName: "",
    emergencyNumber: "",
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Show the date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide the date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle the date selection
  const handleConfirm = (date) => {
    setSelectedDate(
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
    hideDatePicker();
  };
  // Handle input change
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);
  console.log(formData);

  const handleProfileImageUpload = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setFormData({
        ...formData,
        profileImage: result.assets[0].uri,
      });
    }
    if (hasGalleryPermission === false) {
      alert("Permission to access galery was denied");
    }
  };

  // Handle document upload
  const handleDocumentUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setFormData({
        ...formData,
        document: result.assets[0].uri,
      });
    }
    if (hasGalleryPermission === false) {
      alert("Permission to access galery was denied");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View className="flex-1 bg-white p-4">
          {/* <Text className="my-4 text-2xl font-bold">Add Tenants</Text> */}
          {/* Name Input */}
          <Text className="text-lg font-bold mb-2">Name</Text>
          <TextInput
            className="border border-gray-300 p-3 mb-4 rounded-lg"
            placeholder="Enter name"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <Text className="text-lg font-bold mb-2">Original Address</Text>
          <TextInput
            className="border border-gray-300 p-3 mb-4 rounded-lg"
            placeholder="Enter original address"
            value={formData.address}
            onChangeText={(value) => handleInputChange("address", value)}
          />
          <Text className="text-lg font-bold mb-2">Phone Number</Text>
          <TextInput
            className="border border-gray-300 p-3 mb-4 rounded-lg"
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
          />
          <Text className="text-lg font-bold mb-2">Email</Text>
          <TextInput
            className="border border-gray-300 p-3 mb-4 rounded-lg"
            placeholder="Enter email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          <Text className="text-lg font-bold mb-2">
            Number of Rooms Renting
          </Text>
          <TextInput
            className="border border-gray-300 p-3 mb-4 rounded-lg"
            placeholder="Enter number of rooms"
            keyboardType="numeric"
            value={formData.rooms}
            onChangeText={(value) => handleInputChange("rooms", value)}
          />
          <Text className="text-lg font-bold mb-2">Total Rent</Text>
          <TextInput
            className="border border-gray-300 p-3 mb-4 rounded-lg"
            placeholder="Enter Total rent"
            keyboardType="numeric"
            value={formData.totalRent}
            onChangeText={(value) => handleInputChange("totalRent", value)}
          />
          <Text className="text-lg font-bold mb-2">Starting Date</Text>

          {/* Date Input Field */}
          <TouchableOpacity
            onPress={showDatePicker}
            className="border border-gray-300 rounded-lg p-3 mb-4 w-full bg-white"
          >
            <Text className="text-base text-gray-700">
              {selectedDate || "Tap to select a date"}
            </Text>
          </TouchableOpacity>

          {/* Date Picker Modal */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text className="text-lg font-bold mb-2">Emergency Contact Name</Text>
          <TextInput
            className="border border-gray-300 p-3 mb-4 rounded-lg"
            placeholder="Emergency Contact Name"
            value={formData.emergencyName}
            onChangeText={(value) => handleInputChange("emergencyName", value)}
          />
          <Text className="text-lg font-bold mb-2">
            Emergency Contact Number
          </Text>
          <TextInput
            className="border border-gray-300 p-3 mb-4 rounded-lg"
            placeholder="Emergency Contact Number "
            keyboardType="numeric"
            value={formData.emergencyNumber}
            onChangeText={(value) =>
              handleInputChange("emergencyNumber", value)
            }
            required
          />
          <Text className="text-lg font-bold mb-2">Upload Profile Picture</Text>
          {formData.profileImage ? (
            <>
              <Image
                source={{ uri: formData.profileImage }}
                className="w-40 h-40 mb-4 mx-auto"
              />
              <TouchableOpacity
                className="bg-primary p-3 mb-4 rounded-lg flex items-center justify-center"
                onPress={handleProfileImageUpload}
              >
                <Text className="text-white">Change Profile Picture</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              className="bg-primary p-3 mb-4 rounded-lg flex items-center justify-center"
              onPress={handleProfileImageUpload}
            >
              <Text className="text-white">Upload Profile Picture</Text>
            </TouchableOpacity>
          )}
          <Text className="text-lg font-bold mb-2">
            Upload Citizenship/Licence/Passport
          </Text>
          {formData.document ? (
            <>
              <Image
                source={{ uri: formData.document }}
                className="w-40 h-40 mb-4 mx-auto"
              />
              <TouchableOpacity
                className="bg-primary p-3 mb-4 rounded-lg flex items-center justify-center"
                onPress={handleDocumentUpload}
              >
                <Text className="text-white">Change Document</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              className="bg-primary p-3 mb-4 rounded-lg flex items-center justify-center"
              onPress={handleDocumentUpload}
            >
              <Text className="text-white">Upload Document</Text>
            </TouchableOpacity>
          )}
          {/* Submit Button */}
          <TouchableOpacity className="bg-secondary p-3 rounded-lg">
            <Text className="text-white text-center">Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTenants;
