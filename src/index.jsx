import React from 'react';
import ReactDOM from 'react-dom';
import ReactExperimentsApp from 'components/ReactExperimentsApp';
// import MyUseReducer from 'components/MyUseReducer';

ReactDOM.render(<ReactExperimentsApp />, document.getElementById('reactExperiments'));
// ReactDOM.render(<MyUseReducer.AppWithReducer />, document.getElementById('reactExperiments'));

if (module.hot) {
  module.hot.accept();
}
