import React, {useState, useEffect } from "react";
import {Route, Link} from "react-router-dom";
import {get_people, add_person, delete_person} from './api/person';  
import Details  from './Details'


const People = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
        get_people()
        .then(data => {
            setPeople(data);
            setLoading(false);
        }).catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    const addPerson = (firstname, lastname) => 
        add_person(firstname,lastname)
        .then(res => res.json())
        .then(res => setPeople(people => [...people,res]))
        .catch(err => {
            setError(err.message);
        });
    
    const deletePerson = (id) => 
        delete_person(id)
        .then(setPeople(people => people.filter((p, idx) => p.id !== id)));
    
    return <>    
        <AddPeopleForm addPerson={addPerson}/>
        <PeopleList people={people} deletePerson={deletePerson} loading={loading} error={error}/>
    </>;               
}

const AddPeopleForm = ({addPerson}) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState('');

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
    }

    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
    }

    const submitPerson = (event) => {
        event.preventDefault();
        addPerson(firstname, lastname)
        .then(() => {
            setFirstname("");
            setLastname("");
        }).catch(err=>setError(err.message))
    }
    

    return <>
        <h2>Add a person</h2>
        <form onSubmit = {submitPerson}>
            <label for="firstname">Firstname</label><input id="firstname" type="text" value={firstname} onChange={handleFirstnameChange} /><br />
            <label for="lastname">Lastname</label><input id="lastname" type="text" value={lastname} onChange={handleLastnameChange} />
            <input type="submit" value="Add" />
        </form>
        {error && "Error : "+ error}
    </>
}

const PeopleList = ({people,deletePerson,loading,error}) => {
    return <>
        <h2>People list</h2>
        {loading ? <>Loading...</> :
         error ? 'Error : ' + error :
        <>
            <table className="people-list">
                <thead>
                    <td>Firstname</td>
                    <td>Lastname</td>
                </thead>

                {people.map(p => 
                    <tr>
                        <td>{p.firstname}</td>
                        <td>{p.lastname}</td>
                        <td>
                        <Link to={'/people/'+p.id}><button>Details</button></Link> 
                        <button onClick={() => deletePerson(p.id)}>Delete</button>
                        </td>
                    </tr>
                )}
            </table>

            <Route path="/people/:id">
                <Link to="/people">Close details</Link>
                <Details people={people}/>
            </Route>
        </>
        }
            
    </>;
}

export default People;
