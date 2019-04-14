import React from 'react';
// import ReactColorSquare from 'react-color-square';
// import ReactSum from '@lundiak/react-sum';
import { Count, Sum } from '@lundiak/react-sum';
// import ReactSum from 'reactSum'; // Using Webpack Alias DIRECTLY to node_modules

import 'css/app.less';

const App = (/* props */) => (
    <React.Fragment>
        {/* <ReactColorSquare /> */}
        {/* <ReactSum.Sum /> */}
        {/* <ReactSum.Count /> */}
        <Sum a={3} b={3} />
        <Count list={[1, 2, 3]} />
    </React.Fragment>
);

export default App;