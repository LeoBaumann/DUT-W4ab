export const add_mail_address = (person_id, address, type) =>
    fetch("http://localhost:3000/person/"+person_id+"/mailAddress", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({address,type})
        }
    )
    .then(res => res.json());

export const delete_mail_address = (person_id, address_id) => 
    fetch("http://localhost:3000/person/"+person_id+"/mailAddress/"+address_id, {
        method: 'DELETE'
    });

