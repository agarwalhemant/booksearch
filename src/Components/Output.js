import { React } from "react";

export default function Output(props) {
    const loading = props.loading;
    const error = props.error;
    const listItems = props.listItems;

    if (loading) {
        return (<div>Please wait a moment!</div>);
    }
    else if (error) {
        return (<div>{`There is a problem fetching the post data - ${error}`}</div>);
    }
    else {
        return listItems;
    }
    

}