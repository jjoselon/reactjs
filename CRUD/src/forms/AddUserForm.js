import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = { id: '', name: '', dob: '', address: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!user.name || !user.dob) return

				props.addUser(user)
				setUser(initialFormState)
			}}
		>
			<label>Id</label>
			<input type="text" name="id" value={user.id} onChange={handleInputChange} />
			<label>Name</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<label>Birthdate</label>
			<input type="text" name="dob" value={user.dob} onChange={handleInputChange} />
			<label>Address</label>
			<input type="text" name="address" value={user.address} onChange={handleInputChange} />
			<button>Add new user</button>
		</form>
	)
}

export default AddUserForm
