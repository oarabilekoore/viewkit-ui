# CHANGELOG

# 0.1.76 (Patch)

- baseline.css was not imported into the final module package.

# 0.1.75

There are a few changes to the Layout API, in short `Layout` is deprecated.
- updated baseline stylesheet definitions
- removed `StyleSheet.Create` class for a css-in-js solution.
- added new methods to the `LayoutConstructor`, also exported it too.
- lowercased ShowIF and State

# 0.1.74

updated to 0.1.74, here are all the changes
- the default styles for layout managment now don't need to be added manually now.

# 0.1.73

updated to 0.1.73, here are all the changes
- added CustomElement function for custom html elements
- added new paramter to application config (allowzoom)
- added onScroll method to Application class.
- exported all types
- layouts dont take all space available
- updated docs

# 0.1.70

updated to 0.1.7, here are all the changes
- scrollbarvisibility to app config
- changed PageRouter to just Router
- removed useless defaults and exports
- changed useState to State
- changed showIF to ShowIF
- new method class StyleSheet, usage similar to react native's StyleSheet