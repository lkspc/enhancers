# react-router-enhancers

> Enhancers for `react-router` v4+, built with React Hooks

[![NPM](https://img.shields.io/npm/v/@lkspc/react-router-enhancers.svg)](https://www.npmjs.com/package/@lkspc/react-router-enhancers)

## Features

**React Router Enhancers** export several hooks with their paired components.

#### `useScrollToTop` and `ScrollToTop`

Window scrolls to top when pathname changes.

#### `useScrollToTopOnMount` and `ScrollToTopOnMount`

Window scrolls to top when a new route mounted.

#### `useScrollRestoration` and `ScrollRestoration`

Window will scroll to top when a new route mounted and restore previous route's scroll position when navigation back.

## Installation

```bash
# npm
npm install --save @lkspc/react-router-enhancers

# yarn
yarn add @lkspc/react-router-enhancers
```

## Usage

```jsx
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollRestoration } from '@lkspc/react-router-enhancers';

class Example extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollRestoration />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/other" component={Other} />
        </Switch>
      </BrowserRouter>
    );
  }
}
```

For [UmiJS](https://umijs.org/docs/runtime-config#onroutechange-routes-matchedroutes-location-action-) users

```jsx
// app.js

import { createRouteChange } from '@lkspc/react-router-enhancers';

export const onRouteChange = createRouteChange();
```

## License

MIT © [lkspc](https://github.com/lkspc)
