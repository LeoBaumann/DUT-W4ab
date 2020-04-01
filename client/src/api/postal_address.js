export const add_postal_address = (person_id, address, city, country, type) =>
    fetch("http://localhost:3000/person/"+person_id+"/postalAddress", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({address, city, country, type})
        }
    )
    .then(res => res.json());

export const delete_postal_address = (person_id, address_id) => 
    fetch("http://localhost:3000/person/"+person_id+"/postalAddress/"+address_id, {
        method: 'DELETE'
    });

