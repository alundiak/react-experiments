import React from 'react';
import ReactDOM from 'react-dom';
import ReactExperimentsApp from 'components/ReactExperimentsApp';

ReactDOM.render(<ReactExperimentsApp />, document.getElementById('reactExperiments'));

if (module.hot) {
  module.hot.accept();
}
