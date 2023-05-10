import React from "react";
import { fetchUrl } from "../axiosRequests";
import ArrToTable from "./ArrToTable";
import { TableProps } from "react-bootstrap";

interface State{
    data: Array<any>
};
class AsyncData extends React.Component<{},State>{
    constructor(props: State){
        super(props);
        this.state = { data: [] }

    };

    componentDidMount() {
        let url = "https://odata4.cbs.nl/CBS/83878NED/Observations";
        fetchUrl(url).then((data) => {(console.log(data),  this.setState({ data: data.value }));})
    };

    render(): React.ReactNode {
        return(
        <>
            {this.state.data && <ArrToTable data={this.state.data} />}
        </>
        );
    } ;
};


export default AsyncData