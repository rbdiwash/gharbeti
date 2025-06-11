import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useLeaseAggreements } from "../../../hooks/useLeaseAggreements";

const RulesModal = ({ visible, onClose, onAccept }) => {
  // const { state } = useAuth();
  // const landlordData = state?.userData?.landlord || {};
  // const { data: leaseAgreements } = useLeaseAggreements().getLeaseAggreements(
  //   landlordData?._id
  // );
  // console.log("leaseAgreements", leaseAgreements);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/70">
        <View className="bg-[#34495e] rounded-xl p-6 w-[90%] max-h-[80%]">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-white">
              House Rules & Regulations
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Entypo name="cross" size={24} color="#bdc3c7" />
            </TouchableOpacity>
          </View>

          <ScrollView className="bg-[#2c3e50] rounded-lg p-4">
            <View className="border-l-4 border-[#27ae60] pl-3 mb-6">
              <Text className="text-base mb-2 font-bold text-white">
                1. Rent Payment
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Rent is due on the 1st of each month
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Late payments will incur a fee of 5% after the 5th
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Payment methods: Bank transfer, cash, or through the app
              </Text>
            </View>

            <View className="border-l-4 border-[#27ae60] pl-3 mb-6">
              <Text className="text-base mb-2 font-bold text-white">
                2. Property Care
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Report any damages immediately
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • No modifications without landlord approval
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Keep common areas clean and tidy
              </Text>
            </View>

            <View className="border-l-4 border-[#27ae60] pl-3 mb-6">
              <Text className="text-base mb-2 font-bold text-white">
                3. Noise & Disturbances
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Quiet hours: 10 PM to 7 AM
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • No parties without prior approval
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Respect neighbors and other tenants
              </Text>
            </View>

            <View className="border-l-4 border-[#27ae60] pl-3 mb-6">
              <Text className="text-base mb-2 font-bold text-white">
                4. Guests
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Overnight guests limited to 3 consecutive nights
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Tenants are responsible for their guests' behavior
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Long-term guests must be approved by landlord
              </Text>
            </View>

            <View className="border-l-4 border-[#27ae60] pl-3 mb-6">
              <Text className="text-base mb-2 font-bold text-white">
                5. Maintenance
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Regular cleaning is tenant's responsibility
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Major repairs will be handled by the landlord
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Report maintenance issues through the app
              </Text>
            </View>

            <View className="border-l-4 border-[#27ae60] pl-3 mb-6">
              <Text className="text-base mb-2 font-bold text-white">
                6. Termination
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • 30 days notice required before moving out
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Property must be returned in original condition
              </Text>
              <Text className="text-sm mb-1 text-[#bdc3c7]">
                • Security deposit will be returned within 14 days after
                inspection
              </Text>
            </View>
          </ScrollView>

          <View className="flex-row justify-between mt-6">
            <TouchableOpacity
              className="bg-[#7f8c8d] py-3 px-6 rounded-lg"
              onPress={onClose}
            >
              <Text className="text-white font-semibold">Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#27ae60] py-3 px-6 rounded-lg"
              onPress={onAccept}
            >
              <Text className="text-white font-semibold">I Agree</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RulesModal;
