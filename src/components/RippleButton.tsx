import React from 'react';
import {
  View,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
  TouchableHighlightProps,
} from 'react-native';

interface Props extends TouchableHighlightProps {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const RippleButton: React.FC<Props> = ({
  style = {},
  containerStyle = {},
  children = null,
  ...props
}) => {

  const defaultTouchableProps: TouchableHighlightProps = {
    underlayColor: 'rgba(0, 0, 0, 0.1)'
  };

  return (
    <View style={containerStyle}>
      <TouchableHighlight {...defaultTouchableProps} {...props}>
        <View style={style}>{children}</View>
      </TouchableHighlight>
    </View>
  );
};

export default RippleButton;