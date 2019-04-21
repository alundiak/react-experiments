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
import { SumWithCssAlias } from '@lundiak/react-sum';

//
// From SRC
//

//
// If App.jsx exports Sum.jsx and Count.jsx with their less files,
// then even “import { Sum } from App.jsx will import all CSS code from all less files.
// Solution - need to import directly.
//
// import Sum from '@lundiak/react-sum/src/components/Sum';
// import SumWithCssAlias from '@lundiak/react-sum/src/components/SumWithCssAlias';

//
// From DIST
//

import DistSum from '@lundiak/react-sum/dist/Sum'; // works (after change devBuild with optimization to prodBuild w o.)
import DistSumWithCssAlias from '@lundiak/react-sum/dist/SumWithCssAlias';

// Approach with "css" alias doesn't work if LESS injected as dep. inside of entry and SumWithCssAlias.jsx file is npt exposed from App.jsx
// => "react-dom.development.js:55 Uncaught Invariant Violation: Element type is invalid"
// still doesn't work.

//
// Alternative approach, in case of webpack aliasing DIRECTLY to node_modules.
//
import WebpackSum from 'reactMath/Sum';
import WebpackSumWithCssAlias from 'reactMath/SumWithCssAlias';

import 'myCss/react-experiments-app.less';

// console.log(ReactSum); // {Sum: ƒ, SumWithCssAlias: ƒ}
// console.log(Sum); // ƒ Sum() {
// console.log(SumWithCssAlias); // ƒ SumWithCssAlias() {
// console.log(DistSum); // function ƒ t() {
// console.log(DistSumWithCssAlias); // function ƒ t() {
// console.log(WebpackSum); // function ƒ Sum() {
// console.log(WebpackSumWithCssAlias); // function ƒ SumWithCssAlias() {

const ReactExperimentsApp = (/* props */) => (
    <React.Fragment>
        {/* <ReactColorSquare /> */}
        <ReactSum.Sum />
        <ReactSum.SumWithCssAlias />

        <Sum a={3} b={3} />
        <SumWithCssAlias a={3} b={3} />

        <DistSum a={4} b={4} />
        <DistSumWithCssAlias a={5} b={5} />

        <WebpackSum a={6} b={6} />
        <WebpackSumWithCssAlias a={6} b={6} />
    </React.Fragment>
);

export default ReactExperimentsApp;