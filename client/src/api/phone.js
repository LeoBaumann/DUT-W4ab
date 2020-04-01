export const add_phone = (person_id, number, type) => 
    fetch("http://localhost:3000/person/"+person_id+"/phone", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({number,type})
        }
    )
    .then(res => res.json());

export const update_phone = (person_id,phone_id,num,type) =>
    fetch("http://localhost:3000/person/"+person_id+"/phone/"+phone_id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({num,type})
        }
    )
    .then(res => res.json());

export const delete_phone = (person_id, phone_id) =>
    fetch("http://localhost:3000/person/"+person_id+"/phone/"+phone_id, {
        method: 'DELETE'
    });