import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin'
import "../styles/userManagement.style.scss"

import UserActions from '../components/UserActions'

function UserManagement() {
  const navigate = useNavigate()
  const { students, isLoading } = useAdmin()
  const [search, setSearch] = useState("")

  if (isLoading) return <div>Loading...</div>

  //  filter logic
  const filteredStudents = (students || []).filter((user) => {
    const query = search.toLowerCase()

    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.rollNo?.toLowerCase().includes(query)
    )
  })

  return (
    <div className='user-management'>
      <h2>Users</h2>
      <p className='subtitle'>{filteredStudents.length} Registered Users</p>

      <div className='search-box'>
        <input
          className='input'
          type="text"
          placeholder="Search by name, email, or roll no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Role</th>
              <th>Points</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((user) => (
              <tr key={user._id} onClick={() => navigate(`/user-management/${user._id}`)} style={{ cursor: 'pointer' }}>

                <td className='name-cell'>
                  <div className='avatar'>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                </td>

                <td>{user.email}</td>

                <td>{user.rollNo || "-"}</td>

                <td>
                  <span className={`role ${user.role}`}>
                    {user.role}
                  </span>
                </td>

                <td>{user.points}</td>

                <td className='actions-cell' onClick={(e) => e.stopPropagation()}>
                  <UserActions
                    userId={user._id}
                    currentRole={user.role}
                    currentUID={user.uid}
                  />
                </td>

              </tr>
            ))}


            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="6" className='no-data'>
                  No users found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement