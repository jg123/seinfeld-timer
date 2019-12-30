import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Quote extends Component {
  static propTypes = {
    quote: PropTypes.object
  };

  static defaultProps = {
    quote: {}
  };

  render() {
    const { quote } = this.props;
    return (
      <>
        <section>
          <dl>
            <dt>Quote</dt>
            <dd>{quote.quote}</dd>
            <dt>Author</dt>
            <dd>{quote.author}</dd>
            <dt>Season</dt>
            <dd>{quote.season}</dd>
            <dt>Episode</dt>
            <dd>{quote.episode}</dd>
          </dl>
        </section>
      </>
    );
  }
}
