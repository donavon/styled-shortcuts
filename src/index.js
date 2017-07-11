const appendUnit = (value, unit) => (
  value ? `${value}${unit}` : '0'
);

const withStyledShortcuts = styled => (
  (strings, ...values) => {
    const newValues = values.map((value) => {
      if (typeof value === 'string') {
        const [key, unit] = value.split(':');
        return unit
          ? props => appendUnit(props[key], unit)
          : props => props[key];
      }
      return value;
    });
    return styled(strings, ...newValues);
  }
);

export default withStyledShortcuts;
