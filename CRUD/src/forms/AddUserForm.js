import React, { useState } from 'react'
import { Segment, Button } from 'semantic-ui-react'


const AddUserForm = props => {
	const initialFormState = { id: '', name: '', dob: '', address: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<Segment>
			<form
				onSubmit={event => {
					event.preventDefault()
					if (!user.name || !user.dob) return

					props.addUser(user)
					props.showFormNewUser(false);
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
				<Button content="Guardar" compact color='blue'></Button>
			</form>
		</Segment>
	)
}

export default AddUserForm
