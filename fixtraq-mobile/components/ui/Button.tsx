import { colors, radius } from "../../theme";
import type { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = PropsWithChildren<{
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}>;

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  onPress,
  style,
  textStyle,
}: ButtonProps) {
  const base: ViewStyle = {
    borderRadius: radius.card,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  };

  const sizes: Record<Size, ViewStyle> = {
    sm: { height: 36, paddingHorizontal: 12 },
    md: { height: 44, paddingHorizontal: 16 },
    lg: { height: 52, paddingHorizontal: 20 },
  };

  const variants: Record<Variant, ViewStyle> = {
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: "#E2E8F0",
    },
    ghost: {
      backgroundColor: "transparent",
    },
  };

  const textColor: Record<Variant, string> = {
    primary: "#FFFFFF",
    secondary: colors.foreground,
    ghost: colors.foreground,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        base,
        sizes[size],
        variants[variant],
        disabled && { opacity: 0.6 },
        style,
      ]}
    >
      {loading && (
        <ActivityIndicator color={textColor[variant]} style={{ marginRight: 6 }} />
      )}
      <Text
        style={[
          {
            color: textColor[variant],
            fontWeight: "600",
            fontSize: 14,
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}


