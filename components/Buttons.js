import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledView = styled(View);

export const PrimaryButton = ({
  text,
  onPress,
  fullWidth = false,
  size = "large",
  loading = false,
  disabled = false,
  bgColor = "#0e2f4f",
  textColor = "white",
  style = {},
  textStyle = {},
  leftIcon,
  rightIcon,
  parentClass,
  ...props
}) => {
  // Size variants
  const sizeStyles = {
    small: "py-2 px-4",
    medium: "py-3 px-4",
    large: "py-3 px-6",
  };

  // Text size variants
  const textSizeStyles = {
    small: "text-sm",
    medium: "text-base",
    large: "text-sm",
  };

  return (
    <View
      className={`rounded-lg ${sizeStyles[size]} ${
        fullWidth ? "w-full" : ""
      } items-center justify-center flex-row ${parentClass}`}
      style={{
        backgroundColor: disabled ? "#a0aec0" : bgColor,
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
      onPress={!disabled && !loading ? onPress : null}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {leftIcon && <StyledView className="mr-2">{leftIcon}</StyledView>}
          <StyledText
            className={`font-bold ${textSizeStyles[size]} `}
            style={{ color: textColor, ...textStyle }}
          >
            {text}
          </StyledText>
          {rightIcon && <StyledView className="ml-2">{rightIcon}</StyledView>}
        </>
      )}
    </View>
  );
};

export const SecondaryButton = ({
  text,
  onPress,
  fullWidth = false,
  size = "small",
  loading = false,
  disabled = false,
  bgColor = "#F59A73",
  textColor = "white",
  style = {},
  textStyle = {},
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Size variants
  const sizeStyles = {
    small: "py-2 px-3",
    medium: "py-3 px-4",
    large: "py-4 px-6",
  };

  // Text size variants
  const textSizeStyles = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <StyledTouchableOpacity
      className={`rounded-xl ${sizeStyles[size]} ${
        fullWidth ? "w-full" : ""
      } items-center justify-center flex-row`}
      style={{
        backgroundColor: disabled ? "#a0aec0" : bgColor,
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
      onPress={!disabled && !loading ? onPress : null}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {leftIcon && <StyledView className="mr-2">{leftIcon}</StyledView>}
          <StyledText
            className={`font-bold ${textSizeStyles[size]}`}
            style={{ color: textColor, ...textStyle }}
          >
            {text}
          </StyledText>
          {rightIcon && <StyledView className="ml-2">{rightIcon}</StyledView>}
        </>
      )}
    </StyledTouchableOpacity>
  );
};

export const OutlinedButton = ({
  text,
  onPress,
  fullWidth = false,
  size = "medium",
  loading = false,
  disabled = false,
  borderColor = "#0e2f4f",
  textColor = "#0e2f4f",
  style = {},
  textStyle = {},
  leftIcon,
  rightIcon,
  parentClass,
  ...props
}) => {
  // Size variants
  const sizeStyles = {
    small: "py-2 px-3",
    medium: "py-3 px-4",
    large: "py-4 px-6",
  };

  // Text size variants
  const textSizeStyles = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <StyledTouchableOpacity
      className={`rounded-lg ${sizeStyles[size]} ${
        fullWidth ? "w-full" : ""
      } items-center justify-center flex-row ${parentClass}`}
      style={{
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: disabled ? "#a0aec0" : borderColor,
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
      onPress={!disabled && !loading ? onPress : null}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={disabled ? "#a0aec0" : textColor}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <StyledView className="mr-2">{leftIcon}</StyledView>}
          <StyledText
            className={`font-bold ${textSizeStyles[size]}`}
            style={{ color: disabled ? "#a0aec0" : textColor, ...textStyle }}
          >
            {text}
          </StyledText>
          {rightIcon && <StyledView className="ml-2">{rightIcon}</StyledView>}
        </>
      )}
    </StyledTouchableOpacity>
  );
};

export const TextButton = ({
  text,
  onPress,
  size = "medium",
  loading = false,
  disabled = false,
  textColor = "#27ae60",
  style = {},
  textStyle = {},
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Text size variants
  const textSizeStyles = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <StyledTouchableOpacity
      className="flex-row items-center justify-center py-2 px-1"
      style={{
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
      onPress={!disabled && !loading ? onPress : null}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={disabled ? "#a0aec0" : textColor}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <StyledView className="mr-2">{leftIcon}</StyledView>}
          <StyledText
            className={`font-bold ${textSizeStyles[size]}`}
            style={{ color: disabled ? "#a0aec0" : textColor, ...textStyle }}
          >
            {text}
          </StyledText>
          {rightIcon && <StyledView className="ml-2">{rightIcon}</StyledView>}
        </>
      )}
    </StyledTouchableOpacity>
  );
};

export const IconButton = ({
  onPress,
  size = "medium",
  loading = false,
  disabled = false,
  bgColor = "#27ae60",
  iconColor = "white",
  style = {},
  iconName = "add",
  iconSize = 24,
  rounded = true,
  ...props
}) => {
  // Size variants
  const sizeStyles = {
    small: { padding: 8, iconSize: iconSize || 16 },
    medium: { padding: 10, iconSize: iconSize || 24 },
    large: { padding: 12, iconSize: iconSize || 28 },
  };

  return (
    <StyledTouchableOpacity
      className={`items-center justify-center ${
        rounded ? "rounded-full" : "rounded-lg"
      }`}
      style={{
        backgroundColor: disabled ? "#a0aec0" : bgColor,
        opacity: disabled ? 0.7 : 1,
        padding: sizeStyles[size].padding,
        ...style,
      }}
      onPress={!disabled && !loading ? onPress : null}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} size="small" />
      ) : (
        <Ionicons
          name={iconName}
          size={sizeStyles[size].iconSize}
          color={iconColor}
        />
      )}
    </StyledTouchableOpacity>
  );
};

export const FloatingActionButton = ({
  onPress,
  loading = false,
  disabled = false,
  bgColor = "#27ae60",
  iconColor = "white",
  style = {},
  iconName = "add",
  position = "bottomRight",
  ...props
}) => {
  // Position styles
  const positionStyles = {
    bottomRight: { bottom: 20, right: 20 },
    bottomLeft: { bottom: 20, left: 20 },
    topRight: { top: 20, right: 20 },
    topLeft: { top: 20, left: 20 },
  };

  return (
    <StyledTouchableOpacity
      className="absolute rounded-full items-center justify-center shadow-lg"
      style={{
        backgroundColor: disabled ? "#a0aec0" : bgColor,
        opacity: disabled ? 0.7 : 1,
        width: 56,
        height: 56,
        ...positionStyles[position],
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        ...style,
      }}
      onPress={!disabled && !loading ? onPress : null}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} size="small" />
      ) : (
        <Ionicons name={iconName} size={24} color={iconColor} />
      )}
    </StyledTouchableOpacity>
  );
};

export const ButtonGroup = ({
  buttons = [],
  activeButtonIndex = 0,
  size = "medium",
  fullWidth = false,
  activeBgColor = "#27ae60",
  activeTextColor = "white",
  inactiveBgColor = "#f8f9fa",
  inactiveTextColor = "#1a2c4e",
  style = {},
  ...props
}) => {
  // Size variants
  const sizeStyles = {
    small: "py-1 px-2",
    medium: "py-2 px-3",
    large: "py-3 px-4",
  };

  // Text size variants
  const textSizeStyles = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  return (
    <StyledView
      className={`flex-row rounded-lg overflow-hidden border border-[#e9ecef] ${
        fullWidth ? "w-full" : ""
      }`}
      style={style}
      {...props}
    >
      {buttons.map((button, index) => (
        <StyledTouchableOpacity
          key={index}
          className={`${sizeStyles[size]} items-center justify-center ${
            fullWidth ? "flex-1" : ""
          }`}
          style={{
            backgroundColor:
              index === activeButtonIndex ? activeBgColor : inactiveBgColor,
            borderLeftWidth: index > 0 ? 1 : 0,
            borderLeftColor: "#e9ecef",
          }}
          onPress={button.onPress}
          activeOpacity={0.8}
        >
          <StyledText
            className={`font-medium ${textSizeStyles[size]}`}
            style={{
              color:
                index === activeButtonIndex
                  ? activeTextColor
                  : inactiveTextColor,
            }}
          >
            {button.text}
          </StyledText>
        </StyledTouchableOpacity>
      ))}
    </StyledView>
  );
};
