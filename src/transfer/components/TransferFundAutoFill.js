import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {useFormikContext} from 'formik';

/* =============================================================================
<TransferFundScreen />
============================================================================= */
const TransferFundAutoFill = () => {
  const route = useRoute();
  const {setFieldValue} = useFormikContext();

  useEffect(() => {
    if (route?.params?.address) {
      setFieldValue('address', route.params.address);
    }
    if (route?.params?.memo) {
      setFieldValue('memoChecked', true);
      setFieldValue('memo', route.params.memo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  return null;
};

export default TransferFundAutoFill;
