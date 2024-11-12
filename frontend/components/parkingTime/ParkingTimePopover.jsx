import React from 'react';
import { Popover, FloatButton } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const ParkingTimePopover = ({ popoverVisible, handlePopoverVisibleChange }) => (
  <Popover
    content={(
      <div>
        <p>Por favor, ten en cuenta que todos los datos proporcionados son de referencia y podrían no ser completamente precisos al momento de realizar el pago por el servicio de estacionamiento.</p>
        <p>Para obtener información más detallada sobre el costo actual del estacionamiento, te recomendamos verificar con el personal autorizado.</p>
      </div>
    )}
    title="Aviso"
    trigger="click"
    visible={popoverVisible}
    onVisibleChange={handlePopoverVisibleChange}
    overlayClassName="custom-popover"
  >
    <FloatButton
      icon={<QuestionCircleOutlined />}
      type="primary"
      style={{
        right: 20,
        bottom: 70
      }}
    />
  </Popover>
);

export default ParkingTimePopover;