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
interface State {
    containers: number;
    renderContainers: Array<ReactNode>;
}

class Filter extends React.Component <Props,State> {

    constructor(props: Props){
        super(props);
        this.state = {containers: 1, renderContainers: []}

    };

    // componentDidMount(): void {
    //     this.addContainer()
    // }

    handleDropdownClick(event:any){
        console.log(event)
    };

    addContainer(){
        let data = this.props.data;
        let {containers, renderContainers} = this.state

        let keys = Object.keys(data[0]);
        let renderKeys: Array<ReactNode> = [];
        keys.forEach((key,index) => {
            renderKeys.push(<Dropdown.Item key={index} > {key} </Dropdown.Item>)
        });

        for(let index = 0; index < containers; index++){
            let fontAwesomeIcon
            if(index == containers-1){
                fontAwesomeIcon = <FontAwesomeIcon icon="plus" onClick={() => {this.setState({containers: containers+1})}}/>
            }else{
                fontAwesomeIcon = <FontAwesomeIcon icon="minus" onClick={() => {this.setState({renderContainers: renderContainers.splice(index, index+1)})}}/>
            }
            renderContainers.push(
                <Container key={index}>
                    <Row>
                        <Col>
                            <DropdownButton id="dropdown-basic-button" title={"Dropdown button"} onClick={this.handleDropdownClick}>
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
        };
        return renderContainers
    };

    render(): React.ReactNode {
        // let containers = this.state.renderContainers

        // containers = this.addContainer()

        // console.log(containers)
        return(
            <>
             {/* {containers} */}
            </>
        )
    }
}

export default Filter