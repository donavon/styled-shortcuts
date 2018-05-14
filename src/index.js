import styledTransformProxy from 'styled-transform-proxy';

const appendUnit = (value, unit) => (
  value ? `${value}${unit}` : '0'
);

const getPropValue = (props, keys) => (
  keys.split('.').reduce((obj, key) => obj[key], props)
);

const mapStringTemplateToGetter = (value) => {
  if (typeof value === 'string') {
    const [key, unit] = value.split(':');
    return unit
      ? props => appendUnit(getPropValue(props, key), unit)
      : props => getPropValue(props, key);
  }
  return value;
};

const mapStringTemplatesToGetters = (strings, ...interpolations) => [
  strings,
  ...interpolations.map(mapStringTemplateToGetter),
];

const withStyledShortcuts = styledTransformProxy(mapStringTemplatesToGetters);

export default withStyledShortcuts;
