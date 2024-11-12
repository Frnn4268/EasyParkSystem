import { useEffect, useState } from 'react';
import { Layout, Typography, Modal, Form, message } from 'antd';

import UsersTable from '../../../components/user/UsersTable';
import UsersDrawer from '../../../components/user/UsersDrawer';
import UsersHeader from '../../../components/user/UsersHeader';
import UsersLayout from '../../../components/user/UsersLayout';

import '../../css/DashboardMenu.css';
import '../../css/User.css';

const { confirm } = Modal;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null); 
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);
      } else {
        console.error('Error getting users');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomColor = () => {
    const colors = ['blue', 'red', 'yellow', 'green', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleDelete = (id) => {
    confirm({
      title: '¿Estás seguro de eliminar este usuario?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        fetch(`${import.meta.env.VITE_APP_API_URL}/user/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              fetchUsers(); 
              message.success('Usuario eliminado exitosamente.');
            } else {
              console.error('Error to delete contact');
            }
          })
          .catch(error => {
            console.error('Error processing request:', error);
          });
      },
      onCancel() {
        console.log('Canceled');
      },
    });
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active
    });
    setSelectedRole(user.role); 
    setDrawerVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        await fetchUsers(); 
        setDrawerVisible(false);
        message.success('Usuario editado exitosamente.');
      } else {
        console.error('Error updating user');
      }
    } catch (error) {
      console.error('Error processing request:', error);
    }
  };

  const handleSwitchChange = async (userId, checked) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: checked }),
      });
      if (!response.ok) {
        console.error('Error updating user');
      } else {
        await fetchUsers(); 
      }
    } catch (error) {
      console.error('Error processing request:', error);
    }
  };

  return (
    <Layout>
      <UsersHeader />
      <UsersLayout>
        <Typography.Title className='table-title-user' level={2}>
          Usuarios
        </Typography.Title>
        <UsersTable
          users={users}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          handleSwitchChange={handleSwitchChange}
          getRandomColor={getRandomColor}
        />
      </UsersLayout>
      <UsersDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
        form={form}
        onFinish={onFinish}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
    </Layout>
  );
};

export default Users;