import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Birthdate</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.dob}</td>
            <td>{user.address}</td>
            <td>
            <Button icon onClick={() => {
                  props.showFormNewUser(true)
                  props.editRow(user)
                }}
                className="button muted-button">
              <Icon name='edit' />
            </Button>
            <Button icon onClick={() => {
                  props.deleteUser(user.id)
                }}
                className="button muted-button">
              <Icon name='delete' />
            </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable
