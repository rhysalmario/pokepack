export const INIT_COMMONS = 'INIT_COMMONS';
export const INIT_UNCOMMONS = 'INIT_UNCOMMONS';
export const INIT_RARES = 'INIT_RARES';

export const initCommons = (commons) => {
  return {
    type: INIT_COMMONS,
    payload: commons
  };
};

export const initUncommons = (uncommons) => {
  return {
    type: INIT_UNCOMMONS,
    payload: uncommons
  };
};

export const initRares = (rares) => {
  return {
    type: INIT_RARES,
    payload: rares
  }
}