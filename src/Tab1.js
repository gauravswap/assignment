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
    if(sample.data){
       sample2 = sample.data.Search;
    }
     return(<div className="addmargin">
    <form>
      <Modal show={this.state.show} handleClose={this.hideModal}>
          <div> <h4>Actor:</h4> {showData.data && showData.data ? showData.data.Actors :''}</div>
          <div> <h4>Awards:</h4> {showData.data && showData.data ? showData.data.Awards :''}</div>
          <div> <h4>BoxOffice:</h4> {showData.data && showData.data ? showData.data.BoxOffice :''}</div>
          <div> <h4>Director:</h4> {showData.data && showData.data ? showData.data.Director :''}</div>
          <div> <h4>Plot:</h4> {showData.data && showData.data ? showData.data.Plot :''}</div>
          <div> <h4>Ratings:</h4> {showData.data && showData.data ? showData.data.imdbRating :''}</div>
         
          { (showData.data && showData.data && showData.data.imdbRating > 7)
                        ? <div> <h4>boxoffice: hit</h4> </div> 
                        : <div> <h4>boxoffice: flop</h4> </div> }
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
        {(sample2 && sample2 !== 'undefined')
        ? (sample2.map((item, idx) => {
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
           </div>)}))
        : <p> No Data Available </p>}
      </form>
     </div>)
  }
}
