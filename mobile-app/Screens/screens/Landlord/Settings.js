"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../../components/Buttons";
import { useStateData } from "../../../hooks/useStateData";
import { getInitials } from "../../helper/const";
import { useAuth } from "../../../context/AuthContext";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import the new components
import LogoutModal from "./components/LogoutModal";
import LanguageBottomSheet from "./components/LanguageBottomSheet";
import ChangePasswordBottomSheet from "./components/ChangePasswordBottomSheet";
import NotificationsBottomSheet from "./components/NotificationsBottomSheet";
import AboutAppBottomSheet from "./components/AboutAppBottomSheet";
import ContactSupportBottomSheet from "./components/ContactSupportBottomSheet";
import { useProfile } from "../../../hooks/useProfile";
import Toast from "react-native-toast-message";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { profile } = useStateData();
  const { logout } = useAuth();

  // States for toggles and modals
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [languageBottomSheetVisible, setLanguageBottomSheetVisible] =
    useState(false);
  const [passwordBottomSheetVisible, setPasswordBottomSheetVisible] =
    useState(false);
  const [notificationsBottomSheetVisible, setNotificationsBottomSheetVisible] =
    useState(false);
  const [aboutAppBottomSheetVisible, setAboutAppBottomSheetVisible] =
    useState(false);
  const [
    contactSupportBottomSheetVisible,
    setContactSupportBottomSheetVisible,
  ] = useState(false);

  // Current language
  const [currentLanguage, setCurrentLanguage] = useState("English");

  // Password data
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    chatNotifications: true,
    paymentReminders: true,
    maintenanceUpdates: true,
    noticeAlerts: true,
    appUpdates: false,
  });

  useEffect(() => {
    checkBiometricAvailability();
    loadBiometricPreference();
  }, []);

  const checkBiometricAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricAvailable(compatible);
  };

  const loadBiometricPreference = async () => {
    try {
      const value = await AsyncStorage.getItem("biometricEnabled");
      setIsBiometricEnabled(value === "true");
    } catch (error) {
      console.error("Error loading biometric preference:", error);
    }
  };

  const handleBiometricToggle = async (value) => {
    if (value) {
      // If enabling biometric, authenticate first
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to enable biometric login",
        fallbackLabel: "Use passcode",
      });

      if (result.success) {
        try {
          await AsyncStorage.setItem("biometricEnabled", "true");
          setIsBiometricEnabled(true);
          Alert.alert("Success", "Biometric login has been enabled");
        } catch (error) {
          console.error("Error saving biometric preference:", error);
          Alert.alert("Error", "Failed to enable biometric login");
        }
      }
    } else {
      // If disabling biometric, just update the state
      try {
        await AsyncStorage.setItem("biometricEnabled", "false");
        setIsBiometricEnabled(false);
        Alert.alert("Success", "Biometric login has been disabled");
      } catch (error) {
        console.error("Error saving biometric preference:", error);
        Alert.alert("Error", "Failed to disable biometric login");
      }
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData({
      ...passwordData,
      [field]: value,
    });
  };

  const toggleNotificationSetting = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language.name);
    setLanguageBottomSheetVisible(false);
  };

  // Settings sections
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
          action: () => navigation.navigate("Edit Profile"),
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
          subtitle: isBiometricAvailable
            ? "Login using fingerprint or face ID"
            : "Biometric authentication not available",
          action: () => handleBiometricToggle(!isBiometricEnabled),
          isToggle: true,
          toggleValue: isBiometricEnabled,
          disabled: !isBiometricAvailable,
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
          action: () => setNotificationsBottomSheetVisible(true),
          showArrow: true,
        },
        {
          icon: <Ionicons name="globe" size={22} color="#3498db" />,
          title: "Language",
          subtitle: `Current: ${currentLanguage}`,
          action: () => setLanguageBottomSheetVisible(true),
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
          action: () => setContactSupportBottomSheetVisible(true),
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
          action: () => setAboutAppBottomSheetVisible(true),
          showArrow: true,
        },
      ],
    },
  ];

  const { mutate, isLoading } = useProfile().changePasswordRequest();

  const handleUpdatePassword = () => {
    const payload = {
      email: profile?.email,
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    };
    mutate(
      { data: payload },
      {
        onSuccess: () => {
          Toast.show({
            text1: "Success",
            text2: "Password updated successfully",
            type: "success",
          });
          setPasswordBottomSheetVisible(false);
        },
        onError: (error) => {
          console.log(error.response.data?.message);
          alert("Error !! " + error.response.data?.message);
        },
      }
    );
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
      <StyledView className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm flex-row items-center">
        <StyledView className="w-16 h-16 rounded-full bg-primary justify-center items-center">
          <StyledText className="text-white text-2xl font-bold">
            {getInitials(profile?.name)}
          </StyledText>
        </StyledView>
        <StyledView className="ml-4 flex-1">
          <StyledText className="text-[#1a2c4e] text-lg font-bold">
            {profile?.name}
          </StyledText>
          <StyledText className="text-[#8395a7]">{profile?.email}</StyledText>
          <StyledText className="text-[#8395a7]">
            {profile?.phoneNumber || "N/A"}
          </StyledText>
        </StyledView>
      </StyledView>

      {/* Settings List */}
      <StyledScrollView className="flex-1 px-4 pt-4">
        {settingsSections.map((section, sectionIndex) => (
          <StyledView key={sectionIndex} className="mb-6">
            <StyledText className="text-[#1a2c4e] text-lg font-bold mb-2">
              {section.title}
            </StyledText>
            <StyledView className="bg-white rounded-xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <StyledTouchableOpacity
                  key={itemIndex}
                  className={`p-4 flex-row items-center justify-between ${
                    itemIndex < section.items.length - 1
                      ? "border-b border-[#f0f2f5]"
                      : ""
                  }`}
                  onPress={item.action}
                  disabled={item.isToggle}
                >
                  <StyledView className="flex-row items-center flex-1">
                    <StyledView className="w-10 h-10 rounded-full bg-[#f0f2f5] justify-center items-center">
                      {item.icon}
                    </StyledView>
                    <StyledView className="ml-3 flex-1">
                      <StyledText className="text-[#1a2c4e] font-medium">
                        {item.title}
                      </StyledText>
                      <StyledText className="text-[#8395a7] text-sm">
                        {item.subtitle}
                      </StyledText>
                    </StyledView>
                  </StyledView>

                  {item.isToggle ? (
                    <Switch
                      value={item.toggleValue}
                      onValueChange={item.action}
                      trackColor={{ false: "#e9ecef", true: "#27ae60" }}
                      thumbColor={"#ffffff"}
                    />
                  ) : item.showArrow ? (
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#8395a7"
                    />
                  ) : null}
                </StyledTouchableOpacity>
              ))}
            </StyledView>
          </StyledView>
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
      </StyledScrollView>

      {/* Modals and Bottom Sheets */}
      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onLogout={logout}
      />

      <LanguageBottomSheet
        visible={languageBottomSheetVisible}
        onClose={() => setLanguageBottomSheetVisible(false)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      <ChangePasswordBottomSheet
        visible={passwordBottomSheetVisible}
        isLoading={isLoading}
        onClose={() => setPasswordBottomSheetVisible(false)}
        passwordData={passwordData}
        onPasswordChange={handlePasswordChange}
        showCurrentPassword={showCurrentPassword}
        showNewPassword={showNewPassword}
        showConfirmPassword={showConfirmPassword}
        onToggleCurrentPassword={() =>
          setShowCurrentPassword(!showCurrentPassword)
        }
        onToggleNewPassword={() => setShowNewPassword(!showNewPassword)}
        onToggleConfirmPassword={() =>
          setShowConfirmPassword(!showConfirmPassword)
        }
        onUpdatePassword={handleUpdatePassword}
      />

      <NotificationsBottomSheet
        visible={notificationsBottomSheetVisible}
        onClose={() => setNotificationsBottomSheetVisible(false)}
        notificationSettings={notificationSettings}
        onToggleSetting={toggleNotificationSetting}
        onSaveSettings={() => {
          alert("Success", "Notification settings updated");
          setNotificationsBottomSheetVisible(false);
        }}
      />

      <AboutAppBottomSheet
        visible={aboutAppBottomSheetVisible}
        onClose={() => setAboutAppBottomSheetVisible(false)}
        onCheckUpdates={() => {
          alert(
            "App is up to date",
            "You are using the latest version of the app."
          );
        }}
        onRateApp={() => {
          setAboutAppBottomSheetVisible(false);
        }}
      />

      <ContactSupportBottomSheet
        visible={contactSupportBottomSheetVisible}
        onClose={() => setContactSupportBottomSheetVisible(false)}
        onCallSupport={() => {
          setContactSupportBottomSheetVisible(false);
        }}
        onEmailSupport={() => {
          setContactSupportBottomSheetVisible(false);
        }}
      />
    </StyledView>
  );
};

export default SettingsScreen;
