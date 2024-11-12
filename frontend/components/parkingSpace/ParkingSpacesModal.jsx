import React from 'react';
import { Modal, Button, Popover, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { QRCode } from 'antd';

const ParkingSpacesModal = ({
  confirmVisible,
  handleConfirm,
  handleCancel,
  selectedButtonId,
  parkingSpaceDetails
}) => (
  <Modal
    title="¿Está seguro de que desea liberar este espacio de parqueo?"
    visible={confirmVisible}
    onOk={handleConfirm}
    onCancel={handleCancel}
    okText="Confirmar"
    cancelText="Cancelar"
    okType="danger"
    icon={<ExclamationCircleOutlined />}
  >
    <p>Ha seleccionado el espacio de parqueo número: {selectedButtonId}</p>
    <Popover
      overlayInnerStyle={{
        padding: 0,
        width: 400,
        height: 410
      }}
      content={
        <div>
          <QRCode 
            value={`${import.meta.env.VITE_APP_API_URL_PARKING_TIME_CUSTOMER_VIEW}/${parkingSpaceDetails}`} 
            bordered={false} 
            color='blue'
            bgColor='white'
            style={{ width: 350, height: 350,  margin: '0px 0px 0px 25px' }}
          />
          <Input
            placeholder="-"
            value={`${import.meta.env.VITE_APP_API_URL_PARKING_TIME_CUSTOMER_VIEW}/${parkingSpaceDetails}`}
            style={{ width: 350, height: 35, margin: '7.5px 0px 0px 25px' }}
          />
        </div>
      }
    > 
      <Button type="primary" ghost style={{ position: 'fixed' }}>Ver QR de Cliente</Button>
    </Popover>
  </Modal>
);

export default ParkingSpacesModal;