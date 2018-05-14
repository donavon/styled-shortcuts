import withStyledShortcuts from './';

const TEMPLATE_FACTORY_FN_NAMES = ['attrs', 'withConfig'];

const mock = (strings, ...values) => ({ strings, values });

TEMPLATE_FACTORY_FN_NAMES.forEach((fnName) => {
  mock[fnName] = () => mock;
});

const styled = () => mock;
styled.div = mock;

const wrappedStyled = withStyledShortcuts(styled);

describe('withStyledShortcuts', () => {
  test('is a function', () => {
    expect(typeof withStyledShortcuts).toBe('function');
  });

  test('that returns a function', () => {
    const data = withStyledShortcuts(mock);
    expect(typeof data).toBe('function');
  });
});

const testTemplateFn = (mockStyled) => {
  test('is a function', () => {
    expect(typeof mockStyled).toBe('function');
  });

  test('calling that function returns { [strings], [values] }', () => {
    const strings = ['foo'];
    const data = mockStyled(strings, 'bar');
    expect(data.strings).toBe(strings);
    expect(typeof data.values).toBe('object');
    expect(data.values instanceof Array).toBe(true);
  });

  test('ignore non-string values', () => {
    const strings = ['foo'];
    const data = mockStyled(strings, 12, {}, []);
    data.values.forEach((value) => {
      expect(typeof value).not.toBe('function');
    });
  });

  test('[values] are all functions', () => {
    const strings = ['foo'];
    const data = mockStyled(strings, 'bar', 'baz', 'boz');
    data.values.forEach((value) => {
      expect(typeof value).toBe('function');
    });
  });

  test('calling one of these functions with props, will return correct prop', () => {
    const strings = ['foo'];
    const data = mockStyled(strings, 'bar');
    const fn = data.values[0];
    const prop = fn({ bar: 'bar' });
    expect(prop).toBe('bar');
  });

  test('calling one of these functions with props, will return correct prop (w/units)', () => {
    const strings = ['foo'];
    const data = mockStyled(strings, 'bar:unit');
    const fn = data.values[0];
    const prop = fn({ bar: 'baz' });
    expect(prop).toBe('bazunit');
  });

  test('calling one of these functions with dotted props, will return correct prop', () => {
    const strings = ['foo'];
    const data = mockStyled(strings, 'a.b');
    const fn = data.values[0];
    const prop = fn({ a: { b: 'c' } });
    expect(prop).toBe('c');
  });

  test('calling one of these functions with dotted props, will return correct prop (w/units)', () => {
    const strings = ['foo'];
    const data = mockStyled(strings, 'a.b:unit');
    const fn = data.values[0];
    const prop = fn({ a: { b: 'c' } });
    expect(prop).toBe('cunit');
  });

  test('calling one of these functions with props, will return correct prop (num w/units)', () => {
    const strings = ['foo'];
    const data = mockStyled(strings, 'bar:unit');
    const fn = data.values[0];
    const prop = fn({ bar: 42 });
    expect(prop).toBe('42unit');
  });

  test('calling one of these functions with props, will return correct prop (0 w/units)', () => {
    const strings = ['foo'];
    const data = mockStyled(strings, 'bar:unit');
    const fn = data.values[0];
    const prop = fn({ bar: 0 });
    expect(prop).toBe('0');
  });
};

const testStyled = (mockStyled) => {
  TEMPLATE_FACTORY_FN_NAMES.forEach((fnName) => {
    const templateFn = mockStyled[fnName]();
    const chainedTemplateFn = templateFn[fnName]();

    describe(`has \`${fnName}()\` function that returns a template function`, () => {
      testTemplateFn(templateFn);
    });

    describe(`has \`${fnName}()\` function that is chainable`, () => {
      testTemplateFn(chainedTemplateFn);
    });
  });
};

describe('The new wrapped object', () => {
  describe('Wrapping a Component ie: wrappedStyled(Component)', () => {
    testStyled(wrappedStyled({}));
  });

  describe('A pre-defined HTML element ie: wrappedStyled.div', () => {
    testStyled(wrappedStyled.div);
  });
});
