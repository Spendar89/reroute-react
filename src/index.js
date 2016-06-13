import React from 'react';
import router from 'reroute-core';
import { Map, fromJS } from 'immutable';

export default function connect (mapStateToProps, mapRouteToProps) {
  return function (WrappedComponent) {
    const routeProps = mapRouteToProps(e => router.route(e));

    return class Provider extends React.Component {
      handleCommit (state = router.state) {
        this.setState(
          mapStateToProps(state, this.props)
        );
      };

      componentWillMount () {
        router.on(
          'commit',
          this.handleCommit.bind(this)
        );

        this.handleCommit();
      };

      // TODO: determine if this implementation
      // is more efficient than converting to
      // immutable and merging before check
      shouldComponentUpdate (_, nextState) {
        const currentState = this.state || {};

        // values are immutable, so reference
        // equality check works
        for (let k in nextState) {
          if (nextState[k] !== currentState[k]) {
            return true;
          };
        };

        // account for edge case where keys are removed
        // from state
        return Object.keys(nextState).length !==
          Object.keys(currentState).length;
      };

      render () {
        return React.createElement(WrappedComponent, {
          ...this.props,
          ...this.state,
          ...routeProps
        });
      };
    };
  };
};
