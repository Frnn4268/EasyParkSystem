describe('Customers Component', () => {
  beforeEach(() => {
    cy.visit('/customers')
  })

  it('should render the Customers component correctly', () => {
    cy.get('.table-title-customer').should('contain', 'Clientes')
    cy.wait(1000)
  })

  it('should display the table with customer data', () => {
    cy.get('.ant-table').should('exist')
    cy.wait(1000)
  })
})

describe('Customers Editing', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env("VITE_APP_API_URL")}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')

    cy.visit('/customers')
    cy.wait('@getCustomers')
    cy.wait(1000)
  })

  it('should open the edit drawer when clicking the edit button', () => {
    // Suponiendo que hay clientes cargados
    cy.get('.ant-btn-primary').first().click()
    cy.wait(1000)

    // Verificar que el drawer se haya abierto
    cy.get('.ant-drawer-content', { timeout: 10000 }).should('exist')
    cy.wait(1000)
  })

  it('should submit the form and close the drawer on successful update', () => {
    // Mock de la respuesta de actualización
    cy.intercept('PUT', `${Cypress.env("VITE_APP_API_URL")}/customers`, {
      statusCode: 200,
    }).as('updateCustomer')
    cy.wait(1000)

    cy.get('.ant-btn-primary').first().click()
    cy.get('.ant-drawer-content', { timeout: 10000 }).should('exist')
    cy.wait(1000)

    // Rellenar el formulario
    cy.get('input[name="firstname_owner"]').clear().type('NuevoNombre')
    cy.get('input[name="lastname_owner"]').clear().type('NuevoApellido')
    cy.get('input[name="phone_number"]').clear().type('1234567890')
    cy.wait(1000)

    // Enviar el formulario
    cy.get('.ant-btn-primary').contains('Guardar cambios').click()
    cy.wait(1000)

    // Esperar la solicitud de actualización
    cy.wait('@updateCustomer')
    cy.wait(1000)

    // Verificar que el drawer se haya cerrado
    cy.get('.ant-drawer-content').should('not.exist')
    cy.wait(1000)

    // Verificar que el mensaje de éxito se muestre
    cy.get('.ant-message').should('contain', 'Cliente editado exitosamente.')
    cy.wait(1000)
  })
})

describe('Customer Deletion', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env("VITE_APP_API_URL")}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')

    cy.visit('/customers')
    cy.wait('@getCustomers')
    cy.wait(1000)
  })

  it('should delete a customer when clicking the delete button', () => {
    // Mock de la respuesta de eliminación
    cy.intercept('DELETE', `${Cypress.env("VITE_APP_API_URL")}/customers`, {
      statusCode: 200,
    }).as('deleteCustomer')
    cy.wait(1000)

    // Haz clic en el botón de eliminar
    cy.get('.ant-btn-dangerous').first().click()
    cy.wait(1000)

    // Confirmar la eliminación
    cy.get('.ant-modal-confirm-btns button.ant-btn-dangerous').click()
    cy.wait(1000)

    // Esperar la solicitud de eliminación
    cy.wait('@deleteCustomer')
    cy.wait(1000)

    // Verificar que el cliente haya sido eliminado
    cy.get('.ant-message').should('contain', 'Cliente eliminado exitosamente.')
    cy.wait(1000)
  })
})

describe('Customer Data', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env("VITE_APP_API_URL")}/customers`, {
      fixture: 'customers.json',
    }).as('getCustomers')

    cy.visit('/customers')
    cy.wait('@getCustomers')
    cy.wait(1000)
  })

  it('should display customer data in the table', () => {
    // Verifica que los datos del cliente aparezcan en la tabla
    cy.get('.ant-table-row').should('have.length.greaterThan', 0)
    cy.wait(1000)
  })
})
