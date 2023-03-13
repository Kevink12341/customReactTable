import React, { ReactElement, ReactNode } from "react"
import Table from 'react-bootstrap/Table';

interface Props {
    data?: Array<any>;
    any?: any;
};

interface State{
  data?: Array<any>;
  header?: any;

};

class ArrToTable extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {}

        this.fetchData = this.fetchData.bind(this)
    }
    
    fetchData(){
        let data = this.props.data
        this.setState({data: data})
    }
    componentDidMount(): void {
      this.fetchData()
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
      );
    };
};

export default ArrToTable;