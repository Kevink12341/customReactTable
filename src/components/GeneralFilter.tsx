import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, ReactNode } from "react"
import { Button, Col, Container, Dropdown, Row, Accordion, InputGroup, Form, ButtonGroup } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import {possibleFilterMethods} from "../helpers/filtersMethods";

library.add(fas, faFontAwesome)

interface Props {
    data: Array<any>;
    datamodel?: {[key:string]:any}; 
}

interface rowData {
    rowIndex: number;
    buttonValue: string;
    buttonText: string;
    filterValue: string;
    filterMode: string;
}

interface State {
    containers: number;
    buttonData: Array<rowData> ;
}

class Filter extends React.Component <Props,State> {

    constructor(props: Props){
        super(props);
        this.state = {containers: 1, buttonData: []}

    };

    handleButtonChanges(event:any, indexedRow: number, key: string , data:Array<rowData>){

        if(event){
            data[indexedRow].buttonValue =  key
        };

        this.setState({buttonData: data})

    };

    initiateFilterData(){
        let { containers } = this.state
        let data = []
        if(this.state.buttonData.length == 0){
            for(let i = 0; i<containers ; i++){
                let setupData = {
                    rowIndex: i,
                    buttonValue: "default",
                    buttonText: "",
                    filterValue: "",
                    filterMode: "",
                };
                data.push(setupData)
            }
        } else if(this.state.buttonData.length < this.state.containers){
            data = this.state.buttonData;
            let setupData = {
                rowIndex: this.state.buttonData.length,
                buttonValue: "default",
                buttonText: "",
                filterValue: "",
                filterMode: "",
            };
            data.push(setupData)
        }
        else{
            data = this.state.buttonData
        }

        return data
    };

    removeAndShiftButtonDataIndex(index:number){
        let {buttonData} = this.state;
        buttonData.splice(index, 1);
        for(let x = index; x < buttonData.length; x++){
            buttonData[x].rowIndex = buttonData[x].rowIndex -1
       };
       return buttonData
    };

    handleTextInput(event:any, index: number, data: Array<rowData>){
        if(event){
            data[index].buttonText = event.target.value
        };
        this.setState({buttonData: data}) 
    };

    handleClick(e: any, data: Array<any>){
        data.forEach(row => {
            // console.log(JSON.parse(JSON.stringify(row)))
        })
    };

    render(): React.ReactNode {
        let data = this.props.data;
        let { containers, buttonData } = this.state

        let renderContainers: Array<ReactNode> = [];

        buttonData = this.initiateFilterData();

        console.log(buttonData)

        for(let index = 0; index < containers; index++){

            let keys = Object.keys(data[0]);
            let renderKeys: Array<ReactNode> = [];
            
            keys.forEach((key) => {
                renderKeys.push(<Dropdown.Item key={key + index} onClick={(e) => {this.handleButtonChanges(e, index, key, buttonData)}}> {key} </Dropdown.Item>)
            });

            let fontAwesomeIcon
            if(index == containers-1){
                fontAwesomeIcon = <FontAwesomeIcon icon="plus" onClick={() => {this.setState({containers: containers+1})}}/>
            }else{
                fontAwesomeIcon = <FontAwesomeIcon icon="minus" onClick={(event:any) => {
                    if(event){
                        this.setState({containers: containers -1})
                        renderContainers = renderContainers.splice(index, 1)
                        this.removeAndShiftButtonDataIndex(index)
                    }
                }}/>
            }
            renderContainers.push(
                <Container key={index}>
                    <Row>
                        <Col>
                            <DropdownButton id="dropdown-basic-button" title={buttonData[index].rowIndex == index ? buttonData[index].buttonValue : "something"}>
                                {renderKeys}
                            </DropdownButton>
                        </Col>
                        <Col>
                            <InputGroup className="mb-4">
                                <Form.Control as="textarea" aria-label="With textarea" onChange={e => this.handleTextInput(e, index, buttonData)}/>
                            </InputGroup>
                        </Col>
                        <Col>
                            {buttonData[index].buttonValue != "default" && this.props.datamodel &&
                                <DropdownButton id="dropdown-basic-button" title={"filter options"}> 
                                    {possibleFilterMethods(this.props.datamodel[buttonData[index].buttonValue]).map((method, index2) => 
                                            <Dropdown.Item key={index2}> {method}</Dropdown.Item>
                                    )}
                                </DropdownButton>
                            }
                        </Col>
                        <Col>
                             {fontAwesomeIcon}
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
                        <Button variant="primary" size="lg" onClick={e => this.handleClick(e, data)}>
                            Filter dataset
                        </Button>
                    </AccordionBody>
                </Accordion.Item>
            </Accordion>

            </>
        )
    }
}

export default Filter