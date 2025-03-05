import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Function to create a div of class tile. We can pass this props so it knows how to look. 
function Tile({ title = "Title not set" }) {
    const navigate = useNavigate();

    // Navigate to the quiz page. state can then be accessed, and the page title within it. 
    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
    const toQuizPage = () => {
        navigate('/pages/Quiz', {state:{name: title}});
    }

    const handleClick = () => {
        toQuizPage()
    };
    
    return (
        <div class="tile" onClick={handleClick}>
            {title}
        </div>
    );
}

// Not sure this is going to work, but something along these lines? 
let linkdictionary = {};
linkdictionary["Perfekt"] = "window.location.href='https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-17.png'";

function GetCorrectLink({ title }) {
    return (
        linkdictionary(title)
    );
}

// Make the onClick within the Tile function? Then it can use the same tile props
// to know which link it needs to take the user to. 

// Make another function that is called within tile that can grab the correct words list? 

export default function TileGrid() {
    return (
        <section class="grid-1">
            <Tile 
                title={"Perfekt"}
            />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
        </section>
    )
}