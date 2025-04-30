Misleading Error Message WARNING: All children of a 'grid-row' should be 'grid-item' [design.grid]
=========================================================================================================
Today I am hit by a message "WARNING: All children of a 'grid-row' should be 'grid-item' [design.grid] " from the sphinx-design extension when building a Sphinx documentation. The error line points to a grid that works perfect fine in another file. 

After some digging, it appears that when the next paragraph is indented as quoted text, no matter how many blanks are in between the grid still think it as its children. 

The solution is simple, add something that would break the end of grid search, such as section header or an anchor.
