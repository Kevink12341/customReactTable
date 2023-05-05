import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, ReactNode } from "react"
import { Button, Col, Container, Dropdown, Row, Accordion, InputGroup, Form, ButtonGroup } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import {possibleFilterMethods, useFilterMethod} from "../helpers/filtersMethods";
import ArrToTable from "./ArrToTable";

library.add(fas, faFontAwesome)

interface Props {
    data: Array<{[key:string]:any}>;
    datamodel?: {[key:string]:any}; 
}

interface rowData {
    rowIndex: number;
    keyValue: string;
    textboxValue: string;
    filterType: string;
    filterMethod: string;
}

interface State {
    containers: number;
    rowData: Array<rowData> ;
    data: Array<{[key:string]:any}>;
}

class Filter extends React.Component <Props,State> {

    constructor(props: Props){
        super(props);
        this.state = {containers: 1, rowData: [], data: this.props.data}

    };

    handleButtonChanges(event:any, indexedRow: number, key: string , data:Array<rowData>){

        if(event){
            data[indexedRow].keyValue =  key
        };

        this.setState({rowData: data})

    };

    initiateFilterData(){
        let { containers } = this.state
        let data = []
        if(this.state.rowData.length == 0){
            for(let i = 0; i<containers ; i++){
                let setupData = {
                    rowIndex: i,
                    keyValue: "default",
                    textboxValue: "",
                    filterType: "",
                    filterMethod: "",
                };
                data.push(setupData)
            }
        } else if(this.state.rowData.length < this.state.containers){
            data = this.state.rowData;
            let setupData = {
                rowIndex: this.state.rowData.length,
                keyValue: "default",
                textboxValue: "",
                filterType: "",
                filterMethod: "",
            };
            data.push(setupData)
        }
        else{
            data = this.state.rowData
        }

        return data
    };

    removeAndShiftrowDataIndex(index:number){
        let {rowData} = this.state;
        rowData.splice(index, 1);
        for(let x = index; x < rowData.length; x++){
            rowData[x].rowIndex = rowData[x].rowIndex -1
       };
       return rowData
    };

    handleTextInput(event:any, index: number, data: Array<rowData>){
        if(event){
            data[index].textboxValue = event.target.value
        };
        this.setState({rowData: data}) 
    };

    handleClick(e: any, data: Array<{[key:string]: any}>, rowData: Array<rowData>){
      if(e){
        rowData.forEach((row,index) => {
            if(rowData[index].filterMethod != "" && rowData[index].textboxValue != "" && rowData[index].keyValue != "default" && data){
                data  =  useFilterMethod(rowData[index].filterMethod, data, rowData[index].textboxValue, rowData[index].keyValue)
                console.log(data)
            };
        });
      };
      this.setState({data: data})
    };

    handleFilterMethods(e:any, index:number, data: Array<rowData>){
        console.log(e.target.text, index)
        if(e){
            data[index].filterMethod =  e.target.text.trim()
        }
        this.setState({rowData: data})
    }

    render(): React.ReactNode {
        let data = this.state.data;
        let { containers, rowData } = this.state

        let renderContainers: Array<ReactNode> = [];

        rowData = this.initiateFilterData();

        console.log(rowData)

        for(let index = 0; index < containers; index++){

            let keys = Object.keys(data[0]);
            let renderKeys: Array<ReactNode> = [];
            
            keys.forEach((key) => {
                renderKeys.push(<Dropdown.Item key={key + index} onClick={(e) => {this.handleButtonChanges(e, index, key, rowData)}}> {key} </Dropdown.Item>)
            });

            let fontAwesomeIcon
            if(index == containers-1){
                fontAwesomeIcon = <FontAwesomeIcon icon="plus" onClick={() => {this.setState({containers: containers+1})}}/>
            }else{
                fontAwesomeIcon = <FontAwesomeIcon icon="minus" onClick={(event:any) => {
                    if(event){
                        this.setState({containers: containers -1})
                        renderContainers = renderContainers.splice(index, 1)
                        this.removeAndShiftrowDataIndex(index)
                    }
                }}/>
            }
            renderContainers.push(
                <Container key={index}>
                    <Row>
                        <Col sm={1}>
                             {fontAwesomeIcon}
                        </Col>
                        <Col sm={2}>
                            <DropdownButton id="dropdown-basic-button" title={rowData[index].rowIndex == index ? rowData[index].keyValue : "something"}>
                                {renderKeys}
                            </DropdownButton>
                        </Col>
                        <Col sm={5}>
                            <InputGroup className="mb-4">
                                <Form.Control as="textarea" aria-label="With textarea" onChange={e => this.handleTextInput(e, index, rowData)}/>
                            </InputGroup>
                        </Col>
                        <Col sm={2}>
                            {rowData[index].keyValue != "default" && this.props.datamodel &&
                                <DropdownButton id="dropdown-basic-button" title={"filter options"}> 
                                    {possibleFilterMethods(this.props.datamodel[rowData[index].keyValue]).map((method, index2) => 
                                            <Dropdown.Item active={rowData[index].filterMethod == method ? true : false} key={index2} onClick={(e) => {this.handleFilterMethods(e, index, rowData)}}> {method}</Dropdown.Item>
                                    )}
                                </DropdownButton>
                            }
                        </Col>
                    </Row>
                </Container>
            )
        }
    
        return(
            <>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="1">
                    <AccordionHeader>
                        Filters
                    </AccordionHeader>
                    <AccordionBody>
                        {renderContainers}
                        <Button variant="primary" size="lg" onClick={e => this.handleClick(e, data, rowData)}>
                            Filter dataset
                        </Button>
                    </AccordionBody>
                </Accordion.Item>
            </Accordion>
            <ArrToTable striped hover data={data} variant="dark" size="sm" responsive="sm" />
            </>
        )
    }
}

export default Filter