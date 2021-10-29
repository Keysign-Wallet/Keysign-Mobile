import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';

import {Container, Content, Select, StackHeader, Text} from '../../common';
import {LOCALES} from '../../lang';

import {getSettings} from '../redux/selectors';
import {getActiveBank, getBanks} from '../../banks/redux/selectors';
import {setActiveBank as setActiveBankAction} from '../../banks/redux/actions';
import {updateSettings as updateSettingsAction} from '../redux/actions';

/* =============================================================================
<PreferencesScreen />
============================================================================= */
const PreferencesScreen = ({
  banks,
  activeBank,
  activeLang,
  navigation,
  setActiveBank,
  updateSettings,
}) => {
  const intl = useIntl();
  const [bank, setBank] = useState(null);
  const [lang, setLang] = useState();
  const [_banks, setBanks] = useState([]);
  const ADD_BANK_ITEM = {
    label: intl.formatMessage({defaultMessage: 'ADD BANK'}),
    value: 'ADD',
  };

  // Set banks from store
  useEffect(() => {
    setBanks([
      ...banks.map(item => ({
        label: item,
        value: item,
      })),
      ADD_BANK_ITEM,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banks, intl.locale]);

  // Set active bank
  useEffect(() => {
    if (activeBank) {
      setBank(activeBank);
    }
  }, [activeBank]);

  // Set selected language
  useEffect(() => {
    if (activeLang) {
      setLang(activeLang);
    }
  }, [activeLang]);

  const _handleBankChange = _value => {
    if (_value === 'ADD') {
      navigation.navigate('AddBank');
    } else {
      setBank(_value);
      setActiveBank(_value);
    }
  };

  const _handleLangChange = _value => {
    setLang(_value);
    updateSettings({language: _value});
  };

  return (
    <Container>
      <StackHeader
        type="primary"
        title={<FormattedMessage defaultMessage="Preferences" />}
      />
      <Content style={styles.content}>
        <Select
          primary
          data={_banks}
          value={bank}
          label={<FormattedMessage defaultMessage="Select a Bank node" />}
          placeholder={intl.formatMessage({defaultMessage: 'Select'})}
          onChange={_handleBankChange}
        />
        <Text style={styles.info}>
          <FormattedMessage defaultMessage="The default bank is set by keysign." />
          {'\n'}
          <FormattedMessage defaultMessage="To add a new bank, click ADD BANK in dropdown." />
        </Text>
        <Select
          data={LOCALES}
          value={lang}
          label={<FormattedMessage defaultMessage="Choose Language" />}
          placeholder={intl.formatMessage({defaultMessage: 'Select'})}
          onChange={_handleLangChange}
        />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 60,
    paddingHorizontal: 17,
  },
  info: {
    marginTop: 30,
    marginBottom: 60,
    fontSize: 12,
    lineHeight: 14,
  },
});

const mapStateToProps = state => ({
  banks: getBanks(state),
  activeBank: getActiveBank(state),
  activeLang: getSettings(state).language,
});

const mapDispatchToProps = {
  setActiveBank: setActiveBankAction,
  updateSettings: updateSettingsAction,
};

/* Export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(PreferencesScreen);
