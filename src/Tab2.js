import React, {Component} from 'react';
import axios from 'axios';

export default class Tab2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      year:'',
      details:[]
    }
  }

  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }

  myChangeHandler1 = (event) => {
    this.setState({year: event.target.value});
  }

  getData = (username,year) => {
   axios.get('http://www.omdbapi.com/?s=' + username +'&y='+ year +'&apikey=d44be02c').then(response =>{
   this.setState({details: response}) })
  }
 
  render() {
    const sample = this.state.details;
    let sample2 = [];
    if(sample.data){
       sample2 = sample.data.Search;
    }
    return(<div className="addmargin">
    <form>
      <p> <h4>Please Enter Movie Title and Movie Release Year:</h4></p>
      <div >
     
     <div>
      <input
        type='text'
        placeholder='Movie Title'
        onChange={this.myChangeHandler}/>
     </div>
      
      <div>
       <input
        type='number'
        placeholder='Movie Release Year'
        onChange={this.myChangeHandler1}/>
      </div>
      <div>
        <button type='button' onClick={() => this.getData(this.state.username,this.state.year)} disabled={!this.state.username &&!this.state.year}>save</button>
      </div>
        </div>
        {sample2.map((item, idx) => {
             return (    
              <div class="addMargin">
                <div class="card">
                  {
                    (item.Poster === 'N/A')
                      ? <div> No Poster Available </div> 
                      : <div> <img src={item.Poster} alt="Avatar"/> </div> }
                 <div class="container">
                 <h4><b>{item.Title}</b></h4> 
                 <p>{item.Year}</p> 
                 </div>
                </div>
                </div>)})}
      </form>
     </div>)
  }
}
