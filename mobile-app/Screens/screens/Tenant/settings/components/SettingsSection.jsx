import { View, Text, TouchableOpacity, Switch } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SettingsSection = ({ title, items }) => {
  return (
    <StyledView className="mb-6">
      <StyledText className="text-[#1a2c4e] text-lg font-bold mb-2">
        {title}
      </StyledText>
      <StyledView className="bg-white rounded-xl shadow-sm overflow-hidden">
        {items.map((item, itemIndex) => (
          <StyledTouchableOpacity
            key={itemIndex}
            className={`p-4 flex-row items-center justify-between ${
              itemIndex < items.length - 1 ? "border-b border-[#f0f2f5]" : ""
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
              <Ionicons name="chevron-forward" size={20} color="#8395a7" />
            ) : null}
          </StyledTouchableOpacity>
        ))}
      </StyledView>
    </StyledView>
  );
};

export default SettingsSection;
