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
  searchArray?: Array<any>;
  sortingToggle: boolean | undefined;
  sortingNameToggle: "sort-up" | "sort-down" | undefined
  selectedTH: number | undefined;
};

class ArrToTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { data: [], sortingToggle: undefined, sortingNameToggle: undefined, selectedTH: undefined };

    this.fetchData = this.fetchData.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.sorting = this.sorting.bind(this);
    this.handleCLick = this.handleCLick.bind(this);
  }

  fetchData() {
    let data = this.props.data;
    this.setState({ data: data });
  };

  componentDidMount(): void {
    this.fetchData();
  };
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (prevState.searchArray != this.state.searchArray || prevState.sortingToggle != this.state.sortingToggle) {
      if (this.state.selectedTH != undefined) {
        this.sorting(this.state.selectedTH, this.state.data)
      }
    }
  }

  searchHandler(event: any) {
    let { searchArray } = this.state;
    let searchValueUnformatted = event.target.value != undefined ? event.target.value : "";

    let data = this.props.data;
    let filteredDataArray: Array<any> = [];
    if (data) {
      data.forEach((row, index) => {
        if (row) {
          for (const key in row) {
            if (row[key]!= undefined && row[key].toString().toLowerCase().includes(searchValueUnformatted.toString().toLowerCase())) {
              if (data)
                filteredDataArray.push(data[index]);
            };
          };
        };
      });
      let removeDuplicates = [...new Set(filteredDataArray)];
      this.setState({ data: removeDuplicates });
    };
  };

  sorting(index: number, dataParam: Array<any>) {

    let data = dataParam
    let keys: Array<any> = []
    if (data) {
      keys = Object.keys(data[0])
    }

    let sortAsc = () => {
      data.sort((a, b) => {
        const keyA = a[keys[index]] != undefined ? a[keys[index]].toString().toLowerCase() : "";
        const keyB = b[keys[index]] != undefined ? b[keys[index]].toString().toLowerCase() : "";
        return keyA < keyB ? -1 : 1
      })
      this.setState({ data: data })
    };
    let sortDesc = () => {
      data.sort((a, b) => {
        const keyA = a[keys[index]] != undefined ? a[keys[index]].toString().toLowerCase() : "";
        const keyB = b[keys[index]] != undefined ? b[keys[index]].toString().toLowerCase() : "";
        return keyA > keyB ? -1 : 1
      })
      this.setState({ data: data })
    };

    switch (this.state.sortingToggle) {
      case true:
        return sortAsc();
      case false:
        return sortDesc();
      case undefined:
        return
    }
  }
  handleCLick(e: any, index: number) {
    /*  Fetches the index of the tableheaders.
        Sets the name of the Tableheader if it's selected to sort-up || sort-down
        Sets state for the sorting function under selectedTH 
    */
    let { sortingNameToggle, selectedTH, sortingToggle } = this.state
    this.setState({ sortingToggle: true })
    if (sortingToggle == false || undefined) {
      this.setState({ sortingNameToggle: "sort-up", selectedTH: index })
    }
    else {
      this.setState({ sortingNameToggle: "sort-down", selectedTH: index, sortingToggle: !this.state.sortingToggle })
    }
  }

  render() {

    let { data, searchArray } = this.state;
    if (searchArray) {
      data = searchArray;
    };

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

    let tableHeaders: Array<ReactNode> = [];
    if (this.props.data) {
      let keys = Object.keys(this.props.data[0])
      if (keys) {
        keys.map((header, index: number) => (

          tableHeaders.push(
            <th key={"TH" + index} > {header} &nbsp; <FontAwesomeIcon className="float-end" key={index} icon={this.state.sortingNameToggle && this.state.selectedTH == index ? this.state.sortingNameToggle : "sort"} onClick={e => this.handleCLick(e, index)} /> </th>
          )
        ))
      }
    }
    return (
      <>
        <Form.Group>
          <>
            <Form.Control placeholder="Search" onChange={e => { this.searchHandler(e) }} size={this.props.size as any} >
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