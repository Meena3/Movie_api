import React from "react";
import axios from "axios"

export default class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movie_name:"",
            details:[],
        }
    }
    handleChange = (e) =>{
        var add = {
            movie_name:e.target.value
        }
        axios.post("http://127.0.0.1:5000/search_movie",add)
        .then(response =>{
            console.log(response)
            this.setState({
                details:response.data,
            })
        })
        .catch(error =>{console.log(error)})
    }
    render(){
        return(
            <div>
                 <input type="text" placeholder="Search" name = "movie_name" 
                         onChange = {(e) => this.handleChange(e)}
                    />
               <div>
                <h1>Search Results are here</h1>
                {this.state.details.map((e) =>{
                    return(
                        <div style = {{marginBottom:"20px"}}>
                            <h3 style = {{color:"red"}}>Movie Title:{e[1]}</h3>
                            <img src = {`http://127.0.0.1:5000/${e[2]}`}
                                style = {{width:"500px",height:"300px"}} alt = "No image"
                            />
                        </div>
                        )
                })}
                </div>
            </div>
        )
    }
}