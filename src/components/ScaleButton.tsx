import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface ScaleButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleAmount?: number;
}

const ScaleButton = ({ onPress, children, style, scaleAmount = 0.95 }: ScaleButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onPressIn = () => {
    scale.value = withSpring(scaleAmount, { damping: 10, stiffness: 100 });
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
  };

  return (
    // @ts-ignore
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[style, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default ScaleButton;
