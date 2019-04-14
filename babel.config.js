// This file changed from .babelrc, which was the cause of non-working import from node_modules of App.jsx file
module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-export-default-from"
    ]
}