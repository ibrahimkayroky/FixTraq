import { colors, radius } from "../../theme";
import type { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

type CardProps = ViewProps & {
  muted?: boolean;
};

export function Card({ children, style, muted, ...rest }: PropsWithChildren<CardProps>) {
  return (
    <View
      style={[
        {
          backgroundColor: muted ? "#F8FAFC" : colors.surface,
          borderRadius: radius.card,
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: "#0F172A",
          shadowOpacity: muted ? 0 : 0.06,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}


