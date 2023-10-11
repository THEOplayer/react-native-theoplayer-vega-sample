import React, {useState} from 'react';
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface FocusableElementProps extends TouchableOpacityProps {
  preferredFocus?: boolean;
  children?: React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
  onFocusOverrideStyle: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const FocusableElement = ({
  preferredFocus,
  children,
  onPress,
  onBlur,
  onFocus,
  onFocusOverrideStyle,
  style,
  ...otherProps
}: FocusableElementProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusHandler = () => {
    setIsFocused(true);
    onFocus?.();
  };
  const blurHandler = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onFocus={focusHandler}
      onBlur={blurHandler}
      hasTVPreferredFocus={preferredFocus}
      onPress={onPress}
      style={[style, isFocused ? onFocusOverrideStyle : undefined]}
      {...otherProps}>
      {children}
    </TouchableOpacity>
  );
};

export default FocusableElement;
