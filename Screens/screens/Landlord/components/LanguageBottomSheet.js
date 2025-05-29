import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "../../../../components/Bottomsheet";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LanguageBottomSheet = ({
  visible,
  onClose,
  currentLanguage,
  onLanguageChange,
}) => {
  const languages = [
    { id: "en", name: "English", flag: "🇺🇸" },
    { id: "hi", name: " नेपाली (Nepali)", flag: "🇳🇵" },
  ];

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Select Language">
      <StyledView className="p-4">
        {languages.map((language) => (
          <StyledTouchableOpacity
            key={language.id}
            className={`flex-row items-center p-4 rounded-lg mb-2 ${
              currentLanguage === language.name ? "bg-[#e9f7ef]" : ""
            }`}
            onPress={() => onLanguageChange(language)}
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
  );
};

export default LanguageBottomSheet;
