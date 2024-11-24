# droidscript native for web

This is an experimental framework the main purpose is to create an ESM like version of DroidScript, and reduce, separate app.* Functions into individual functions.

Whilst giving this framework its own style and spin to things, I will be getting inspiration from DroidScript and React-Native.

The project needs to be able to draw DOM Objects and draw Android Ui just as how trully native DroidScript Does.

## Why not use DroidScript Hybrid or Native Ds ?

I contemplated this however here are the constraints of Ds, hybrid uses react 16 under the hood and uses no ESM by default, this means we loose on features like tree-shaking and an output of smaller file bundles.

Native Ds is also suspect to these constraints, so there is a need of a new spin to things, and a framework that will still work well with native Ds.
