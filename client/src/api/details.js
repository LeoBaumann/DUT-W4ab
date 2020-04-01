export const get_details = (id) => Promise.all([get_mail_addresses(id), get_phones(id), get_postal_addresses(id)]);

const get_phones = (id) => 
    fetch("http://localhost:3000/person/"+id+"/phone")
    .then(res => res.json());

const get_mail_addresses = (id) => 
    fetch("http://localhost:3000/person/"+id+"/mailAddress")
    .then(res => res.json());

const get_postal_addresses = (id) => 
    fetch("http://localhost:3000/person/"+id+"/postalAddress")
    .then(res => res.json());