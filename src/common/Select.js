import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Text from './Text';
import View from './View';
import Touchable from './Touchable';
import * as Colors from '../config/colors';

/* =============================================================================
<Select />
============================================================================= */
const Select = ({
  label,
  data,
  value,
  primary,
  placeholder,
  optionStyle,
  contentStyle,
  containerStyle,
  optionTextStyle,
  selectedOptionStyle,
  optionsContainerStyle,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const _toggleIsOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  const _handleChange = _value => {
    if (typeof onChange === 'function') {
      onChange(_value);
    }
    _toggleIsOpen();
  };

  return (
    <Touchable
      style={[styles.container, containerStyle]}
      onPress={_toggleIsOpen}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.content, primary && styles.primary, contentStyle]}>
        <Text
          style={[
            styles.value,
            primary && styles.primaryTxt,
            selectedOptionStyle,
          ]}>
          {value ? data.find(item => item.value === value).label : placeholder}
        </Text>
        <FontAwesome5Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          color={primary ? Colors.card : Colors.primary}
        />
      </View>
      {isOpen && (
        <View style={[styles.optionsContainer, optionsContainerStyle]}>
          {data.map(item => (
            <Touchable
              key={item.value}
              onPress={() => _handleChange(item.value)}
              style={[styles.option, optionStyle]}>
              <Text
                style={[styles.optionTxt, styles.primaryTxt, optionTextStyle]}>
                {item.label}
              </Text>
            </Touchable>
          ))}
        </View>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    marginBottom: 16,
    color: Colors.label,
    fontSize: 12,
  },
  content: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  value: {
    color: Colors.primary,
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  primaryTxt: {
    color: Colors.card,
  },
  optionsContainer: {
    marginTop: 6,
    borderRadius: 15,
    backgroundColor: Colors.primary,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderTopColor: Colors.card,
  },
  optionTxt: {
    fontSize: 14,
  },
});

export default Select;
