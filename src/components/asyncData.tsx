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
        let url2= `https://kronos.elusive-dev.com/api/Leaderboard/500/0`
        fetchUrl(url2).then((data) => {(console.log(data),  this.setState({ data: data.entries }));})
    };

    render(): React.ReactNode {
        return(
        <>
            {this.state.data && <ArrToTable striped hover data={this.state.data} />}
        </>
        );
    } ;
};


export default AsyncData