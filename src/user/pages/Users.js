import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Lalo Aguilar',
      image:
        'https://images.pexels.com/photos/939962/pexels-photo-939962.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      places: 5,
    },
  ]

  return <UsersList items={USERS} />
}

export default Users
