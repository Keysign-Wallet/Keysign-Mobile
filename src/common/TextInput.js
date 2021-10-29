import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
} from 'react-native';

import InfoIcon from '../assets/icons/edit-info-circle.svg';
import * as Colors from '../config/colors';

/* =============================================================================
<TextInput />
============================================================================= */
const TextInput = ({
  left,
  right,
  type,
  label,
  value,
  editable,
  errorText,
  inputStyle,
  labelStyle,
  placeholder,
  containerStyle,
  contentContainerStyle,
  onChange,
  ...props
}) => {
  const _handleChange = inputValue => {
    if (onChange) {
      onChange(inputValue);
    }
  };

  return (
    <Pressable style={[styles.container, containerStyle]} disabled={!editable}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.content, contentContainerStyle]}>
        {left}
        <RNTextInput
          value={value}
          style={[
            styles.input,
            left && styles.inputWithLeft,
            right && styles.inputWithRight,
            inputStyle,
          ]}
          editable={editable}
          selectionColor="#8A93A0"
          placeholderTextColor={Colors.placeholder}
          placeholder={placeholder}
          onChangeText={_handleChange}
          {...props}
        />
        {right}
        {!right && !!errorText && <InfoIcon fill={Colors.danger} />}
      </View>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </Pressable>
  );
};

TextInput.defaultProps = {
  type: 'primary',
  editable: true,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    marginBottom: 6,
    color: Colors.label,
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    lineHeight: 18,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 15,
    backgroundColor: Colors.card,
  },
  input: {
    height: 45,
    flex: 1,
    color: Colors.placeholder,
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
  },
  inputWithLeft: {
    marginLeft: 14,
  },
  inputWithRight: {
    marginRight: 14,
  },
  error: {
    marginTop: 10,
    color: Colors.danger,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});

export default TextInput;
