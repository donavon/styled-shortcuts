import withStyledShortcuts from '.';

const mockStyled = (strings, ...values) => ({ strings, values });

test('withStyledShortcuts is a function', () => {
  expect(typeof withStyledShortcuts).toBe('function');
});

test('that returns a function', () => {
  const data = withStyledShortcuts(mockStyled);
  expect(typeof data).toBe('function');
});

test('calling that function returns { [strings], [values] }', () => {
  const strings = ['foo'];
  const data = withStyledShortcuts(mockStyled)(strings, 'bar');
  expect(data.strings).toBe(strings);
  expect(typeof data.values).toBe('object');
  expect(data.values instanceof Array).toBe(true);
});

test('ignore non-string values', () => {
  const strings = ['foo'];
  const data = withStyledShortcuts(mockStyled)(strings, 12, {}, []);
  data.values.forEach((value) => {
    expect(typeof value).not.toBe('function');
  });
});

test('[values] are all functions', () => {
  const strings = ['foo'];
  const data = withStyledShortcuts(mockStyled)(strings, 'bar', 'baz', 'boz');
  data.values.forEach((value) => {
    expect(typeof value).toBe('function');
  });
});

test('calling one of these functions with props, will return correct prop', () => {
  const strings = ['foo'];
  const data = withStyledShortcuts(mockStyled)(strings, 'bar');
  const fn = data.values[0];
  const prop = fn({ bar: 'bar' });
  expect(prop).toBe('bar');
});
test('calling one of these functions with props, will return correct prop (w/units)', () => {
  const strings = ['foo'];
  const data = withStyledShortcuts(mockStyled)(strings, 'bar:unit');
  const fn = data.values[0];
  const prop = fn({ bar: 'baz' });
  expect(prop).toBe('bazunit');
});
test('calling one of these functions with props, will return correct prop (num w/units)', () => {
  const strings = ['foo'];
  const data = withStyledShortcuts(mockStyled)(strings, 'bar:unit');
  const fn = data.values[0];
  const prop = fn({ bar: 42 });
  expect(prop).toBe('42unit');
});
test('calling one of these functions with props, will return correct prop (0 w/units)', () => {
  const strings = ['foo'];
  const data = withStyledShortcuts(mockStyled)(strings, 'bar:unit');
  const fn = data.values[0];
  const prop = fn({ bar: 0 });
  expect(prop).toBe('0');
});
