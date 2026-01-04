import { colors, radius } from "../../theme";
import type { PropsWithChildren } from "react";
import { Text, View, ViewProps } from "react-native";

type Tone = "neutral" | "success" | "warning" | "danger" | "info";

type BadgeProps = ViewProps &
  PropsWithChildren<{
    tone?: Tone;
  }>;

export function Badge({ tone = "neutral", children, style, ...rest }: BadgeProps) {
  const palette: Record<Tone, { bg: string; fg: string }> = {
    neutral: { bg: "#E5E7EB", fg: "#374151" },
    success: { bg: "#DCFCE7", fg: "#166534" },
    warning: { bg: "#FEF3C7", fg: "#92400E" },
    danger: { bg: "#FEE2E2", fg: "#991B1B" },
    info: { bg: "#E0F2FE", fg: "#075985" },
  };

  const { bg, fg } = palette[tone];

  return (
    <View
      style={[
        {
          backgroundColor: bg,
          borderRadius: radius.pill,
          paddingHorizontal: 10,
          paddingVertical: 4,
          alignSelf: "flex-start",
        },
        style,
      ]}
      {...rest}
    >
      <Text
        style={{
          color: fg,
          fontSize: 11,
          fontWeight: "600",
        }}
      >
        {children}
      </Text>
    </View>
  );
}


