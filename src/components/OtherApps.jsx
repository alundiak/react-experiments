import React from 'react';

// 2 examples of components, which built for ES Module import only. Can't be used in browser.
import ReactColorSquare from 'react-color-square';
import { SketchPicker } from 'react-color';

// Example of component, which is old, and cause an error "TypeError: React.createClass is not a function"
// import MathML from 'react-math';

const OtherApps = (/* props */) => (
    <div className="other-components">
        <ReactColorSquare />
        <SketchPicker />
        {/* <MathML text="e^(i pi)=-1" /> */}
    </div>
);

export default OtherApps;