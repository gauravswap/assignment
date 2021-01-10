import React, {Component} from 'react';
 export default function Sample(HocComponent){

    return class extends Component{
        render(){

            return(<div>
                <HocComponent></HocComponent>
            </div>);
        }
    }
 }