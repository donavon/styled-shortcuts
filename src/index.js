const appendUnit = (value, unit) => (
  value ? `${value}${unit}` : '0'
);

const mapStringTemplateToGetter = (value) => {
  if (typeof value === 'string') {
    const [key, unit] = value.split(':');
    return unit
      ? props => appendUnit(props[key], unit)
      : props => props[key];
  }
  return value;
};

const withStyledShortcuts = styled => (
  (strings, ...values) => {
    const newValues = values.map(mapStringTemplateToGetter);
    return styled(strings, ...newValues);
  }
);

const wrapStyled = (styled) => {
  const styledShortcuts = (...args) => (
    withStyledShortcuts(styled(...args)) // styled(Component)
  );

  Object.keys(styled).forEach((key) => {
    const hasOwnProperty = Object.prototype.hasOwnProperty.call(styled, key);
    if (hasOwnProperty) {
      if (typeof styled[key] === 'function') { // styled.div, etc?
        styledShortcuts[key] = withStyledShortcuts(styled[key]);
        styledShortcuts[key].attrs = (...args) => (
          withStyledShortcuts(styled[key].attrs(...args))
        );
      } else {
        styledShortcuts[key] = styled[key]; // copy over non functions
      }
    }
  });

  return styledShortcuts;
};

export default wrapStyled;
