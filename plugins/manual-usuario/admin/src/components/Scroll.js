import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import PropTypes from 'prop-types';

const Element = props => {
  return props.children;
};

class Scroll extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    element: PropTypes.string,
    offset: PropTypes.number,
    timeout: PropTypes.number,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  };
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    smoothscroll.polyfill();
  }
  handleClick(e) {
      console.log("Clickityclick!\r\n", this);
    e.preventDefault();
    const { onClick = () => {} } = this.props;
    let elem = 0;
    let scroll = true;
    const { type, element, offset, timeout } = this.props;
    if (type && element) {
      switch (type) {
        case 'class':
            console.log(`Getting element with class: '${element}'`);
            console.log("Element:\r\n", document.getElementById(element));
          elem = document.getElementsByClassName(element)[0];
          scroll = elem ? true : false;
          break;
        case 'id':
            console.log(`Getting element with id: '${element}'`);
            console.log("Element:\r\n", document.getElementById(element));
          elem = document.getElementById(element);
          scroll = elem ? true : false;
          break;
        default:
      }
    }
    scroll
      ? this.scrollTo(elem, offset, timeout)
      : console.log(`Element not found: ${element}`); // eslint-disable-line

      onClick(e);
  }
  scrollTo(element, offSet = 0, timeout = null) {
    const elemPos = element
      ? element.getBoundingClientRect().top + window.pageYOffset
      : 0;
    if (timeout) {
      setTimeout(() => {
        window.scroll({ top: elemPos + offSet, left: 0, behavior: 'smooth' });
      }, timeout);
    } else {
      window.scroll({ top: elemPos + offSet, left: 0, behavior: 'smooth' });
    }
  }
  render() {
    return (
      <Element>
        {typeof this.props.children === 'object' ? (
          React.cloneElement(this.props.children, { onClick: this.handleClick })
        ) : (
          <span role="button" tabIndex={0} onKeyPress={this.handleKeyPress} onClick={this.handleClick}>{this.props.children}</span>
        )}
      </Element>
    );
  }
}

export default Scroll;