import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const BIOMETRIC_ENABLED_KEY = "@biometric_enabled";
const BIOMETRIC_CREDENTIALS_KEY = "@biometric_credentials";

export const useBiometric = () => {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [biometricType, setBiometricType] = useState(null);

  useEffect(() => {
    checkBiometricAvailability();
    loadBiometricState();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      setIsBiometricAvailable(hasHardware && isEnrolled);

      if (
        supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        setBiometricType("Face ID");
      } else if (
        supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FINGERPRINT
        )
      ) {
        setBiometricType("Fingerprint");
      }
    } catch (error) {
      console.error("Error checking biometric availability:", error);
      setIsBiometricAvailable(false);
    }
  };

  const loadBiometricState = async () => {
    try {
      const enabled = await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY);
      setIsBiometricEnabled(enabled === "true");
    } catch (error) {
      console.error("Error loading biometric state:", error);
    }
  };

  const toggleBiometric = async (enabled) => {
    try {
      await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, enabled.toString());
      setIsBiometricEnabled(enabled);
    } catch (error) {
      console.error("Error toggling biometric:", error);
    }
  };

  const saveBiometricCredentials = async (credentials) => {
    try {
      await AsyncStorage.setItem(
        BIOMETRIC_CREDENTIALS_KEY,
        JSON.stringify(credentials)
      );
    } catch (error) {
      console.error("Error saving biometric credentials:", error);
    }
  };

  const getBiometricCredentials = async () => {
    try {
      const credentials = await AsyncStorage.getItem(BIOMETRIC_CREDENTIALS_KEY);
      return credentials ? JSON.parse(credentials) : null;
    } catch (error) {
      console.error("Error getting biometric credentials:", error);
      return null;
    }
  };

  const authenticateWithBiometric = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Authenticate with ${biometricType}`,
        fallbackLabel: "Use passcode",
      });

      if (result.success) {
        const credentials = await getBiometricCredentials();
        return credentials;
      }
      return null;
    } catch (error) {
      console.error("Error authenticating with biometric:", error);
      return null;
    }
  };

  return {
    isBiometricAvailable,
    isBiometricEnabled,
    biometricType,
    toggleBiometric,
    saveBiometricCredentials,
    authenticateWithBiometric,
  };
};
