import { Modal, Text, TouchableOpacity, View } from "react-native";

const StatusModal = ({
  selectedRequest,
  modalVisible,
  closeModal,
  selectedStatus,
  setSelectedStatus,
  saveStatus,
}) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View
        className="flex-1 justify-center items-center bg-black bg-opacity-95"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      >
        <View className="w-11/12 bg-white rounded-lg p-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Update Status for {selectedRequest?.tenantName}
          </Text>
          {["Pending", "Ongoing", "Fixed"].map((status) => (
            <TouchableOpacity
              key={status}
              className="flex-row items-center mb-4"
              onPress={() => setSelectedStatus(status)}
            >
              <View
                className={`w-5 h-5 rounded-full border-2 border-gray-400 mr-4 ${
                  selectedStatus === status ? "bg-blue-500" : "bg-white"
                }`}
              />
              <Text className="text-gray-800">{status}</Text>
            </TouchableOpacity>
          ))}
          <View className="flex-row justify-end mt-4">
            <TouchableOpacity
              className="px-4 py-2 rounded-lg bg-gray-400 mr-2"
              onPress={closeModal}
            >
              <Text className="text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 rounded-lg bg-blue-500"
              onPress={saveStatus}
            >
              <Text className="text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;
