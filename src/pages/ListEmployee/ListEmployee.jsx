import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import ModalAdd from '../../components/ModalAdd'
import ModalEdit from '../../components/ModalEdit'
import ModalDelete from '../../components/ModalDelete'
import { getListEmployee } from '../../services/employeeService'
import Loading from '../../components/Loading'

export default function ListEmployee() {
  const [listEmployee, setListEmployee] = useState([])
  const [loading, setLoading] = useState(true)

  const styleLoading = {
    position: 'relative',
    top: '180px',
    left: '50%'
  }

  const getData = async () => {
    try {
      setLoading(true) // Set loading to true before fetching
      const res = await getListEmployee()
      setListEmployee(res)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false) // Set loading to false after fetching
    }
  }

  useEffect(() => {
    getData()
  }, [])

  // Cập nhật danh sách nhân viên sau khi thêm
  const addEmployeeToList = (employee) => {
    setListEmployee((prevList) => [...prevList, employee]);
  };

  const handleRemoveToList = (id) => {
    // Cập nhật danh sách nhân viên sau khi xóa
    setListEmployee(listEmployee.filter(employee => employee.id !== id));
  };

  // Cập nhật danh sách nhân viên sau khi sửa
  const updatedEditUser = (updatedUser) => {
    const updatedData = listEmployee.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser; // Cập nhật người dùng chỉ định
      }
      return user;
    })
    setListEmployee(updatedData);
  }

  const reloadList = () => {
    getData()
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>CRUD - List Employees</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
        <ModalAdd addEmployeeToList={addEmployeeToList} />
        <div>
          <Button variant='success' onClick={reloadList}>Refresh</Button>
        </div>
      </div>


      {loading ? (
        <Loading style={styleLoading}/>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listEmployee.length > 0 ?
              listEmployee.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td style={{ display: 'flex', gap: '10px' }}>
                    <ModalEdit employeeId={item.id} updatedEditUser={updatedEditUser} />
                    <ModalDelete employee={item} onRemove={handleRemoveToList} />
                  </td>
                </tr>
              ))
              : <p style={{ marginTop: '20px', fontSize: '20px', color: 'gray' }}>List empty</p>
            }
          </tbody>
        </Table>
      )}
    </div>

  )
}
