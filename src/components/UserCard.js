import React from 'react';

// to higlight matching text based upon search
function highlightText(searchQuery, text) {
    const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');  
    const regex = new RegExp(escapedSearchQuery, 'gi');
    return text.replace(regex, `<span class="highlight">$&</span>`);
}
const UserCard = ({ user, index, userCards, query }) => {

    function handleKeyDown(event, index) {
        // check if the up arrow key was pressed
        let currentCards = userCards.current.filter(n => n);
        if (event.key === 'ArrowUp') {
        // if the current element is the first one in the list, focus on the last element
        if (index === 0) {
            currentCards[currentCards.length - 1].focus();
            currentCards[currentCards.length - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        } else {
            // otherwise, focus on the previous element
            currentCards[index - 1].focus();
            currentCards[index - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
        }
        // check if the down arrow key was pressed
        if (event.key === 'ArrowDown') {
            // if the current element is the last one in the list, focus on the first element
            if (index === currentCards.length - 1) {
                currentCards[0].focus();
                currentCards[0].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            } else {
            // otherwise, focus on the next element
                currentCards[index + 1].focus();
                currentCards[index + 1].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }
    }

  function handleMouseEnter(index) {
    console.log(userCards.current[index], index);
    userCards.current[index].focus();
    userCards.current[index].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
  }
    
  return (
    <div
      tabIndex={index}
      className="user-card"
      key={user.id}
      onKeyDown={(event) => handleKeyDown(event, index)}
      onMouseEnter={(event) => handleMouseEnter(index)}
      ref={(el) => userCards.current[index] = el}  
    >
    <div className="user-id" dangerouslySetInnerHTML={{ __html: highlightText(query, user.id) }} />
    <div className="user-name" dangerouslySetInnerHTML={{ __html: highlightText(query, user.name) }} />
    {(user.items.some(item => item.toLowerCase().includes(query.toLowerCase()))) ? (<li className='border-top-bottom'><span className='highlight'>"{query}"</span> found in items.</li>) : (<></>)}
    <div className="user-items">
        {user.items.map((item,index) => (
        <li className="user-item" key={index * Math.random()} dangerouslySetInnerHTML={{ __html: highlightText(query, item) }} />
        ))}
    </div>
    <div className="user-address" dangerouslySetInnerHTML={{ __html: highlightText(query, user.address) }} />
    <div className="user-pincode" dangerouslySetInnerHTML={{ __html: highlightText(query, user.pincode) }} />
    </div>
  );
};

export default UserCard;
