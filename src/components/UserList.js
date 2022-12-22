import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users, query, userCards}) => {
  return (
    <div className="user-list">
      {query && users.map((user, index) => (
        <UserCard
          user={user}
          index={index}
          key={user.id}
          userCards={userCards}
          query={query}
        />
      ))}
    </div>
  );
};

export default UserList;
