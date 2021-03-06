import React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";
import {createLocation} from "history";

const isModifiedEvent = (event) =>
  Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

// The public API for rendering a history-aware <a>.
class ComponentLink extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    target: PropTypes.string,
    replace: PropTypes.bool,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    innerRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  static defaultProps = {
    replace: false,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (
      // onClick prevented default
      !event.defaultPrevented &&
      // ignore everything but left clicks
      event.button === 0 &&
      // let browser handle "target=_blank" etc.
      !this.props.target &&
      // ignore clicks with modifier keys
      !isModifiedEvent(event)
    ) {
      event.preventDefault();

      const {history} = this.context.router;
      const {replace, to} = this.props;

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  };

  render () {
    const {replace, to, innerRef, component: Component, ...props} = this.props; // eslint-disable-line no-unused-vars

    invariant(
      this.context.router,
      "You should not use <ComponentLink> outside a <Router>"
    );

    invariant(to !== undefined, "You must specify the \"to\" property");

    const {history} = this.context.router;
    const location = typeof to === "string" ? createLocation(to, null, null, history.location) : to;

    const href = history.createHref(location);


    return (
      <Component {...props} onClick={this.handleClick} href={href} ref={innerRef} />
    );
  }
}

export default ComponentLink;
