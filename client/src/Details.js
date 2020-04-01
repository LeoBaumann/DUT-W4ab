import React, {useState, useEffect } from 'react';

import { get_details } from './api/details';
import { add_mail_address, delete_mail_address } from './api/mail_address';
import { add_phone, delete_phone, update_phone } from './api/phone'
import { add_postal_address, delete_postal_address } from './api/postal_address';

import {useParams} from 'react-router-dom';

const Details = ({people}) => {
    const {id} = useParams(); 
    const person = people.find(person => person.id === parseInt(id));
    const [mailAddresses, setMailAddresses] = useState([]);

    const [phones, setPhones] = useState([]);

    const [loading, setLoading] = useState(true);

    const [num, setNum] = useState("");

    const [mail, setMail] = useState("");

    const [updatedPhone, setUpdatedPhone] = useState("");

    const [type, setType] = useState("home");

    const [postalAddresses, setPostalAddresses] = useState([]);
    const [postal, setPostal] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        setLoading(true);
        get_details(person.id)
        .then(([mailAddresses,phones, postalAddresses]) => {
            setMailAddresses(mailAddresses);
            setPostalAddresses(postalAddresses);
            setPhones(phones);
            setNum("");
            setMail("");
            setType("home");
            setPostal("");
            setCity("");
            setCountry("");
            setLoading(false);
        })
    }, [person]);

    const handleNumChange = (event) => {
        setNum(event.target.value);
    }

    const handleMailChange = (event) => {
        setMail(event.target.value);
    }

    const handlePostalChange = (event) => {
        setPostal(event.target.value);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const submitPhone = (event) => {
        event.preventDefault();
        add_phone(person.id,num,type)
        .then(phone => setPhones(phones => [...phones,phone]))
        .then(() => {
            setNum("");
            setType("home");
            }
        )
    }

    const submitMail = (event) => {
        event.preventDefault();
        add_mail_address(person.id,mail,type)
        .then(mailAddress => setMailAddresses(mailAddresses => [...mailAddresses,mailAddress]))
        .then(() => {
            setMail("");
            setType("home");
        })
    }

    const submitPostal = (event) => {
        event.preventDefault();
        add_postal_address(person.id,postal,city,country,type)
        .then(postalAddress => setPostalAddresses(postalAddresses => [...postalAddresses,postalAddress]))
        .then(() => {
            setPostal("");
            setCity("");
            setCountry("");
            setType("home");
        })
    }

    const deletePhone = (phone_id) => {
        delete_phone(person.id,phone_id)
        .then(setPhones(phones => phones.filter((p, idx) => p.id !== phone_id)))
    }

    const submitUpdatedPhone = (event) => {
        event.preventDefault();
        update_phone(person.id,updatedPhone.id,num,type)
        .then(phone => setUpdatedPhone(phone))
        .then(setPhones(phones => phones.filter((p,idx) => p.id !== updatedPhone.id)))
        .then(() => setPhones(phones => [...phones,updatedPhone]))
        .then(() =>{
            setUpdatedPhone('');
            setNum("");
            setType("home");
        });
    }

    const deleteMail = (mail_id) => {
        delete_mail_address(person.id,mail_id)
        .then(setMailAddresses(mailAddresses => mailAddresses.filter((ma, idx) => ma.id !== mail_id)))
    }

    const deletePostal = (postal_id) => {
        delete_postal_address(person.id,postal_id)
        .then(setPostalAddresses(postalAddresses => postalAddresses.filter((p, idx) => p.id !== postal_id)))
    }

    return <div className="details-box">
        <h2>{person.firstname} {person.lastname}</h2>
        <hr />
        <h3>Phones</h3>
        {phones.length === 0 ? <>This user doesn't have a phone.</> :
            <table>
                <thead>
                    <td>Number</td>
                    <td>Type</td>
                    <td></td>
                </thead>
                {phones.map(phone => 
                    <tr>
                        <td>{phone.number}</td>
                        <td>{phone.type}</td>
                        <td><button onClick={() => setUpdatedPhone(phone)}>Edit</button></td>
                        <td><button onClick={() => deletePhone(phone.id)}>Delete</button></td>
                    </tr>
                )}
            </table>
        }
        {!updatedPhone ?
        <>
            <h4>Add a phone</h4>
            <form onSubmit = {submitPhone}>
                <label for="number">Number</label><input id="number" type ="text" value ={num} onChange={handleNumChange} />
                <label for="type">Type</label>
                <select id="type" value ={type} onChange={handleTypeChange}>
                    <option value={'home'}>Home</option>
                    <option value={'work'}>Work</option>
                </select>
                <input type ="submit" value="Add" />
            </form>
        </>
        :
        <>
            <button onClick = {() => setUpdatedPhone("")}>Cancel number edit</button>
            <h4>Edit phone ID {updatedPhone.id}</h4>
            <form onSubmit = {submitUpdatedPhone}>
                <label for="number">Number</label><input id="number" type ="text" value ={num} onChange={handleNumChange} />
                <label for="type">Type</label>
                <select id="type" value ={type} onChange={handleTypeChange}>
                    <option value={'home'}>Home</option>
                    <option value={'work'}>Work</option>
                </select>
                <input type ="submit" value="Add" />
            </form>
        </>}
        <hr />
        <h3>Mail Addresses</h3>
        {mailAddresses.length === 0 ? <>This user doesn't have a mail address</> :
            <table>
                <thead>
                    <td>Address</td>
                    <td>Type</td>
                    <td></td>
                </thead>
                
                {mailAddresses.map(ma => 
                    <tr>
                        <td>{ma.address} </td>
                        <td>{ma.type}</td>
                        <td><button onClick={() => deleteMail(ma.id)}>Delete</button></td>
                    </tr>
                )}
            </table>
        }
        <h4>Add an address</h4>
        <form onSubmit={submitMail}>
            <label for="address">Address</label><input id="address" type="text" value={mail} onChange={handleMailChange} />
            <label for="typea">Type</label>
            <select id="typea" value={type} onChange={handleTypeChange}>
                <option value={'home'}>Home</option>
                <option value ={'work'}>Work</option>
            </select>
            <input type="submit" value="Add" />
        </form>



        <h3>Postal Addresses</h3>
        {postalAddresses.length === 0 ? <>This user doesn't have a postal address</> :
            <table>
                <thead>
                    <td>Address</td>
                    <td>City</td>
                    <td>Country</td>
                    <td>Type</td>
                </thead>
                
                {postalAddresses.map(p => 
                    <tr>
                        <td>{p.address} </td>
                        <td>{p.city} </td>
                        <td>{p.country} </td>
                        <td>{p.type}</td>
                        <td><button onClick={() => deletePostal(p.id)}>Delete</button></td>
                    </tr>
                )}
            </table>
        }
        <h4>Add a postal address</h4>
        <form onSubmit={submitPostal}>
            <label for="addressp">Address</label>
            <input id="addressp" type="text" value={postal} onChange={handlePostalChange} />
            
            <label for="city">City</label>
            <input id="city" type="text" value={city} onChange={handleCityChange} />

            <label for="country">Country</label>
            <input id="country" type="text" value={country} onChange={handleCountryChange} />
            
            <label for="typeb">Type</label>
            <select id="typeb" value={type} onChange={handleTypeChange}>
                <option value={'home'}>Home</option>
                <option value ={'work'}>Work</option>
            </select>
            <input type="submit" value="Add" />
        </form>
    </div> // End details box
}

export default Details;
