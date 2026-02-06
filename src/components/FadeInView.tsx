import React, { useEffect } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

interface FadeInViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  delay?: number;
  duration?: number;
}

const FadeInView = ({ children, style, delay = 0, duration = 500 }: FadeInViewProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    translateY.value = withDelay(delay, withTiming(0, { duration }));
  }, [delay, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
