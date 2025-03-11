import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from './Components/Modal';

// Previous way of doing things with quiz page using Router. Pre-Dom. 
// // Function to create a div of class tile. We can pass this props so it knows how to look. 
// function Tile({ title = "Title not set" }) {
//     const navigate = useNavigate();

//     // Navigate to the quiz page. state can then be accessed, and the page title within it. 
//     // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
//     const toQuizPage = () => {
//         navigate('/pages/Quiz', {state:{name: title}});
//     }

//     const handleClick = () => {
//         toQuizPage()
//     };
    
//     return (
//         <div class="tile" onClick={handleClick}>
//             {title}
//         </div>
//     );
// }


// New way 

// Function to create a div of class tile. We can pass this props so it knows how to look. 
// Tile Component
function Tile({ title = "Title not set", onClick }) {
    return (
        <div className="tile" onClick={onClick}>
            {title}
        </div>
    );
}

// TileGrid Component (with dynamic titles)
export default function TileGrid() {
    // State to control modal visibility
    const [openModal, setOpenModal] = useState(false);
    // State to store the title of the clicked tile
    const [modalTitle, setModalTitle] = useState("");  

    // Handle opening the modal
    const handleOpenModal = (title) => {
        if (openModal) return; // If modal is already open, don't re-open it
        setModalTitle(title);  // Set the clicked tile's title
        setOpenModal(true);
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setModalTitle("");   // Optionally reset the title when modal closes (clear previous state)
    };

    // Array of tile titles
    const tileTitles = [
        "Present", "Perfekt", "Other Tile 2", "Other Tile 3", 
        "Other Tile 4", "Other Tile 5", "Other Tile 6", "Other Tile 7",
        "Other Tile 8", "Other Tile 9", "Other Tile 10", "Other Tile 11"
    ];

    return (
        <section className="grid-1">
            {/* Dynamically render tiles */}
            {tileTitles.map((title, index) => (
                <Tile key={index} title={title} onClick={() => handleOpenModal(title)} /> // Pass the title of the clicked tile
            ))}

            {/* Conditionally render the modal */}
            {openModal && <Modal title={modalTitle} onClose={handleCloseModal} />}
        </section>
    );
}
