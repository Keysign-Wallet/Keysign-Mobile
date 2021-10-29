/**
 * Redux async action creator
 */
export const actionGenerator = actionName => ({
  REQUEST: `${actionName}_REQUEST`,
  SUCCESS: `${actionName}_SUCCESS`,
  FAIL: `${actionName}_FAIL`,
  COMPLETE: `${actionName}_COMPLETE`,
  actionName,
});

/**
 * Normalize response from api for redux store
 */
export const normalize = (state, list, id = 'id', length = 10) => {
  const updatedState = {
    byId: {},
    allIds: [],
  };

  for (let i = 0; i < list.length; i++) {
    updatedState.byId[list[i][id]] = list[i];
    updatedState.allIds.push(list[i][id]);
  }

  return {
    ...state,
    ...updatedState,
  };
};
/**
 * Normalize and merge response from api into redux store
 */
export const merge = (state, list, id = 'id', length = 10) => {
  const updatedState = {
    byId: {...state.byId},
    allIds: [...state.allIds],
  };

  for (let i = 0; i < list.length; i++) {
    if (updatedState.byId[list[i][id]]) {
      updatedState.byId[list[i][id]] = {
        ...updatedState.byId[list[i][id]],
        ...list[i],
      };
    } else {
      updatedState.allIds.push(list[i][id]);
      updatedState.byId[list[i][id]] = list[i];
    }
  }

  return {
    ...state,
    ...updatedState,
  };
};

/**
 * Add an element in state
 */
export const add = (state, payload, invert) => {
  if (state.byId[payload.id]) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [payload.id]: {
          ...state.byId[payload.id],
          ...payload,
        },
      },
    };
  }

  let byId = {...state.byId};

  let allIds = [...state.allIds];

  if (invert) {
    allIds.unshift(payload.id);
  } else {
    allIds.push(payload.id);
  }

  byId[payload.id] = payload;

  return {
    ...state,
    byId,
    allIds,
  };
};

/**
 * Update an element in state
 */
export const update = (state, payload, invert) => {
  let byId = {...state.byId};
  let allIds = [...state.allIds];

  if (!byId[payload.id]) {
    byId[payload.id] = payload;

    if (invert) {
      allIds.unshift(payload.id);
    } else {
      allIds.push(payload.id);
    }
  } else {
    byId[payload.id] = {...byId[payload.id], ...payload};
  }

  return {
    ...state,
    byId,
    allIds,
  };
};

/**
 * Remove an element from state
 */
export const remove = (state, payload) => {
  if (state.byId[payload.id]) {
    let byId = {};
    const allIds = [];

    state.allIds.forEach(id => {
      if (id !== payload.id) {
        allIds.push(id);

        byId[id] = state.byId[id];
      }
    });

    return {
      ...state,
      byId,
      allIds,
    };
  }

  return state;
};
