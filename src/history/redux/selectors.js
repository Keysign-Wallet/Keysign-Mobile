import moment from 'moment';
import {createSelector} from 'reselect';

/**
 * Get error
 */
export const getError = state => state.History.error;

/**
 * Get loading
 */
export const getLoading = state => state.History.loading;

/**
 * Get all ids
 */
export const getAllIds = state => state.History.allIds;

/**
 * Get byId
 */
export const getById = state => state.History.byId;

/**
 * Get show fee
 */
export const getShowFee = state => state.History.showFee;

/**
 * Get by wallet
 */
export const getByWallet = state => state.History.byWallet;

/**
 * Get id
 */
const getId = (state, {id}) => id;

/**
 * Get wallet id
 */
const getWalletId = (state, {walletId}) => walletId;

/**
 * Get transaction by id
 */
export const makeGetTransactionById = () =>
  createSelector([getById, getId], (byId, id) => byId[id]);

/**
 * Get wallet transaction ids
 */
export const getWalletTransactionIds = createSelector(
  [getByWallet, getWalletId],
  (byWallet, walletId) => byWallet[walletId] || [],
);

/**
 * Get wallet transaction ids
 */
export const getVisibleWalletTransactionIds = createSelector(
  [getWalletTransactionIds, getById, getShowFee],
  (ids, byId, showFee) => ids.filter(id => (showFee ? true : !byId[id].fee)),
);

/**
 * Get wallet transactions ids by date
 */
export const getWalletTransactionIdsByDate = createSelector(
  [getVisibleWalletTransactionIds, getById],
  (ids, byId) => {
    const sections = [];
    const transactions = ids
      .map(id => ({
        ...byId[id],
      }))
      .sort(
        (a, b) =>
          new Date(b.block.created_date) - new Date(a.block.created_date),
      );
    transactions.forEach(transaction => {
      const date = new Date(transaction.block.created_date);
      let sectionIndex = -1;
      sections.forEach((section, index) => {
        if (
          moment(section.title).format('MM/YYYY') ===
          moment(date).format('MM/YYYY')
        ) {
          sectionIndex = index;
        }
      });
      if (sectionIndex > -1) {
        sections[sectionIndex].data.push(transaction.id);
      } else {
        sections.push({
          title: date,
          data: [transaction.id],
        });
      }
    });
    return sections;
  },
);
