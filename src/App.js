import './App.css';
import SearchResults from './components/SearchResults';
import React, {useState, useEffect} from 'react';

const Users = [  
  { 
    id: '123-s2-546', 
    name: 'John Jacobs', 
    items: ['bucket', 'bottle'],
    address: '1st Cross, 9th Main, abc Apartment',
    pincode: '5xx012'
  },
  {
    id: '123-s3-146',
    name: 'David Mire',
    items: ['Bedroom Set'],
    address: '2nd Cross, BTI Apartment',
    pincode: '4xx012'
  },
  {
    id: '223-a1-234',
    name: 'Soloman Marshall',
    items: ['bottle'],
    address: 'Riverbed Apartment',
    pincode: '4xx032'
  },
  {
    id: '121-s2-111',
    name: 'Ricky Beno',
    items: ['Mobile Set'],
    address: 'Sunshine City',
    pincode: '5xx072'
  },
  {
    id: '123-p2-246',
    name: 'Sikander Singh',
    items: ['Air Conditioner'],
    address: 'Riverbed Apartment',
    pincode: '4xx032'
  },
  {
    id: 'b23-s2-321',
    name: 'Ross Wheeler',
    items: ['Mobile'],
    address: '1st Cross, 9th Main, abc Apartement',
    pincode: '5xx012'
  },
  {
    id: '113-n2-563',
    name: 'Ben Bish',
    items: ['Kitchen Set', 'Chair'],
    address: 'Sunshine City',
    pincode: '5xx072'
  },
  {
    id: '323-s2-112',
    name: 'John Michael',
    items: ['Refrigerator'],
    address: '1st Cross, 9th Main, abc Apartement',
    pincode: '5xx012'
  },
  {
    id: 'abc-34-122',
    name: 'Jason Jordan',
    items: ['Mobile'],
    address: 'Riverbed Apartment',
    pincode: '4xx032'
  }
]

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the server and set them in the state
    setUsers(Users);
  }, []);

  return (
    <SearchResults users={users}/>
  );
}

export default App;
