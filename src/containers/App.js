import React, {useState, useEffect} from 'react'
import CardList from '../components/CardList';
import Searchbox from '../components/Seachbox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';


function App() {
    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState('');

    useEffect(() => {
        // Some Json magic to conver to list
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {setRobots(users)});
    },[])

    const onSearchChange = (event) => {

        setSearchField(event.target.value)
        console.log(searchField)        
    }

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
            <Searchbox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundary>
            </Scroll>
        </div>
        );
}


export default App;