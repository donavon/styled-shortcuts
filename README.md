# styled-shortcuts 💅
[![Build Status](https://travis-ci.org/donavon/styled-shortcuts.svg?branch=master)](https://travis-ci.org/donavon/styled-shortcuts)
[![npm version](https://img.shields.io/npm/v/styled-shortcuts.svg)](https://www.npmjs.com/package/styled-shortcuts)
[![Coverage Status](https://coveralls.io/repos/github/donavon/styled-shortcuts/badge.svg?branch=master)](https://coveralls.io/github/donavon/styled-shortcuts?branch=master)

TL;DR

* Provides convenient unit property helper functions that go hand-in-hand with
[`styled-components`](https://www.npmjs.com/package/styled-components) 💅
* Small footprint with **No Dependencies**!
* For example, instead of doing this:
  ```js
  width: ${({ percent }) => `${percent}%`};
  ```
  you do this:
  ```js
  width: ${'percent:%'};
  ```

## Install
```bash
$ npm i --save styled-shortcuts
```

## Usage:

```js
import styled from 'styled-components';
import withStyledShortcuts from 'styled-shortcuts';

const Button = withStyledShortcuts(styled.button)`
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

Then use it like this.
```js
<Button borderRadius={5} padding={3}>Press Me</Button>
```

## API

Here's the beauty... There's only one function!
`withStyledShortcuts` is a HOC that you use to wrap an Styled Component tagged template literal function.
You can wrap `styled.div`, `styled(MyComponent)`, anything.

## Live

Check out this live example on [CodeSandbox](https://codesandbox.io/s/new). <<< TODO
