import React, { Component } from 'react';
import './App.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tab1 from './Tab1';
import Tab2 from './Tab2'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '1' }
}

handle_change = (value) => {
    this.setState({ value })
}
  render() {
    let content_array = [<Tab1 />, <Tab2 />];
    return (
        <div>
            <Tabs value={this.state.value} onChange={(e, v) => { this.handle_change(v) }} indicatorColor="primary"
                textColor="primary" centered>
                <Tab value='1' label='First tab'></Tab>
                <Tab value='2' label='Second tab'></Tab>
                
            </Tabs>
           
                {content_array[this.state.value - 1]}
            
        </div>
    )
}}
export default App;
