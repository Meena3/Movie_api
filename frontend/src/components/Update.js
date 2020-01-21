import React from "react";
import axios from "axios";

export default class Update extends React.Component{
    constructor(props){
        super(props);
        this.state={
            details:[]
        }
    }
    componentDidMount = () =>{
        axios.get("http://127.0.0.1:5000/show_movies")
        .then(response =>{
            this.setState({
                details:response.data
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}