import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import AddBankList from '../components/AddBankList';
import {
  Text,
  Button,
  Content,
  TextInput,
  Container,
  StackHeader,
} from '../../common';

import {getLoading} from '../../banks/redux/selectors';
import {createBank as createBankAction} from '../../banks/redux/actions';

/* =============================================================================
<AddBankScreen />
============================================================================= */
const AddBankScreen = ({loading, createBank}) => {
  const intl = useIntl();
  const [bankNode, setBankNode] = useState('');
  const disabled = !bankNode || loading;

  const _handlePress = () => {
    if (!disabled) {
      createBank(bankNode.trim(), () => {
        setBankNode('');
      });
    }
  };

  return (
    <Container>
      <StackHeader
        type="primary"
        title={intl.formatMessage({defaultMessage: 'Add Bank'})}
      />
      <Content style={styles.content}>
        <Text style={styles.headTxt}>
          {intl.formatMessage({defaultMessage: 'Add your BANK node here:'})}
        </Text>
        <TextInput
          value={bankNode}
          placeholder={intl.formatMessage({defaultMessage: 'Bank Node'})}
          keyboardType="url"
          onChange={setBankNode}
        />
        <Button
          style={styles.btn}
          title={intl.formatMessage({defaultMessage: 'ADD BANK'})}
          loading={loading}
          disabled={disabled}
          onPress={_handlePress}
        />
        <AddBankList />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 60,
    paddingHorizontal: 17,
  },
  headTxt: {
    fontSize: 12,
  },
  btn: {
    marginTop: 30,
    marginBottom: 20,
  },
});

const mapStateToProps = state => ({
  loading: getLoading(state),
});

const mapDispatchToProps = {
  createBank: createBankAction,
};

/* Export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(AddBankScreen);
