describe('Register Page', () => {
    beforeEach(() => {
      // Navigate to the registration page before each test
      cy.visit('/register')
    })
  
    it('should display the registration form correctly', () => {
      // Verify that the title "Crear una cuenta" is present
      cy.contains('Crear una cuenta').should('be.visible')
      cy.wait(2000)
  
      // Verify that the name input field is present
      cy.get('input.ant-select-selection-search-input').should('be.visible')
      cy.wait(2000)

      // Verify that the email input field is present
      cy.get('input.ant-select-selection-search-input').should('be.visible') // Ajusta según el HTML real
      cy.wait(2000)

      // Verify that the password input field is present
      cy.get('input.ant-select-selection-search-input').should('be.visible')
      cy.wait(2000)
        
      // Verify that the confirm password input field is present
      cy.get('input.ant-select-selection-search-input').should('be.visible')
      cy.wait(2000)

      // Verify that the role select field is present
      cy.get('.ant-select').should('be.visible')
      cy.wait(2000)

      // Verify that the registration button is present
      cy.get('.btn').contains('Crear cuenta').should('be.visible')
      cy.wait(2000)
    })
  
    it('should show validation errors if required fields are missing', () => {
      // Click the registration button without filling in the form
      cy.get('.btn').click()
  
      // Verify that validation errors are displayed
      cy.contains('Por favor ingresa tu nombre').should('be.visible')
      cy.contains('Por favor ingresa tu email').should('be.visible')
      cy.contains('Por favor ingresa tu contraseña').should('be.visible')
      cy.contains('Por favor confirma tu contraseña').should('be.visible')
      cy.contains('Por favor selecciona tu rol').should('be.visible')
    })
  
    it('should submit the form and show the loading spinner', () => {
      // Fill in the form with valid data
      cy.get('input[placeholder="Ingresa tu nombre completo"]').type('Test User')
      cy.get('ant-select-selection-search-input').type('testuser@example.com') // Ajusta según el HTML real
      cy.get('input[placeholder="Ingresa tu contraseña"]').type('password123')
      cy.get('input[placeholder="Ingresa de nuevo tu contraseña"]').type('password123')
      cy.get('.ant-select').click()
      cy.get('.ant-select-dropdown-menu-item').contains('Empleado').click()
      cy.get('.btn').click()
      
      // Wait for the loading spinner to appear
      cy.get('.btn').find('.ant-spin', { timeout: 10000 }).should('be.visible')
    })
  
    it('should show an error alert if the registration fails', () => {
      // Simulate a failed registration by intercepting the request
      cy.intercept('POST', '/api/register', {
        statusCode: 400,
        body: { message: 'Error during registration' },
      }).as('registerRequest')
  
      // Fill in the form with valid data
      cy.get('input[placeholder="Ingresa tu nombre completo"]').type('Test User')
      cy.get('input[type="email"]').type('testuser@example.com') // Ajusta según el HTML real
      cy.get('input[placeholder="Ingresa tu contraseña"]').type('password123')
      cy.get('input[placeholder="Ingresa de nuevo tu contraseña"]').type('password123')
      cy.get('.ant-select').click()
      cy.get('.ant-select-dropdown-menu-item').contains('Empleado').click()
      cy.get('.btn').click()
  
      // Wait for the request to complete
      cy.wait('@registerRequest')
  
      // Verify that the error alert is displayed
      cy.get('.alert').should('contain', 'Error during registration')
    })
  })
  