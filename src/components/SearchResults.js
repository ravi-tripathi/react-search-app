import React, { useState, useRef } from 'react';
import EmptyCard from './EmptyCard';

const SearchResults = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const dropdownRef = useRef(null);
  
    // Filter the list of users based on the search term
      const lowerCaseQuery = searchTerm.toLowerCase();
  
      const filteredUsers = users.filter(user => {
          return (
          user.id.toLowerCase().includes(lowerCaseQuery) ||
          user.name.toLowerCase().includes(lowerCaseQuery) ||
          user.items.some(item => item.toLowerCase().includes(lowerCaseQuery)) ||
          user.address.toLowerCase().includes(lowerCaseQuery) ||
          user.pincode.toLowerCase().includes(lowerCaseQuery)
          );
      });
  
      const refs = users.reduce((acc, _, i) => {
          acc[i] = React.createRef();
          return acc;
      }, {});
  
    // Handle keydown events to allow users to navigate through the dropdown using the arrow keys
    const handleKeyDown = event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const nextIndex = activeIndex === null ? 0 : (activeIndex + 1) % filteredUsers.length;
        setActiveIndex(nextIndex);
        refs[nextIndex].current.scrollIntoView({ behavior: 'smooth' });
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        const nextIndex = activeIndex === null ? filteredUsers.length - 1 : (activeIndex - 1 + filteredUsers.length) % filteredUsers.length;
        setActiveIndex(nextIndex);
        refs[nextIndex].current.scrollIntoView({ behavior: 'smooth' });
      } else if (event.key === 'Enter') {
        event.preventDefault();
        // Navigate to the selected user's profile page or perform some other action here
      }
    };
  
    const highlightText = (searchQuery, text) => {
      const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');  
      const regex = new RegExp(escapedSearchQuery, 'gi');
      return text.replace(regex, `<span class="highlight">$&</span>`);
  }
  
    // Highlight the active item in the dropdown when the user is navigating using the keyboard
    const getClassNameForUser = (index) => {
      if (index === activeIndex) {
        return 'active';
      }
      return '';
    };
  
    // Update the active index when the user clicks on an item in the dropdown
    const handleUserClick = (index) => {
      setActiveIndex(index);
      refs[index].current.scrollIntoView({ behavior: 'smooth' });

    };

    const userCard = filteredUsers.map((user, index) => (
        <div
            key={user.id}
            ref={refs[index]}
            className={getClassNameForUser(index) +' user-card'}
            onMouseMove={() => setActiveIndex(index)}
            onClick={() => handleUserClick(index)}
            >
            <div className="user-id" dangerouslySetInnerHTML={{ __html: highlightText(searchTerm, user.id) }}></div>
            <div className="user-name" dangerouslySetInnerHTML={{ __html: highlightText(searchTerm, user.name) }}></div>
            {(user.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))) ? (<li className='border-top-bottom'><span className='highlight'>"{searchTerm}"</span> found in items.</li>) : (<></>)}  
            <ul className="user-items">
                {user.items.map((item, index) => (
                    <li className="user-item" dangerouslySetInnerHTML={{ __html: highlightText(searchTerm, item) }} key={index}></li>
                ))}
            </ul>
            <div className="user-address" dangerouslySetInnerHTML={{ __html: highlightText(searchTerm, user.address) }}></div>
            <div className="user-pincode" dangerouslySetInnerHTML={{ __html: highlightText(searchTerm, user.pincode) }}></div>
        </div>
      ));

  
    return (
      <div className="typeahead-dropdown" ref={dropdownRef} onKeyDown={handleKeyDown} tabIndex={0}>
        <input
          type="text"
          className="user-input"
          placeholder="Search for a user"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        {filteredUsers.length === 0 ? ( <EmptyCard /> ) : (
          <ul className="dropdown-list">
            {searchTerm && userCard}
          </ul>
        )}
      </div>
    );
};


export default SearchResults;