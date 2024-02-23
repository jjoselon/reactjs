import React, { useState, Fragment, useEffect } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'

function App1() {

	const initialFormState = { id: null, name: '', dob: '', address: '' }

	// Setting state
	const [ users, setUsers ] = useState([])
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)
  
	// Fetch users on component mount
	useEffect(() => {
	  fetchUsers();
	}, []);

	// Fetch users from API
	const fetchUsers = async () => {
		try {
			const response = await fetch('https://d3cg5lrgm0j0jl.cloudfront.net/clients');
			const data = await response.json();
			setUsers(data.Items);

		} catch (error) {
			console.error('Error fetching users:', error);
		}
	};

	const addUser = async (userData) => {
		try {
		  const response = await fetch('https://d3cg5lrgm0j0jl.cloudfront.net/clients', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		  });
		  const data = await response.json();
		  setUsers([...users, data]);
		} catch (error) {
		  console.error('Error adding user:', error);
		}
	};

	const deleteUser = async (userId) => {
		setEditing(false)

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


	// Update an existing user
	const updateUser = async (userData) => {
		setEditing(false)
		var id = userData.id;
		delete userData["id"];
		try {
			const response = await fetch(`https://jxvljujsf1.execute-api.us-east-2.amazonaws.com/default/clients/${id}`, {
				method: 'PUT',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});
			const updatedUser = await response.json();
			const updatedUsers = users.map((user) =>
				user.id === updatedUser.Attributes.id ? updatedUser.Attributes : user
			);
			setUsers(updatedUsers);
		} catch (error) {
			console.error('Error updating user:', error);
		}
	};	

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, dob: user.dob, address: user.address })
	}

	return (
		<div className="container">
			<h1>CRUD App with React <a href='https://github.com/taniarascia/react-hooks'>repo</a></h1>
			
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

const App = () => {

	const usersData = [
		{ id: 1, name: 'Tania', username: 'floppydiskette' },
		{ id: 2, name: 'Craig', username: 'siliconeidolon' },
		{ id: 3, name: 'Ben', username: 'benisphere' },
	]

	const initialFormState = { id: null, name: '', username: '' }

	// Setting state
	const [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, username: user.username })
	}

	return (
		<div className="container">
			<h1>CRUD App with Hooks</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App1
