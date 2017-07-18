# Styled Shortcuts 💅
[![Build Status](https://travis-ci.org/donavon/styled-shortcuts.svg?branch=master)](https://travis-ci.org/donavon/styled-shortcuts)
[![npm version](https://img.shields.io/npm/v/styled-shortcuts.svg)](https://www.npmjs.com/package/styled-shortcuts)
[![Coverage Status](https://coveralls.io/repos/github/donavon/styled-shortcuts/badge.svg?branch=master)](https://coveralls.io/github/donavon/styled-shortcuts?branch=master)

TL;DR

* Now with **Theme Support**!
* Provides convenient props shortcut helper for
[Styled Components](https://www.npmjs.com/package/styled-components) 💅
* Small footprint with **No Dependencies**!
* With Styled Shortcuts you can now do this:
  ```js
  font-size: ${'fontSize:px'};
  ```
  instead of this:
  ```js
  font-size: ${({ fontSize }) => `${fontSize}px`};
  ```
* Use any unit (e.g. `px`, `%`, `cm`, you name it) or no unit at all.

## Install
```bash
$ npm i --save styled-shortcuts
```

## API

Here's the beauty... There's only one function!
Styled Shortcut provides a higher order function that you use to wrap Styled Components, like this:

```js
import rawStyled from 'styled-components';
import shortcuts from 'styled-shortcuts';

const styled = shortcuts(rawStyled);
```

And to make everyone's life easier, there's now a package that does this for you.
In fact, it is a direct replacement for `styled-components`.
It imports both `styled-components` and `styled-shortcuts` and exports the wrapped `styled`.

All you have to do is make a one-line change your components to `import` from `styled-shortcut-components`
instead of `styled-components`.
```js
// import styled from 'styled-components';
import styled from 'styled-shortcut-components';
```

## Usage

Any template string value is assumed to be a `props` key.
For example, `${'color'}` will return the `prop` named `color`.
Your can also assign a "unit" suffix. It can be anything, such as `px`, `%`, `em`, etc.
Simply separate the unit from the prop key with a colon.
For example `${'width:px'}` will return the `width` prop with the "px" suffix.

See this example below:
```js
import styled from 'styled-shortcut-components';

const Button = styled.button`
  padding: ${'padding:em'};
  border-radius: ${'borderRadius:px'};
  width: ${'width:%'};
  color: ${'color'};
`;

Button.defaultProps = {
  padding: 1,
  borderRadius: 4,
  width: 100,
  color: 'red',
};
```

## Using with Themes

You can specify a props key that contains a dotted object notation.

For example:
```js
const Button = styled.button`
  padding: 0.25em 1em;
  border-radius: ${'theme.button.borderRadius:px'};
  color: ${'theme.color'};
  border: 2px solid ${'theme.color'};
`;
```
See the [Styled Components documentation](https://www.styled-components.com/docs/advanced#theming)
for complete details on how to enable theming.

## Do It Live!

Check out this live example on [CodeSandbox](https://codesandbox.io/s/jRE0XxR9v).

![Do It Live!](https://media.giphy.com/media/q7UpJegIZjsk0/giphy.gif)
