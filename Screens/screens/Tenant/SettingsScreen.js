"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton, OutlinedButton } from "../../../components/Buttons";
import BottomSheet from "../../../components/Bottomsheet";
import { useAuth } from "../../../context/AuthContext";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);

const SettingsScreen = () => {
  const navigation = useNavigation();

  // States for toggles and modals
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [languageBottomSheetVisible, setLanguageBottomSheetVisible] =
    useState(false);
  const [passwordBottomSheetVisible, setPasswordBottomSheetVisible] =
    useState(false);
  const { logout: logoutUser } = useAuth();

  // Current language
  const [currentLanguage, setCurrentLanguage] = useState("English");

  // Available languages
  const languages = [
    { id: "en", name: "English" },
    { id: "hi", name: "हिंदी (Nepali)" },
  ];

  // Update the Change Password Bottom Sheet to have actual input fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (field, value) => {
    setPasswordData({
      ...passwordData,
      [field]: value,
    });
  };

  // Add states for additional bottom sheets
  const [notificationsBottomSheetVisible, setNotificationsBottomSheetVisible] =
    useState(false);
  const [aboutAppBottomSheetVisible, setAboutAppBottomSheetVisible] =
    useState(false);
  const [
    contactSupportBottomSheetVisible,
    setContactSupportBottomSheetVisible,
  ] = useState(false);

  // Add notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    chatNotifications: true,
    paymentReminders: true,
    maintenanceUpdates: true,
    noticeAlerts: true,
    appUpdates: false,
  });

  const toggleNotificationSetting = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  // Handle logout

  // Handle language change
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language.name);
    setLanguageBottomSheetVisible(false);
    // Implement language change logic here
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
          <StyledText className="text-white text-2xl font-bold">JD</StyledText>
        </StyledView>
        <StyledView className="ml-4 flex-1">
          <StyledText className="text-[#1a2c4e] text-lg font-bold">
            Divash Ranabhat
          </StyledText>
          <StyledText className="text-[#8395a7]">
            rbdiwash@gmail.com{" "}
          </StyledText>
          <StyledText className="text-[#8395a7]">+91 98765 43210</StyledText>
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

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <StyledView className="flex-1 justify-center items-center bg-black/50">
          <StyledView className="bg-white rounded-xl p-6 w-[80%] max-w-md">
            <StyledView className="items-center mb-4">
              <Ionicons name="log-out" size={50} color="#e74c3c" />
              <StyledText className="text-[#1a2c4e] text-xl font-bold mt-2">
                Logout
              </StyledText>
              <StyledText className="text-[#8395a7] text-center mt-2">
                Are you sure you want to logout from your account?
              </StyledText>
            </StyledView>

            <StyledView className="flex-row justify-between mt-4">
              <OutlinedButton
                text="Cancel"
                borderColor="#8395a7"
                textColor="#8395a7"
                style={{ flex: 1, marginRight: 8 }}
                onPress={() => setLogoutModalVisible(false)}
              />
              <PrimaryButton
                text="Logout"
                bgColor="#e74c3c"
                style={{ flex: 1, marginLeft: 8 }}
                onPress={logoutUser}
              />
            </StyledView>
          </StyledView>
        </StyledView>
      </Modal>

      {/* Language Bottom Sheet */}
      <BottomSheet
        visible={languageBottomSheetVisible}
        onClose={() => setLanguageBottomSheetVisible(false)}
        title="Select Language"
      >
        <StyledView className="p-4">
          {[
            { id: "en", name: "English", flag: "🇺🇸" },
            { id: "hi", name: "हिंदी (Hindi)", flag: "🇮🇳" },
            { id: "kn", name: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
            { id: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
            { id: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
          ].map((language) => (
            <StyledTouchableOpacity
              key={language.id}
              className={`flex-row items-center p-4 rounded-lg mb-2 ${
                currentLanguage === language.name ? "bg-[#e9f7ef]" : ""
              }`}
              onPress={() => handleLanguageChange(language)}
            >
              <StyledText className="text-2xl mr-3">{language.flag}</StyledText>
              <StyledView className="flex-1">
                <StyledText className="text-[#1a2c4e] font-medium">
                  {language.name}
                </StyledText>
              </StyledView>
              {currentLanguage === language.name && (
                <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
              )}
            </StyledTouchableOpacity>
          ))}
        </StyledView>
      </BottomSheet>

      {/* Change Password Bottom Sheet */}
      <BottomSheet
        visible={passwordBottomSheetVisible}
        onClose={() => setPasswordBottomSheetVisible(false)}
        title="Change Password"
      >
        <StyledView className="p-4">
          <StyledView className="mb-4">
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              Current Password
            </StyledText>
            <StyledView className="flex-row items-center border border-[#e9ecef] rounded-lg p-3">
              <Ionicons
                name="lock-closed"
                size={20}
                color="#8395a7"
                style={{ marginRight: 10 }}
              />
              <TextInput
                className="flex-1 text-[#1a2c4e]"
                placeholder="Enter current password"
                secureTextEntry={!showCurrentPassword}
                value={passwordData.currentPassword}
                onChangeText={(text) =>
                  handlePasswordChange("currentPassword", text)
                }
              />
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Ionicons
                  name={showCurrentPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#8395a7"
                />
              </TouchableOpacity>
            </StyledView>
          </StyledView>

          <StyledView className="mb-4">
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              New Password
            </StyledText>
            <StyledView className="flex-row items-center border border-[#e9ecef] rounded-lg p-3">
              <Ionicons
                name="lock-closed"
                size={20}
                color="#8395a7"
                style={{ marginRight: 10 }}
              />
              <TextInput
                className="flex-1 text-[#1a2c4e]"
                placeholder="Enter new password"
                secureTextEntry={!showNewPassword}
                value={passwordData.newPassword}
                onChangeText={(text) =>
                  handlePasswordChange("newPassword", text)
                }
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#8395a7"
                />
              </TouchableOpacity>
            </StyledView>
          </StyledView>

          <StyledView className="mb-6">
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              Confirm New Password
            </StyledText>
            <StyledView className="flex-row items-center border border-[#e9ecef] rounded-lg p-3">
              <Ionicons
                name="lock-closed"
                size={20}
                color="#8395a7"
                style={{ marginRight: 10 }}
              />
              <TextInput
                className="flex-1 text-[#1a2c4e]"
                placeholder="Confirm new password"
                secureTextEntry={!showConfirmPassword}
                value={passwordData.confirmPassword}
                onChangeText={(text) =>
                  handlePasswordChange("confirmPassword", text)
                }
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#8395a7"
                />
              </TouchableOpacity>
            </StyledView>
          </StyledView>

          <PrimaryButton
            text="Update Password"
            fullWidth={true}
            onPress={() => {
              alert("Success", "Password updated successfully");
              setPasswordBottomSheetVisible(false);
            }}
          />
        </StyledView>
      </BottomSheet>

      {/* Notifications Bottom Sheet */}
      <BottomSheet
        visible={notificationsBottomSheetVisible}
        onClose={() => setNotificationsBottomSheetVisible(false)}
        title="Notification Settings"
      >
        <StyledView className="p-4">
          <StyledText className="text-[#8395a7] mb-4">
            Customize which notifications you want to receive
          </StyledText>

          {[
            {
              id: "chatNotifications",
              title: "Chat Messages",
              icon: "chatbubble",
              color: "#3498db",
            },
            {
              id: "paymentReminders",
              title: "Payment Reminders",
              icon: "cash",
              color: "#27ae60",
            },
            {
              id: "maintenanceUpdates",
              title: "Maintenance Updates",
              icon: "construct",
              color: "#f1c40f",
            },
            {
              id: "noticeAlerts",
              title: "Notice Alerts",
              icon: "megaphone",
              color: "#e74c3c",
            },
            {
              id: "appUpdates",
              title: "App Updates",
              icon: "refresh-circle",
              color: "#9b59b6",
            },
          ].map((item) => (
            <StyledView
              key={item.id}
              className="flex-row items-center justify-between p-4 border-b border-[#f0f2f5]"
            >
              <StyledView className="flex-row items-center">
                <StyledView className="w-10 h-10 rounded-full bg-[#f0f2f5] justify-center items-center mr-3">
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </StyledView>
                <StyledText className="text-[#1a2c4e] font-medium">
                  {item.title}
                </StyledText>
              </StyledView>
              <Switch
                value={notificationSettings[item.id]}
                onValueChange={() => toggleNotificationSetting(item.id)}
                trackColor={{ false: "#e9ecef", true: "#27ae60" }}
                thumbColor={"#ffffff"}
              />
            </StyledView>
          ))}

          <StyledView className="mt-6">
            <PrimaryButton
              text="Save Settings"
              fullWidth={true}
              onPress={() => {
                alert("Success", "Notification settings updated");
                setNotificationsBottomSheetVisible(false);
              }}
            />
          </StyledView>
        </StyledView>
      </BottomSheet>

      {/* About App Bottom Sheet */}
      <BottomSheet
        visible={aboutAppBottomSheetVisible}
        onClose={() => setAboutAppBottomSheetVisible(false)}
        title="About App"
      >
        <StyledView className="p-4">
          <StyledView className="items-center mb-6">
            <StyledView className="w-20 h-20 rounded-full bg-[#1a2c4e] justify-center items-center mb-3">
              <Entypo name="home" size={40} color="white" />
            </StyledView>
            <StyledText className="text-[#1a2c4e] text-xl font-bold">
              Gharbeti
            </StyledText>
            <StyledText className="text-[#8395a7]">
              Version 1.0.0 (Build 103)
            </StyledText>
          </StyledView>

          <StyledView className="bg-[#f8f9fa] rounded-xl p-4 mb-4">
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              App Details
            </StyledText>

            <StyledView className="flex-row justify-between mb-2">
              <StyledText className="text-[#8395a7]">Version</StyledText>
              <StyledText className="text-[#1a2c4e]">1.0.0</StyledText>
            </StyledView>

            <StyledView className="flex-row justify-between mb-2">
              <StyledText className="text-[#8395a7]">Build Number</StyledText>
              <StyledText className="text-[#1a2c4e]">103</StyledText>
            </StyledView>

            <StyledView className="flex-row justify-between mb-2">
              <StyledText className="text-[#8395a7]">Release Date</StyledText>
              <StyledText className="text-[#1a2c4e]">June 15, 2023</StyledText>
            </StyledView>

            <StyledView className="flex-row justify-between">
              <StyledText className="text-[#8395a7]">Platform</StyledText>
              <StyledText className="text-[#1a2c4e]">iOS & Android</StyledText>
            </StyledView>
          </StyledView>

          <StyledView className="bg-[#f8f9fa] rounded-xl p-4 mb-6">
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              Developer
            </StyledText>
            <StyledText className="text-[#8395a7] mb-2">
              Gharbeti Technologies Pvt. Ltd.
            </StyledText>
            <StyledText className="text-[#8395a7]">
              © 2023 Gharbeti. All rights reserved.
            </StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between">
            <OutlinedButton
              text="Check for Updates"
              borderColor="#3498db"
              textColor="#3498db"
              style={{ flex: 1, marginRight: 4 }}
              onPress={() => {
                alert(
                  "App is up to date",
                  "You are using the latest version of the app."
                );
              }}
            />
            <PrimaryButton
              text="Rate App"
              style={{ flex: 1, marginLeft: 4 }}
              bgColor="#f1c40f"
              onPress={() => {
                // Implement rate app functionality
                setAboutAppBottomSheetVisible(false);
              }}
            />
          </StyledView>
        </StyledView>
      </BottomSheet>

      {/* Contact Support Bottom Sheet */}
      <BottomSheet
        visible={contactSupportBottomSheetVisible}
        onClose={() => setContactSupportBottomSheetVisible(false)}
        title="Contact Support"
      >
        <StyledView className="p-4">
          <StyledView className="items-center mb-6">
            <StyledView className="w-16 h-16 rounded-full bg-[#27ae60] justify-center items-center mb-2">
              <Ionicons name="headset" size={32} color="white" />
            </StyledView>
            <StyledText className="text-[#1a2c4e] text-lg font-bold">
              We're here to help!
            </StyledText>
            <StyledText className="text-[#8395a7] text-center mt-1">
              Our support team is available 24/7 to assist you with any issues
            </StyledText>
          </StyledView>

          <StyledView className="bg-[#f8f9fa] rounded-xl p-4 mb-4">
            <StyledView className="flex-row items-center mb-3">
              <Ionicons
                name="call"
                size={20}
                color="#27ae60"
                style={{ marginRight: 10 }}
              />
              <StyledView>
                <StyledText className="text-[#1a2c4e] font-medium">
                  Call Support
                </StyledText>
                <StyledText className="text-[#8395a7]">
                  +91 800-123-4567
                </StyledText>
              </StyledView>
            </StyledView>

            <StyledView className="flex-row items-center mb-3">
              <Ionicons
                name="mail"
                size={20}
                color="#3498db"
                style={{ marginRight: 10 }}
              />
              <StyledView>
                <StyledText className="text-[#1a2c4e] font-medium">
                  Email Support
                </StyledText>
                <StyledText className="text-[#8395a7]">
                  support@gharbeti.com
                </StyledText>
              </StyledView>
            </StyledView>

            <StyledView className="flex-row items-center">
              <Ionicons
                name="chatbubbles"
                size={20}
                color="#9b59b6"
                style={{ marginRight: 10 }}
              />
              <StyledView>
                <StyledText className="text-[#1a2c4e] font-medium">
                  Live Chat
                </StyledText>
                <StyledText className="text-[#8395a7]">
                  Available 9 AM - 6 PM
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>

          <StyledView className="flex-row justify-between">
            <PrimaryButton
              text="Call Now"
              style={{ flex: 1, marginRight: 4 }}
              leftIcon={<Ionicons name="call" size={16} color="white" />}
              onPress={() => {
                // Implement call functionality
                setContactSupportBottomSheetVisible(false);
              }}
            />
            <PrimaryButton
              text="Email"
              style={{ flex: 1, marginLeft: 4 }}
              bgColor="#3498db"
              leftIcon={<Ionicons name="mail" size={16} color="white" />}
              onPress={() => {
                // Implement email functionality
                setContactSupportBottomSheetVisible(false);
              }}
            />
          </StyledView>
        </StyledView>
      </BottomSheet>
    </StyledView>
  );
};

export default SettingsScreen;
