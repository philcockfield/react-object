import R from 'ramda';

export css from 'js-util/lib/react-css';
export { PropTypes } from 'react-schema';



export const isEmptyObjectOrArray = (value) => {
  if (R.is(Object, value)) { return R.keys(value).length === 0; }
  if (R.is(Array, value)) { return value.length === 0; }
  return false;
};
