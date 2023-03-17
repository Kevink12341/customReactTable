import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { faFontAwesome, faMagnifyingGlass, faSortAsc } from "@fortawesome/free-solid-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'
import React, { ReactElement, ReactNode } from "react"
import { Form, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

library.add(fas, faFontAwesome)

interface Props {
    data: Array<any>;
    any?: any;
};

interface State{
  data: Array<any>;
  header?: any;
  searchArray?: Array<any>;
};

class ArrToTable extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { data: []};

        this.fetchData = this.fetchData.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }
    
    fetchData(){
        let data = this.props.data;
        this.setState({data: data});
    };

    componentDidMount(): void {
      this.fetchData();
    };

    searchHandler(event:any){
      let {searchArray} = this.state;
      let searchValueUnformatted = event.target.value != undefined ? event.target.value : "";
      
      let data = this.state.data;
      let filteredDataArray: Array<any> = [];
      if(data){
        data.forEach((row, index) => {
          if(row){
            for(const key in row){
              if(row[key].toString().toLowerCase().includes(searchValueUnformatted.toString().toLowerCase())){
                if(data)
                filteredDataArray.push(data[index]);
              };
            };
          };
        });
        let removeDuplicates= [...new Set(filteredDataArray)];
        this.setState({searchArray: removeDuplicates});
      };
    };

    sorting(event:any, index:number){
      console.log(event, index)
      let data = this.state.data
      let keys: Array<any> = []
      if(data){
        keys = Object.keys(data[0])
      }

      let sortAsc = () => {
        data.sort((a,b)=>{
          // console.log(a,b, "logme")
          const keyA = a[keys[index]].toString().toLowerCase();
          const keyB = b[keys[index]].toString().toLowerCase();
          if(keyA < keyB){
            return -1;
          }
          if(keyA > keyB){
            return 1;
          }
          return 0
        })

      };
      let sortDesc = () => {

      };
    sortAsc()
    }

    render() {

      let {data, searchArray} = this.state;
      if(searchArray){
        data =  searchArray;
      };

      let rows:Array<ReactNode> = [];
      if(data){
        data.forEach((row,index) =>{
          let columns:Array<ReactElement> = [];
          let keys = Object.keys(row);
          keys.forEach((item,index) => {
            columns.push(
              <td key={index}>
                {row[item]}
              </td>
            )
          });
          if(columns){
            rows.push(
              <tr key={index}>
                {columns.map(col =>{
                  return col
                })}
              </tr>
              )
          };
        });
      };
     
      return ( 
      <>
        <Form.Group>
          <>
          <Form.Control placeholder="Search" onChange={e => {this.searchHandler(e)}}>
          </Form.Control>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          </>
        </Form.Group>

        <Table striped bordered hover>
          <thead>
            <tr>           
              {this.state.data.length > 0 && Object.keys(this.state.data[0]).map((header, index) =>(
                <th key={index} > {header} &nbsp; <FontAwesomeIcon className="float-end" icon="sort" onClick={e => {this.sorting(e,index)}} /></th>
      
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