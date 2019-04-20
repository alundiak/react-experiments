import React from 'react';
// import ReactColorSquare from 'react-color-square';

//
// If we want to rely on one imported object (App.jsx)
//
import ReactSum from '@lundiak/react-sum';

//
// Using { } for custom import from the same App.jsx will still import all less file imports.
//
import { Sum } from '@lundiak/react-sum';
import { Count } from '@lundiak/react-sum';

//
// If App.jsx exports Sum.jsx and Count.jsx with their less files,
// then even “import { Sum } from App.jsx will import all CSS code from all less files.
// Solution - need to import directly.
//
// import Sum from '@lundiak/react-sum/src/components/Sum';
// import Count from '@lundiak/react-sum/src/components/Count';
import CountWithAlias from '@lundiak/react-sum/src/components/CountWithAlias'; // works
// import CountWithAlias from '@lundiak/react-sum/dist/CountWithAlias'; // doesn't work

//
// Alternative approach, in case of webpack aliasing DIRECTLY to node_modules.
//
// import WebpackReactSum from 'reactMath/Sum';
// import WebpackReactCount from 'reactMath/Count';

//
// DIST
//
import DistCount from '@lundiak/react-sum/dist/Count'; // works (after change devBuild with optimization to prodBuild w o.)

// import DistCount from '@lundiak/react-sum/dist/CountWithAlias';
// doesn't work after LESS injected as dep. inside of entry
// => "react-dom.development.js:55 Uncaught Invariant Violation: Element type is invalid"
// still doesn't work.

import 'myCss/react-experiments-app.less';

console.log(DistCount); // => ƒ (e) { var t = e.list; return o.a.createElement("div",

const ReactExperimentsApp = (/* props */) => (
    <React.Fragment>
        {/* <ReactColorSquare /> */}
        <ReactSum.Sum />
        <ReactSum.Count />

        <Sum a={3} b={3} />
        <Count list={[1, 2, 3]} />

        <DistCount list={[1, 2, 3, 4]} />

        <CountWithAlias list={[1, 2, 3, 4, 5]} />
        {/* <WebpackReactSum /> */}
        {/* <WebpackReactCount /> */}
    </React.Fragment>
);

export default ReactExperimentsApp;