Misleading Error Message WARNING: All children of a 'grid-row' should be 'grid-item' [design.grid] 
=========================================================================================================
Today I am hit by a message "WARNING: All children of a 'grid-row' should be 'grid-item'" from the sphinx-design extension when building a Sphinx documentation. The error line points to a grid whose only members are grid items.

After some digging, it appears that when a space is missing between .. grid-item-card:: and the card name, then the card won't be recognized as a card, and generates this message. 

The solution is simple, search for grid-item-card:: and add the missing spaces.
