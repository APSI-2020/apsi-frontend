import produce from 'immer';

import { dataActionNames } from './actions';

const { COUNTER_INCREASED } = dataActionNames;

const data = {
  counter: 0,
};

export const dataReducer = produce((draft, action) => {
  const { type } = action;

  switch (type) {
    case COUNTER_INCREASED: {
      draft.counter += action.increaseValue;
      break;
    }
    default:
      return;
  }
}, data);
