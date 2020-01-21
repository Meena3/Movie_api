import React from "react";
import axios from "axios";

export default class Delete extends React.Component{
    handleDelete = () =>{
        var add = {
            movie_id:this.props.match.params.id
        }
        axios.post("http://127.0.0.1:5000/delete_movie",add)
        .then(response =>{
            console.log(response)
            alert("Deleted")
        })
        .catch(error =>{
            console.log(error)
        })
    }
    render(){
        console.log((this.props.match.params.id))
        return(
            <div>
                <h1>To Delete Click Here..!</h1>
                <button  onClick = {() =>{this.handleDelete()}}>Delete Movie</button>
            </div>
        )
    }
}
