import {useLocation} from 'react-router-dom';

function Quiz() {

    const location = useLocation();
    return (
        <div>
            <h1>{location.state.name}</h1>
        </div>
    );
}

export default Quiz;
