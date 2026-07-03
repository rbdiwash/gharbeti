import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LandlordCodeScreen() {
  const [landlordCode, setLandlordCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Dummy landlord code validation
    if (landlordCode === "123456") {
      setShowModal(true);
    } else {
      setIsValid(false);
    }
  };

  const handleAgree = () => {
    setShowModal(false);
    // navigation.replace("Home"); // Navigate to Home after agreement
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Enter Landlord Code
      </Text>

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg"
        placeholder="Enter Code"
        value={landlordCode}
        onChangeText={setLandlordCode}
      />

      {!isValid && (
        <Text className="text-red-500 mt-2">Invalid Code. Try Again.</Text>
      )}

      <TouchableOpacity
        className="w-full bg-blue-600 py-3 rounded-lg mt-4"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-bold text-lg">
          Continue
        </Text>
      </TouchableOpacity>

      {/* House Rules Popup */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-xl font-bold text-green-600 mb-4">
              🎉 Congratulations!
            </Text>
            <Text className="text-gray-700 mb-4">
              Welcome to your new home! We are delighted to have you join our
              home. Please take a moment to review the house rules below,
              designed to ensure a pleasant and respectful environment for
              everyone:
            </Text>
            <Text className="text-gray-600 text-sm mb-4">
              1. Please ensure your rent is paid by the due date each month.
              {"\n"}
              2. We kindly ask that you keep quiet after 10 PM so everyone can
              enjoy a peaceful environment.{"\n"}
              3. Please help keep the common areas clean and tidy.{"\n"}
              4. Kindly report any maintenance issues as soon as they arise.
              {"\n"}
              5. We request that you avoid causing any damage – please refrain
              from scratching surfaces and using pins or nails on the walls.
            </Text>
            {/* <Text className="text-gray-600 text-sm mb-4">
              1. कृपया प्रत्येक महिनाको तोकिएको मितिभन्दा अघि भाडा तिर्नुहोस्।
              {"\n"}
              2. सबैलाई शान्त वातावरण मिलोस भनेर, कृपया राति १० बजेपछि आवाज कम
              गर्नुहोस्।{"\n"}
              3. साझा क्षेत्रहरू सफा र मिलाएर राख्न मद्दत गर्नुहोस्।{"\n"}
              4. कुनै पनि मर्मत सम्बन्धी समस्या आएमा, कृपया सकेसम्म चाँडो
              जानकारी दिनुहोस्।{"\n"}
              5. कृपया कुनै क्षति हुन नदिनुहोस् – पर्खालहरूमा चिरा पार्ने, पिन
              वा कील प्रयोग गर्नबाट जोगिनुहोस्।
            </Text> */}
            <Text className="text-gray-700 mb-4">
              By clicking "Agree & Continue," you accept these rules and agree
              to help foster a friendly, cooperative community.
            </Text>
            <TouchableOpacity
              className="bg-green-600 py-2 rounded-lg mb-3"
              onPress={handleAgree}
            >
              <Text className="text-white text-center font-bold text-lg">
                Agree & Continue
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border border-gray-400 py-2 rounded-lg"
              onPress={() => setShowModal(false)}
            >
              <Text className="text-gray-700 text-center font-bold text-lg">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
