import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFontAwesome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'
import React, { ReactElement, ReactNode } from "react"
import { Form } from "react-bootstrap";
import Table, { TableProps } from 'react-bootstrap/Table';

library.add(fas, faFontAwesome)

interface Props extends TableProps {
  data: Array<any>;
  any?: any;
};

interface State {
  data: Array<any>;
  header?: any;
  searchValue: string | undefined;
  searchArray?: Array<any>;
  applySortingToggle: boolean | undefined;
  setapplySortingIconName: "sort-up" | "sort-down" | undefined
  selectedTableHeaderIndex: number | undefined;
};

class ArrToTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { data: [], applySortingToggle: undefined, setapplySortingIconName: undefined, selectedTableHeaderIndex: undefined, searchValue: undefined };

    this.dataHandler = this.dataHandler.bind(this);
    this.searchPhraseHandler = this.searchPhraseHandler.bind(this);
    this.applySorting = this.applySorting.bind(this);
    this.handleTableHeaderClick = this.handleTableHeaderClick.bind(this);
  }

  dataHandler() {
    let data = this.props.data;
    this.setState({ data: data });
  };

  componentDidMount(): void {
    this.dataHandler();
  };

  filterHandler(){
    let {data, selectedTableHeaderIndex, searchValue} = this.state
    if(searchValue != undefined && data){
      data = this.applySearchFilter(data, searchValue);
    };

    if(data && selectedTableHeaderIndex != undefined){
      this.applySorting(selectedTableHeaderIndex, data)
    };

    return data
  }

  searchPhraseHandler(event: any) {
    let searchValue =  this.state
    let searchValueUnformatted = event.target.value != undefined ? event.target.value : undefined;

    this.setState({searchValue: searchValueUnformatted});
  };

  applySearchFilter(data: Array<any>, searchValue: string ){
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
    let data = dataParam;
    let keys: Array<any> = [];
    if (data) {
      keys = Object.keys(data[0]);
    }

    let sortAsc = () => {
      data.sort((a, b) => {
        const keyA = a[keys[index]] != undefined ? a[keys[index]].toString().toLowerCase() : "";
        const keyB = b[keys[index]] != undefined ? b[keys[index]].toString().toLowerCase() : "";
        return keyA < keyB ? -1 : 1
      })
      return data;
    };
    let sortDesc = () => {
      data.sort((a, b) => {
        const keyA = a[keys[index]] != undefined ? a[keys[index]].toString().toLowerCase() : "";
        const keyB = b[keys[index]] != undefined ? b[keys[index]].toString().toLowerCase() : "";
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

  render() {
    let { data } = this.state;
    data = this.filterHandler()
    console.log(data, "in render")

    // custom loops for data rows/columns
    let rows: Array<ReactNode> = [];
    if (data) {
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
    if (this.props.data) {
      let keys = Object.keys(this.props.data[0]);
      if (keys) {
        keys.map((header, index: number) => (
          tableHeaders.push(
            <th key={"TH" + index} > {header} &nbsp; <FontAwesomeIcon className="float-end" key={index} icon={this.state.setapplySortingIconName && this.state.selectedTableHeaderIndex == index ? this.state.setapplySortingIconName : "sort"} onClick={e => this.handleTableHeaderClick(e, index)} /> </th>
          )
        ));
      };
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
      </>
    );
  };
};

export default ArrToTable;