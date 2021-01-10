import React, {Component} from 'react';
import axios from 'axios'
import Modal from './Modal';

export default class Tab1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      year:'',
      details:[],
      showmoreData:[],
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }


  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }

  myChangeHandler1 = (event) => {
    this.setState({year: event.target.value});
  }

  getData = (username,year) => {
   axios.get('http://www.omdbapi.com/?s=' + username +'&y='+ year +'&apikey=d44be02c').then(response =>
   {
   this.setState({details: response}) })
  }

  clickShow = (imdbID) =>{
   axios.get('http://www.omdbapi.com/?i=' + imdbID + '&plot=full&apikey=d44be02c').then(response=>{
     this.setState({showmoreData:response})
     this.setState({ show: true });
   })
  }
  
  render() {
    const sample = this.state.details;
    const showData = this.state.showmoreData;
    let sample2 = [];
    let showData1 =[];
    if(sample.data){
       sample2 = sample.data.Search;
    }
   
    if(showData){
      showData1 = showData.data;
    }
    console.log("showmoreData",this.state.showmoreData);
    console.log("showmoreData1",showData1);
    return(<div className="addmargin">
    <form>
      <Modal show={this.state.show} handleClose={this.hideModal}>
     <p>data added</p>
      </Modal>

      <p> <h4>Please Enter Movie Title and Movie Release Year:</h4></p>
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
        <button type='button' onClick={() => this.getData(this.state.username,this.state.year)} disabled={!this.state.username && !this.state.year}>save</button>
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
                   <button type='button' onClick = {()=>this.clickShow(item.imdbID)}>show more </button>
                   </div>
                  </div>
                  </div>)})}
      </form>
     </div>)
  }
}
