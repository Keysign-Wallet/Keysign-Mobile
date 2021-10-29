import React from 'react';
import {connect} from 'react-redux';
import {useIntl} from 'react-intl';
import {Alert, StyleSheet} from 'react-native';

import {Text, View, Touchable} from '../../common';
import BroomIcon from '../../assets/icons/edit-broom.svg';

import {getBanks} from '../../banks/redux/selectors';
import {deleteBank as deleteBankAction} from '../../banks/redux/actions';

const AddBankList = ({banks, deleteBank}) => {
  const intl = useIntl();

  const _handleDeletePress = bank => () => {
    Alert.alert(
      intl.formatMessage({defaultMessage: 'Confirmation'}),
      intl.formatMessage({
        defaultMessage: 'Are you sure you want to remove this bank?',
      }),
      [
        {
          text: intl.formatMessage({defaultMessage: 'No'}),
          style: 'cancel',
        },
        {
          text: intl.formatMessage({defaultMessage: 'Yes'}),
          onPress: () => {
            deleteBank(bank);
          },
        },
      ],
    );
  };

  return (
    <>
      {banks
        .filter(bank => bank !== DEFAULT_BANK)
        .map((bank, i) => (
          <View key={i} style={styles.container}>
            <Text style={styles.title}>{bank}</Text>
            <Touchable
              style={styles.deleteBtn}
              onPress={_handleDeletePress(bank)}>
              <BroomIcon />
            </Touchable>
          </View>
        ))}
    </>
  );
};

const DEFAULT_BANK = 'https://bank.keysign.app';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginVertical: 12,
    fontSize: 17,
  },
  deleteBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});

const mapStateToProps = state => ({
  banks: getBanks(state),
});

const mapDispatchToProps = {
  deleteBank: deleteBankAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBankList);
