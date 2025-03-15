import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { OutlinedButton } from "../../../../components/Buttons";
import useGharbeti from "../../../../context/useGharbeti";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [{ isLoggedIn }, { setIsLoggedIn }] = useGharbeti();

  const profileSections = [
    {
      title: "Personal Information",
      icon: <FontAwesome5 name="user" size={20} color="#3498db" />,
      items: [
        { label: "Name", value: "Divash Ranabhat" },
        { label: "Email", value: "rbdiwash@gmail.com" },
        { label: "Phone", value: "+91 98765 43210" },
      ],
    },
    {
      title: "Lease & Rooms Information",
      icon: <Entypo name="documents" size={20} color="#9b59b6" />,
      items: [
        { label: "Property", value: "Apartment 303, Green Valley" },
        { label: "Rooms", value: "4" },
        { label: "Vacant", value: "3" },
        { label: "Occupied", value: "1" },
      ],
    },
  ];

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row justify-between items-center mb-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Profile
          </StyledText>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </StyledView>
      </StyledView>

      <ScrollView className="flex-1 px-4 pt-4">
        {/* Profile Header */}
        <StyledView className="bg-white rounded-xl p-6 shadow-md mb-6 items-center">
          <StyledView className="w-24 h-24 rounded-full bg-secondary justify-center items-center mb-4">
            <StyledText className="text-white text-3xl font-bold">
              JD
            </StyledText>
          </StyledView>
          <StyledText className="text-[#1a2c4e] text-xl font-bold mb-1">
            Divash Ranabhat
          </StyledText>
          <StyledText className="text-[#8395a7] mb-4">
            Tenant since January 2023
          </StyledText>
          <StyledTouchableOpacity
            className="bg-[#f8f9fa] px-4 py-2 rounded-lg border border-[#e9ecef]"
            onPress={() => navigation.navigate("LeaseDetails")}
          >
            <StyledText className="text-[#1a2c4e]">
              View Lease Agreement
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Profile Sections */}
        {profileSections.map((section, index) => (
          <StyledView
            key={index}
            className="bg-white rounded-xl p-4 shadow-md mb-6"
          >
            <StyledView className="flex-row items-center mb-4">
              <StyledView className="w-10 h-10 rounded-full bg-[#f8f9fa] justify-center items-center mr-3">
                {section.icon}
              </StyledView>
              <StyledText className="text-[#1a2c4e] text-lg font-bold">
                {section.title}
              </StyledText>
            </StyledView>

            {section.items.map((item, itemIndex) => (
              <StyledView
                key={itemIndex}
                className="flex-row justify-between py-3"
                style={{
                  borderBottomWidth:
                    itemIndex < section.items.length - 1 ? 1 : 0,
                  borderBottomColor: "#e9ecef",
                }}
              >
                <StyledText className="text-[#8395a7]">{item.label}</StyledText>
                <StyledText className="text-[#1a2c4e] font-medium">
                  {item.value}
                </StyledText>
              </StyledView>
            ))}
          </StyledView>
        ))}

        {/* Logout Button */}

        <OutlinedButton
          text="Logout"
          parentClass={"mb-8"}
          onPress={() => setIsLoggedIn(false)}
        />
      </ScrollView>
    </StyledView>
  );
};

export default ProfileScreen;
