import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { ReactElement, ReactNode } from "react"
import { Form } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

interface Props {
    data?: Array<any>;
    any?: any;
};

interface State{
  data?: Array<any>;
  header?: any;
  searchValue?: any;
};

class ArrToTable extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {}

        this.fetchData = this.fetchData.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }
    
    fetchData(){
        let data = this.props.data
        this.setState({data: data})
    }
    componentDidMount(): void {
      this.fetchData()
    }

    searchHandler(event:any){
      let { searchValue } = this.state
      let searchValueUnformatted = event.target.value != undefined ? event.target.value : ""
    
      this.setState({searchValue: searchValueUnformatted})
    }

    inferDataModel(){
      if(this.state.data){
        let data = this.state.data
        console.log(Object.keys(data[0]))
      }
    }

    render() {
      this.inferDataModel();

      let rows:Array<ReactNode> = [];
      if(this.state.data){
        this.state.data.forEach((row,index) =>{
          let columns:Array<ReactElement> = []
          let keys = Object.keys(row)
          keys.forEach((item,index) => {
            columns.push(
              <td key={index}>
                {row[item]}
              </td>
            )
          })
          if(columns){
            rows.push(
              <tr key={index}>
                {columns.map(col =>{
                  return col
                })}
              </tr>
              )
          }
        })
      }
     
      return ( 
      <>
        <Form.Group>
          <Form.Control placeholder="Search" onChange={e => {this.searchHandler(e)}}/>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Form.Group>

        <Table striped bordered hover>
          <thead>
            <tr>           
              {this.state.data && Object.keys(this.state.data[0]).map((header, index) =>(
                <th key={index} > {header} </th>
              ))}
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