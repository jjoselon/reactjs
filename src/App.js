import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserEdit from './components/UserEdit';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jxvljujsf1.execute-api.us-east-2.amazonaws.com/default/clients');
      const data = await response.json();
      console.log(data);
      setUsers(data.Items);

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Create a new user
  const addUser = async (userData) => {
    try {
      const response = await fetch('https://jxvljujsf1.execute-api.us-east-2.amazonaws.com/default/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
      setUsers([...users, data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Update an existing user
  const updateUser = async (userData) => {
    var id = userData.id;
    delete userData["id"];
    console.log(userData);
    try {
      const response = await fetch(`https://jxvljujsf1.execute-api.us-east-2.amazonaws.com/default/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const updatedUser = await response.json();
      console.log(updatedUser);
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.Attributes.id ? updatedUser.Attributes : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      await fetch(`https://jxvljujsf1.execute-api.us-east-2.amazonaws.com/default/clients/${userId}`, {
        method: 'DELETE',
      });
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>CRUD Application</h1>
      <InputForm addUser={addUser} updateUser={updateUser} initialData={{ id: '', name: '', dob: '', address: '' }} />
      <UserList users={users} viewUser={setSelectedUser} editUser={setSelectedUser} deleteUser={deleteUser} />
      {selectedUser ? (
        <div>
          <UserDetail user={selectedUser} />
          <UserEdit user={selectedUser} updateUser={updateUser} />
        </div>
      ) : null}
    </div>
  );
}

export default App;