import React from "react";
import axios from "axios";
import Search from "./Search";
import {Link} from "react-router-dom";

export default class Home extends React.Component{
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
        console.log(this.state.details)
        return(
            <React.Fragment>
                <div>
                <p style = {{height:"30px",width:"250px",marginLeft:"900px",color:"green"}}>Designed By:  Meena</p>
                    <Search/>
                    <h2 style = {{color:"green",backgroundColor:"white",height:"40px"}}>You will Get Movie Information Here</h2>
                </div>
                <div >
                {this.state.details.map((e) =>{
                    return(
                        <div style = {{marginBottom:"20px"}}>
                            <h3 style = {{color:"red"}}>Movie Title:{e[1]}</h3>
                            <img src = {`http://127.0.0.1:5000/${e[2]}`}
                                style = {{width:"150px",height:"150px"}} alt = "No image"
                            />
                             <Link to = {`/updatemovie/${e[0]}`}>
                               <button style = {{height:"20px",width:"100px", backgroundColor:"skyblue"}}>Update</button>
                           </Link>
                           <Link to = {`/deletemovie/${e[0]}`}>
                               <button style = {{height:"20px",width:"100px", backgroundColor:"skyblue"}}>Delete</button>
                           </Link>
                        </div>
                        )
                })}
                </div>
            </React.Fragment>
        )
    }
}