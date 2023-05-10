# React general component for Array<Object> to Table

Currently this project will take any Array<Object> length and automatically generate a table.

Implementation only works by copying code. The goal is to make this a future open source NPM package. 

To run the example:
git pull repository
``` NPM install ``` in the local directory
``` NPM start ```to run the React on port 3000


## React table
- [x] Automatically generates a table
- [x] Filter on single key and per entire row
- [x] Sort up/down
- [x] Automatic pagination and reset after filtering
- [ ] Custom React Bootstrap styling
- [ ] Mobile version?

## Filter
Needs refactoring
- [x] Multi key filtering
- [x] Filter methods
- [ ] User input validation
- [ ] Expand filter methods
- [ ] Styling

## Client side input validaiton in case of no datamodel
- [ ] Assign types based on key:value test
- [ ] Pass data to child components

## d3js implementation for charts
- [ ] Graphs & chart implementation