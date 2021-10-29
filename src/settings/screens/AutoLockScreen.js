import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

import {Button, Content, StackHeader, TextInput} from '../../common';
import AutoLockItem from '../components/AutoLockItem';

import {getLoading, getSettings} from '../redux/selectors';
import {updateSettings as updateSettingsAction} from '../redux/actions';

/* =============================================================================
<AutoLockScreen />
============================================================================= */
const AutoLockScreen = ({settings, loading, navigation, updateSettings}) => {
  const [autoLock, setAutoLock] = useState('');
  const [idleLockTime, setIdleLockTime] = useState('');
  const disabled = loading;

  // Sync state with settings
  useEffect(() => {
    if (settings && settings.autoLock) {
      setAutoLock(settings.autoLock);
    }
    if (settings && settings.idleLockTime) {
      setIdleLockTime(`${settings.idleLockTime}`);
    }
  }, [settings]);

  const _handleChange = name => checked => {
    setAutoLock(prevState => (checked ? name : prevState));
  };

  const _handleSavePress = () => {
    if (!disabled) {
      updateSettings(
        {
          autoLock,
          idleLockTime,
        },
        () => {
          navigation.navigate('Settings');
        },
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.select({ios: 'padding', android: undefined})}>
      <StackHeader
        type="secondary"
        title={<FormattedMessage defaultMessage="Auto Lock" />}
      />
      <Content style={styles.content}>
        <AutoLockItem
          value={autoLock === 'default'}
          title={<FormattedMessage defaultMessage="DEFAULT" />}
          description={
            <FormattedMessage defaultMessage="Lock the Keysign manually or when the app is closed." />
          }
          onCheck={_handleChange('default')}
        />
        <AutoLockItem
          value={autoLock === 'device'}
          title={<FormattedMessage defaultMessage="DEVICE LOCK" />}
          disabled
          description={
            <FormattedMessage defaultMessage="Auto-lock the Keysign when the device locks." />
          }
          onCheck={_handleChange('device')}
        />
        <AutoLockItem
          value={autoLock === 'idle'}
          title={<FormattedMessage defaultMessage="IDLE LOCK" />}
          description={
            <FormattedMessage
              defaultMessage="Auto-lock the Keysign after the app window is idle for the
            specified number of minutes."
            />
          }
          onCheck={_handleChange('idle')}
        />
        <TextInput
          value={idleLockTime}
          editable={autoLock === 'idle'}
          keyboardType="number-pad"
          containerStyle={styles.inputField}
          onChange={setIdleLockTime}
        />
        <Button
          style={styles.saveBtn}
          title={<FormattedMessage defaultMessage="SAVE" />}
          loading={loading}
          disabled={disabled}
          onPress={_handleSavePress}
        />
      </Content>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 17,
  },
  inputField: {
    marginTop: 60,
  },
  saveBtn: {
    marginTop: 20,
  },
});

const mapStateToProps = state => ({
  loading: getLoading(state),
  settings: getSettings(state),
});

const mapDispatchToProps = {
  updateSettings: updateSettingsAction,
};

/* Export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(AutoLockScreen);
