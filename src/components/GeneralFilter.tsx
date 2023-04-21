import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, ReactNode } from "react"
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas, faFontAwesome)

interface Props {
    data: Array<any>;
}

interface rowData {
    rowIndex: number;
    buttonValue: string;
    buttonText: string;
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

    handleButtonChanges(event:any, indexedRow: number, key:string, data:Array<rowData>){
        
        console.log(data)
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
                    buttonText: ""
                };
                data.push(setupData)
            }
        } else if(this.state.buttonData.length < this.state.containers){
            data = this.state.buttonData;
            let setupData = {
                rowIndex: this.state.buttonData.length,
                buttonValue: "default",
                buttonText: ""
            };
            data.push(setupData)
        }
        else{
            data = this.state.buttonData
        }

        return data
    }

    removeAndShiftButtonDataIndex(index:number){
        let {buttonData} = this.state
        buttonData.splice(index, 1)
        for(let x = index; x < buttonData.length; x++){
            buttonData[x].rowIndex = buttonData[x].rowIndex -1
       }
       return buttonData
    }

    render(): React.ReactNode {
        let data = this.props.data;
        let { containers, buttonData } = this.state

        let renderContainers: Array<ReactNode> = [];

        buttonData = this.initiateFilterData();

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
                            <input>
                            </input>
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
             {renderContainers}
            </>
        )
    }
}

export default Filter