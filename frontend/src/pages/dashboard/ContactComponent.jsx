import { useEffect, useState } from 'react';
import { Layout, Typography, message, Modal, Form } from 'antd';

import TopMenu from './TopMenu.jsx';
import LeftMenu from './LeftMenu.jsx';
import ContactTable from '../../../components/dashboardContact/ContactTable.jsx';
import ContactDrawer from '../../../components/dashboardContact/ContactDrawer.jsx';

import '../../css/DashboardMenu.css';
import '../../css/ContactComponent.css';

const { Header } = Layout;
const { confirm } = Modal;

const ContactComponent = () => {
  const [contacts, setContacts] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/contact`);
        if (response.ok) {
          const data = await response.json();
          setContacts(data.data);
        } else {
          console.error('Error getting contacts');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  const getRandomColor = () => {
    const colors = ['blue', 'red', 'yellow', 'green', 'purple'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleDelete = (id) => {
    confirm({
      title: '¿Estás seguro de eliminar este contacto?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        fetch(`${import.meta.env.VITE_APP_API_URL}/contact/${id}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            const updatedContacts = contacts.filter(contact => contact.id !== id);
            setContacts(updatedContacts);
            message.success('Contacto eliminado exitosamente.');
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

  const handleUpdate = (contact) => {
    setSelectedContact(contact);
    form.setFieldsValue({
      name: contact.name,
      email: contact.email,
      message: contact.message,
    });
    setDrawerVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/contact/${selectedContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const updatedContact = await response.json();
        const updatedContacts = contacts.map(contact =>
          contact.id === updatedContact.id ? updatedContact : contact
        );
        setContacts(updatedContacts);
        setDrawerVisible(false);

        const updatedResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/contact`);
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setContacts(updatedData.data);
        } else {
          console.error('Error getting updated contacts');
        }
      } else {
        console.error('Error updating contact');
      }
    } catch (error) {
      console.error('Error processing request:', error);
    }
  };

  return (
    <Layout>
      <Header className='home-header-dashboard'>
        <TopMenu />
      </Header>
      <Layout>
        <Layout.Sider>
          <LeftMenu />
        </Layout.Sider>
        <Layout.Content className='layout-content-contact'>
          <Typography.Title className='table-title-contact' level={2}>
            Contacto
          </Typography.Title>
          <ContactTable 
            contacts={contacts} 
            handleUpdate={handleUpdate} 
            handleDelete={handleDelete} 
            getRandomColor={getRandomColor} 
          />
        </Layout.Content>
      </Layout>
      <ContactDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
        form={form}
        onFinish={onFinish}
      />
    </Layout>
  );
};

export default ContactComponent;