import React, { useState, useRef } from 'react';
import UserList from './UserList';
import EmptyCard from './EmptyCard';

const SearchResults = ({ users }) => {
  const userCards = useRef([]); // create a ref array to hold the user card elements
  const [query, setQuery] = useState('');
  const lowerCaseQuery = query.toLowerCase();
    
function handleInputKeyDown(event) {
    let currentCards = userCards.current.filter(n => n);
    if (event.key === 'ArrowUp') {
      currentCards[currentCards.length - 1].focus();
      currentCards[currentCards.length - 1].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    if (event.key === 'ArrowDown') {
        currentCards[0].focus();
        currentCards[0].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
    }
}

const filteredUsers = users.filter(user => {
    return (
      user.id.toLowerCase().includes(lowerCaseQuery) ||
      user.name.toLowerCase().includes(lowerCaseQuery) ||
      user.items.some(item => item.toLowerCase().includes(lowerCaseQuery)) ||
      user.address.toLowerCase().includes(lowerCaseQuery) ||
      user.pincode.toLowerCase().includes(lowerCaseQuery)
    );
});

return (
    <div>
      <input
        type="text"
        placeholder="Search Users by id, address, name, pincode"
        className="search"
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleInputKeyDown}
      />
      {filteredUsers.length === 0 ? (
        <EmptyCard />
      ) : (
        <UserList users={filteredUsers} query={query} userCards={userCards}/>
      )}
    </div>
  );
};


export default SearchResults;