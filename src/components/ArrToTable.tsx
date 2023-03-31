import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFontAwesome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'
import React, { ReactElement, ReactNode } from "react"
import { Form } from "react-bootstrap";
import Table, { TableProps } from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem'
import { isThisTypeNode } from "typescript";

library.add(fas, faFontAwesome)

interface Props extends TableProps {
  data: Array<any>;
  any?: any;
  limit: number;
};

interface State {
  header?: any;
  searchValue: string | undefined;
  searchArray?: Array<any>;
  applySortingToggle: boolean | undefined;
  setapplySortingIconName: "sort-up" | "sort-down" | undefined
  selectedTableHeaderIndex: number | undefined;
  paginationIndex: number;
};

class ArrToTable extends React.Component<Props, State> {
  public static defaultProps ={
      limit: 50
  }

  constructor(props: Props) {
    super(props);
    this.state = { applySortingToggle: undefined, setapplySortingIconName: undefined, selectedTableHeaderIndex: undefined, searchValue: undefined, paginationIndex: 1 };

    this.searchPhraseHandler = this.searchPhraseHandler.bind(this);
    this.applySorting = this.applySorting.bind(this);
    this.handleTableHeaderClick = this.handleTableHeaderClick.bind(this);
  }

  filterHandler(){
    /* calls the filter, sorting && limit function
      each step modifies data
      see functions for detailed descriptions
      filterHandler() is called to update data in render()
    */
    let { selectedTableHeaderIndex, searchValue, paginationIndex} = this.state
    let data = this.props.data

    if(searchValue != undefined && data){
      data = this.applySearchFilter(data, searchValue);
    };

    if(data.length > 0  && selectedTableHeaderIndex != undefined){
      this.applySorting(selectedTableHeaderIndex, data)
    };

    if(paginationIndex){
      data = this.pagination(data, paginationIndex, this.props.limit)
    }

    return data
  }

  searchPhraseHandler(event: any) {
    // input field handler for search phrases
    // no formatting/validity check yet
    let searchValue =  this.state
    let searchValueUnformatted = event.target.value != undefined ? event.target.value : undefined;

    this.setState({searchValue: searchValueUnformatted});
  };

  applySearchFilter(data: Array<any>, searchValue: string ){
    /* search filter over any value in any column/row
      to do:
      - filter over key phrases
      - filter over multiple keys
    */
    let filteredDataArray: Array<any> = [];
    if (data) {
      data.forEach((row, index) => {
        if (row) {
          for (const key in row) {
            if (row[key]!= undefined && row[key].toString().toLowerCase().includes(searchValue.toString().toLowerCase())) {
              if (data)
                filteredDataArray.push(data[index]);
            };
          };
        };
      });
      let removeDuplicates = [...new Set(filteredDataArray)];
      data = removeDuplicates
    };
    return data
  };

  applySorting(index: number, dataParam: Array<any>) {
    /* basic bubble sorting
      receives the index (key) which has been sorted
      will use sort Ascending or Descending based on which state(Boolean) is used
      applies after filtering.
    */
    let data = dataParam;
    let keys: Array<any> = [];
    if (data) {
      keys = Object.keys(data[0]);
    }

    let sortAsc = () => {
      data.sort((a, b) => {
        const keyA:any = a[keys[index]] != undefined ? a[keys[index]].toString().toLowerCase() : "";
        const keyB:any = b[keys[index]] != undefined ? b[keys[index]].toString().toLowerCase() : "";
        return keyA < keyB ? -1 : 1
      })
      return data;
    };
    let sortDesc = () => {
      data.sort((a, b) => {
        const keyA:any = a[keys[index]] != undefined ? a[keys[index]].toString().toLowerCase() : "";
        const keyB:any = b[keys[index]] != undefined ? b[keys[index]].toString().toLowerCase() : "";
        return keyA > keyB ? -1 : 1
      });
      return data;
    };

    switch (this.state.applySortingToggle) {
      case true:
        return sortAsc();
      case false:
        return sortDesc();
      case undefined:
        return
    };
  };

  handleTableHeaderClick(e: any, index: number) {
    /*  Fetches the index of the selected tableheader.
        Sets the name of the Tableheader if it's selected to sort-up || sort-down
        Sets state for the applySorting function under selectedTableHeaderIndex 
    */
    let { setapplySortingIconName, selectedTableHeaderIndex, applySortingToggle } = this.state;
    this.setState({ applySortingToggle: true });
    if (applySortingToggle == false || undefined) {
      this.setState({ setapplySortingIconName: "sort-up", selectedTableHeaderIndex: index });
    }
    else {
      this.setState({ setapplySortingIconName: "sort-down", selectedTableHeaderIndex: index, applySortingToggle: !this.state.applySortingToggle });
    };
  };

  pagination(data:any, paginationIndex: number,  limiter: number){
    /*  data = filtered && sorted data
        receives limiter from parent
        limiter = amount of rows per table page
        in the case of no limiter is defined in the parent it assumes a defaultLimiter
    */
    let pages:number = 1;

    let rowsPerPage = data.length / limiter <1 ? 1 : Math.ceil(data.length/limiter)
    if(rowsPerPage != 1 ){
      pages = rowsPerPage
    };

    if(pages){
      data = data.slice(paginationIndex*limiter-1, paginationIndex*limiter+1)
    };
    console.log(data, limiter,paginationIndex,  "log")

    return data

  }
  clickHandlerPagination(event:any){
    let {paginationIndex} =  this.state
    if(event){
      this.setState({paginationIndex: Number(event.target.innerHTML)})
    }
  }

  render() {
    let data  = this.props.data
    data = this.filterHandler();

    // custom loops for data rows/columns
    let rows: Array<ReactNode> = [];
    if (data && data.length > 0) {
      data.forEach((row, index) => {
        let columns: Array<ReactElement> = [];
        let keys = Object.keys(row);
        keys.forEach((item, index) => {
          columns.push(
            <td key={index}>
              {row[item]}
            </td>
          )
        });
        if (columns) {
          rows.push(
            <tr key={index}>
              {columns.map(col => {
                return col
              })}
            </tr>
          )
        };
      });
    };

    // custom loop for tableHeaders
    let tableHeaders: Array<ReactNode> = [];
    if (data && data.length > 0) {
      let keys = Object.keys(this.props.data[0]);
      if (keys) {
        keys.map((header, index: number) => (
          tableHeaders.push(
            <th key={"TH" + index} > {header} &nbsp; <FontAwesomeIcon className="float-end" key={index} icon={this.state.setapplySortingIconName && this.state.selectedTableHeaderIndex == index ? this.state.setapplySortingIconName : "sort"} onClick={e => this.handleTableHeaderClick(e, index)} /> </th>
          )
        ));
      };
    };

    let items: Array<ReactNode> = [];
    let active; 
    if(this.state.paginationIndex){
      active = this.state.paginationIndex
    };
    for(let number=1; number <= 5; number++){
      items.push(
        <Pagination.Item key={number} active={number=== active}>
          {number}
        </Pagination.Item>
      );
    };

    return (
      <>
        <Form.Group>
          <>
            <Form.Control placeholder="Search" onChange={e => { this.searchPhraseHandler(e) }} size={this.props.size as any} >
            </Form.Control>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </>
        </Form.Group>

        <Table {...this.props}>
          <thead>
            <tr>
              {tableHeaders}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
        <Pagination onClick={e => {this.clickHandlerPagination(e)}}>
          {items}
        </Pagination>
      </>
    );
  };
};

export default ArrToTable;