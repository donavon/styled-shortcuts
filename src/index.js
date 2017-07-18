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

const withStyledShortcuts = styled => (
  (strings, ...values) => {
    const newValues = values.map(mapStringTemplateToGetter);
    return styled(strings, ...newValues);
  }
);

const withStyledShortcutsFunction = styled => (...args) => (
  withStyledShortcuts(styled(...args))
);

const wrapStyled = (styled) => {
  const styledShortcuts = withStyledShortcutsFunction(styled); // styled(Component)

  Object.keys(styled).forEach((key) => {
    if (typeof styled[key] === 'function' && styled[key].attrs) { // styled.div
      styledShortcuts[key] = withStyledShortcuts(styled[key]);
      styledShortcuts[key].attrs = withStyledShortcutsFunction(styled[key].attrs);
    } else {
      styledShortcuts[key] = styled[key];
    }
  });

  return styledShortcuts;
};

export default wrapStyled;
