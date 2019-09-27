**No longer needed, https://github.com/ReactTraining/react-router/issues/5437#issuecomment-534796727**

# react-router ComponentLink

This is a clone of Link, but it allows you to pass a `component` property which will be used to render the DOM element being clicked (the traditional `Link` component renders an `<a>` element). Nothing else is changed.

![Version][BADGE_VERSION]
![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]

## using

It works exactly like `Link` from react-router:

``` jsx
import {Link} from "evergreen-ui"
import ComponentLink from "react-router-component-link"

export default function Header () {
  return <header>
    Welcome to my special website, click <ComponentLink to="/heck" component={Link}>here to go to heck.</ComponentLink>
  </header>
}
```

That's it.


[BADGE_TRAVIS]: https://img.shields.io/travis/krainboltgreene/react-router-component-link.js.svg?maxAge=2592000&style=flat-square
[BADGE_VERSION]: https://img.shields.io/npm/v/react-router-component-link.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
