import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../../components/Buttons";
import { useAuth } from "../../../context/AuthContext";

// Import components
import ProfileSummary from "./components/ProfileSummary";
import SettingsSection from "./components/SettingsSection";
import LogoutModal from "./components/LogoutModal";
import ChangePasswordSheet from "./components/ChangePasswordSheet";

const StyledView = styled(View);
const StyledText = styled(Text);

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { logout: logoutUser } = useAuth();

  // States for modals and sheets
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [passwordBottomSheetVisible, setPasswordBottomSheetVisible] =
    useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  // Settings sections data
  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: <Ionicons name="person" size={22} color="#3498db" />,
          title: "View Profile",
          subtitle: "View your personal information",
          action: () => navigation.navigate("Profile"),
          showArrow: true,
        },
        {
          icon: <Ionicons name="create" size={22} color="#27ae60" />,
          title: "Edit Profile",
          subtitle: "Update your personal information",
          action: () => navigation.navigate("EditProfile"),
          showArrow: true,
        },
        {
          icon: <Ionicons name="key" size={22} color="#f1c40f" />,
          title: "Change Password",
          subtitle: "Update your account password",
          action: () => setPasswordBottomSheetVisible(true),
          showArrow: true,
        },
        {
          icon: <Ionicons name="finger-print" size={22} color="#9b59b6" />,
          title: "Biometric Authentication",
          subtitle: "Login using fingerprint or face ID",
          action: () => setIsBiometricEnabled(!isBiometricEnabled),
          isToggle: true,
          toggleValue: isBiometricEnabled,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: <Ionicons name="notifications" size={22} color="#e74c3c" />,
          title: "Notifications",
          subtitle: "Manage notification preferences",
          action: () => navigation.navigate("NotificationSettings"),
          showArrow: true,
        },
        {
          icon: <Ionicons name="globe" size={22} color="#3498db" />,
          title: "Language",
          subtitle: `Current: ${currentLanguage}`,
          action: () => navigation.navigate("LanguageSettings"),
          showArrow: true,
        },
        {
          icon: <Ionicons name="moon" size={22} color="#34495e" />,
          title: "Dark Mode",
          subtitle: "Switch between light and dark themes",
          action: () => navigation.navigate("AppearanceSettings"),
          showArrow: true,
        },
      ],
    },
    {
      title: "Support & About",
      items: [
        {
          icon: <Ionicons name="help-circle" size={22} color="#f1c40f" />,
          title: "FAQ",
          subtitle: "Frequently asked questions",
          action: () => navigation.navigate("FAQ"),
          showArrow: true,
        },
        {
          icon: <Ionicons name="call" size={22} color="#27ae60" />,
          title: "Contact Support",
          subtitle: "Get help from our support team",
          action: () => navigation.navigate("ContactSupport"),
          showArrow: true,
        },
        {
          icon: <Ionicons name="document-text" size={22} color="#3498db" />,
          title: "Terms & Conditions",
          subtitle: "Read our terms and conditions",
          action: () => navigation.navigate("TermsConditions"),
          showArrow: true,
        },
        {
          icon: <Ionicons name="shield" size={22} color="#9b59b6" />,
          title: "Privacy Policy",
          subtitle: "Read our privacy policy",
          action: () => navigation.navigate("PrivacyPolicy"),
          showArrow: true,
        },
        {
          icon: (
            <Ionicons name="information-circle" size={22} color="#7f8c8d" />
          ),
          title: "About App",
          subtitle: "Version 1.0.0",
          action: () => navigation.navigate("AboutApp"),
          showArrow: true,
        },
      ],
    },
  ];

  const handlePasswordChange = (passwordData) => {
    // Implement password change logic
    console.log("Password change:", passwordData);
  };

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Settings
          </StyledText>
          <StyledView style={{ width: 24 }} />
        </StyledView>
      </StyledView>

      {/* Profile Summary */}
      <ProfileSummary
        user={{
          name: "Divash Ranabhat",
          email: "rbdiwash@gmail.com",
          phone: "+91 98765 43210",
        }}
      />

      {/* Settings List */}
      <ScrollView className="flex-1 px-4 pt-4">
        {settingsSections.map((section, index) => (
          <SettingsSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}

        {/* Logout Button */}
        <StyledView className="mb-8">
          <PrimaryButton
            text="Logout"
            bgColor="#e74c3c"
            fullWidth={true}
            onPress={() => setLogoutModalVisible(true)}
            leftIcon={<Ionicons name="log-out" size={20} color="white" />}
          />
        </StyledView>
      </ScrollView>

      {/* Modals and Bottom Sheets */}
      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onLogout={logoutUser}
      />

      <ChangePasswordSheet
        visible={passwordBottomSheetVisible}
        onClose={() => setPasswordBottomSheetVisible(false)}
        onSubmit={handlePasswordChange}
      />
    </StyledView>
  );
};

export default SettingsScreen;
