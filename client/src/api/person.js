import {checkStatus} from "./utils";

export const get_people = () =>
    fetch('http://localhost:3000/person')
        .then((res) => new Promise((resolve, reject) => setTimeout(()=>resolve(res),1500)))
        .then(checkStatus)
        .then(res => res.json());

export const add_person = (firstname, lastname) => 
    fetch('http://localhost:3000/person', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstname,lastname})
        })

export const delete_person = (person_id) => 
    fetch('http://localhost:3000/person/'+person_id, { method: 'DELETE' })

