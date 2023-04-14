import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFontAwesome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'
import React, { ReactElement, ReactNode } from "react"
import { Col, Container, Form, Row , Dropdown, DropdownButton} from "react-bootstrap";
import Table, { TableProps } from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import mySortFunction from "../helpers/sorting";

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
  toggleSearchCheckboxes: any
};


class ArrToTable extends React.Component<Props, State> {
  public static defaultProps ={
      limit: 50
  };
  maxLimitPages: number =  1



  constructor(props: Props) {
    super(props);
    this.state = { applySortingToggle: undefined, setapplySortingIconName: undefined, selectedTableHeaderIndex: undefined, searchValue: undefined, paginationIndex: 1, toggleSearchCheckboxes: "all" };

    this.searchPhraseHandler = this.searchPhraseHandler.bind(this);
    this.applySorting = this.applySorting.bind(this);
    this.handleTableHeaderClick = this.handleTableHeaderClick.bind(this);
    this.handleSearchButton =  this.handleSearchButton.bind(this)
  }

  filterHandler(){
    /* calls the filter, sorting && limit function
      each step modifies data
      see functions for detailed descriptions
      filterHandler() is called to update data in render()
    */
    let { selectedTableHeaderIndex, searchValue, paginationIndex} = this.state
    let data = this.props.data
    let filterMode = this.state.toggleSearchCheckboxes

    if(searchValue != undefined && data){
      // data = this.applySearchFilter(data, searchValue);
      if(filterMode == "all"){
        data.filter(this.searchAllFilter)
      }
      if(filterMode != "all"){
        data.filter(this.searchKeyFilter)
      }
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

  searchAllFilter(dataArray: Array<any>){
    let searchValue:string|undefined = this.state.searchValue;
    if(searchValue != undefined){
      if(dataArray.includes(searchValue)){
        return true
      }
      else return false
  
    }
  }
  searchKeyFilter(dataArray: Array<any>){
    let searchValue =  this.state.searchValue;
    let columnKey = this.state.toggleSearchCheckboxes;
    let keys = Object.keys(dataArray)
    keys.forEach(key =>{
      if(searchValue != undefined && key == columnKey && dataArray.includes(searchValue)){
        return true
      }
      else return false
    })

  }

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
    };

    let searchDirection
    switch(this.state.applySortingToggle != undefined){
      case this.state.applySortingToggle == true:
        searchDirection = "asc"
        break
      case this.state.applySortingToggle == false:
        searchDirection = "desc"
        break
    }

    if(data && searchDirection){
      data = mySortFunction(data, keys[index], searchDirection);
    }
    return data 
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

    // resets pagination index to page 1 if the data changes
    if(paginationIndex != 1 && paginationIndex>pages){
      this.setState({paginationIndex: 1})
      return data
    };

    this.maxLimitPages = pages;

    if(pages){
      data = data.slice((paginationIndex-1)*limiter, (paginationIndex)*limiter)
    };

    return data

  }
  clickHandlerPagination(event:any){
    let {paginationIndex} =  this.state
    if(event){
      this.setState({paginationIndex: Number(event.target.innerHTML)})
    }
  }

  handleSearchButton(e:any, key?: any){
    let {toggleSearchCheckboxes} =  this.state
    let checkboxSelected = this.state.toggleSearchCheckboxes === key ? this.setState({toggleSearchCheckboxes: "all"}) : this.setState({toggleSearchCheckboxes: key})
  }

  render() {
    let data  = this.props.data
    let paginationIndex = this.state.paginationIndex
    let renderCheckbox =  this.state.toggleSearchCheckboxes

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
    if(paginationIndex){
      active = paginationIndex
    };
 
    for(let number=1; number <= this.maxLimitPages; number++){
      items.push(
        <Pagination.Item key={number} active={number=== active} onClick={e => {this.clickHandlerPagination(e)}}>
          {number}
        </Pagination.Item>
      );
    };

    let dropdownItems: Array<ReactNode> = [];
    if(data){
      let keys = Object.keys(this.props.data[0])
      keys.map((key,index) => {
        dropdownItems.push(
          <>
          <Container>
            <Row key={index +"row"} onClick={e => {this.handleSearchButton(e, key)}}>
              <Col sm={{span: 8}} key={index +"col1"}>
                <Dropdown.Item as="button" key={index + "item"} >{key}</Dropdown.Item> 
              </Col>
              <Col key={index + "col2"}>
                <input type="checkbox" name={key} value={key} key={index +"input"} checked={renderCheckbox == key || renderCheckbox == "all" ? true : false} readOnly ></input>
              </Col>
            </Row>
          </Container>
        </>
        )
      });
    };

    return (
      <>
        <Container fluid="true">
          <Row>
            <Col >
              <Form.Group>
                <>
                  <Form.Control placeholder="Search" onChange={e => { this.searchPhraseHandler(e) }} size={this.props.size as any} >
                  </Form.Control>
                </>
              </Form.Group>
            </Col>

            <Col xs="2">
              <Dropdown >
                <DropdownButton id="dropdown-item-button" title="Search filters">
                  <p> Search on Key / Search All</p>
                  {dropdownItems}
                </DropdownButton>
              </Dropdown>
            </Col>
            <Col xs="1">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Col>
          </Row>
        </Container>
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
        <Pagination>
          {items}
        </Pagination>
      </>
    );
  };
};

export default ArrToTable;