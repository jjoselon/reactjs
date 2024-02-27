import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        
        props.showFormNewUser(false)
        props.updateUser(user)
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
      <button>Update user</button>
      <button onClick={() => {
        props.showFormNewUser(false)
        props.setEditing(false)
      }} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditUserForm
