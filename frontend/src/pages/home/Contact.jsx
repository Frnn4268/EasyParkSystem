import React, { useState } from 'react';
import { message } from 'antd';

import ContactLayout from '../../../components/contact/ContactLayout.jsx';

const Contact = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi
      .loading('Enviando mensaje...', 2.5)
      .then(() => message.success('Mensaje enviado correctamente', 2.5))
      .catch(() => message.error('Error al enviar el mensaje', 2.5));
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        success();
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <ContactLayout handleSubmit={handleSubmit} contextHolder={contextHolder} />
  );
};

export default Contact;