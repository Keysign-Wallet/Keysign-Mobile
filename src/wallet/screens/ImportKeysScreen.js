import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {Alert, StyleSheet} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {connect} from 'react-redux';

import {
  Text,
  View,
  Button,
  Touchable,
  Container,
  StackHeader,
} from '../../common';
import * as Colors from '../../config/colors';

import {getLoading} from '../redux/selectors';
import {importWallets as importWalletsAction} from '../redux/actions';

/* =============================================================================
<ImportKeyScreen />
============================================================================= */
const ImportKeysScreen = ({loading, navigation, importWallets}) => {
  const intl = useIntl();
  const [file, setFile] = useState(null);
  const disabled = !file || loading;

  const _handleChooseFilePress = async () => {
    try {
      const [res] = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
      });
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        Alert.alert(
          intl.formatMessage({defaultMessage: 'Error'}),
          intl.formatMessage({defaultMessage: 'Unable to select file'}),
        );
      }
    }
  };

  const _handleImportPress = () => {
    if (!disabled) {
      importWallets(file, error => {
        if (error) {
          Alert.alert(
            intl.formatMessage({defaultMessage: 'Error'}),
            // intl.formatMessage({defaultMessage: 'Unable to import wallets'}),
            error.message,
          );
        } else {
          Alert.alert(
            intl.formatMessage({defaultMessage: 'Success'}),
            intl.formatMessage({
              defaultMessage: 'Wallets has been imported successfully',
            }),
          );
          setFile(null);
        }
      });
    }
  };

  return (
    <Container>
      <StackHeader
        title={intl.formatMessage({defaultMessage: 'Import Keys'})}
        type="secondary"
      />
      <View style={styles.contentContainer}>
        <Touchable
          style={styles.touchable}
          disabled={loading}
          onPress={_handleChooseFilePress}>
          <Text style={styles.placeholderTxt}>
            {file
              ? `${file.name} (${intl.formatNumber(file.size / 1024)} KB)`
              : intl.formatMessage({defaultMessage: 'Choose a file'})}
          </Text>
        </Touchable>
        <Button
          style={styles.btn}
          title={intl.formatMessage({defaultMessage: 'Import'})}
          loading={loading}
          disabled={disabled}
          onPress={_handleImportPress}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 17,
  },
  btn: {
    marginTop: 60,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 0.5,
    paddingHorizontal: 14,
    borderColor: Colors.border,
    borderRadius: 15,
  },
  placeholderTxt: {
    color: Colors.placeholder,
    fontSize: 12,
    lineHeight: 24,
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
  },
});

const mapStateToProps = state => ({
  loading: getLoading(state),
});

const mapDispatchToProps = {
  importWallets: importWalletsAction,
};

/* Export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(ImportKeysScreen);
