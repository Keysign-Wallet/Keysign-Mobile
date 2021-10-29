import React from 'react';
import RNCheckBox from 'react-native-check-box';
import {Pressable} from 'react-native';

import * as Colors from '../config/colors';
import CheckBoxChecked from '../assets/icons/checkbox-checked.svg';
import CheckBoxUnChecked from '../assets/icons/checkbox-unchecked.svg';

/* =============================================================================
<Checkbox />
============================================================================= */
const Checkbox = ({label, checked, style, labelStyle, disabled, onChange}) => {
  const _handleChange = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <RNCheckBox
      rightText={label}
      isChecked={checked}
      Component={Pressable}
      onClick={_handleChange}
      disabled={disabled}
      style={style}
      tintColor={Colors.card}
      checkedImage={<CheckBoxChecked />}
      unCheckedImage={<CheckBoxUnChecked />}
    />
  );
};

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
