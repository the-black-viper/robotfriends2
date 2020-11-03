import React, {Component} from 'react'
import CardList from '../components/CardList';
// import {robots} from './robots';
import Searchbox from '../components/Seachbox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component {
    // Constructor ie self.init in python
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }
    // Component did mount is also a built in function
    componentDidMount() {
        // Some Json magic to conver to list
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}))
    }


    // Add another method that logs the event
    // Mind the syntax
    onSearchChange = (event) => {
        // console.log(this.state.searchField)
        // this.state.searchField = event.target.value;
        this.setState({searchField: event.target.value})
        console.log(this.state.searchField)

        
    }

    render() {
        const {robots, searchField} = this.state;
        const checkName = (robot )=> {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        }

        const filteredRobots = robots.filter(checkName);
        
        console.log(filteredRobots)

        return !robots.length ? 
            <h1>Loading...</h1>:    
            (      
            <div className='tc'>
                <h1 className='f2'>Robofriends</h1>
                <Searchbox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
            );
    }
}

export default App;