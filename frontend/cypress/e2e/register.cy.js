describe('Register Page', () => {
  // Run before each test: Visit the registration page
  beforeEach(() => {
    cy.visit('/register')
  })

  it('should display the registration form correctly', () => {
    // Check if the form fields and buttons are visible
    cy.contains('Crear una cuenta').should('be.visible')
    cy.get('#name').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#passwordConfirm').should('be.visible')
    cy.get('#role').click() 
    cy.get('.ant-select-item-option').contains('Empleado').click() 
    cy.get('.btn').contains('Crear cuenta').should('be.visible')
  })

  it('should show validation errors if required fields are missing', () => {
    // Attempt to submit the form without filling in required fields
    cy.get('.btn').click()
  
    // Validate that error messages are shown for all missing fields
    cy.contains('Por favor ingresa tu nombre').should('be.visible')
    cy.wait(800)
    cy.contains('Por favor ingresa tu email').should('be.visible')
    cy.wait(800)
    cy.contains('Por favor ingresa tu contraseña').should('be.visible')
    cy.wait(800)
    cy.contains('Por favor confirma tu contraseña').should('be.visible')
    cy.wait(800)
    cy.contains('Por favor selecciona tu rol').should('be.visible')
    cy.wait(800)
  })

  it('should submit the form and show the loading spinner', () => {
    // Fill in the form fields
    cy.get('#name').type('Test User')
    cy.get('#email').type('testuser@example.com')
    cy.get('#password').type('password123')
    cy.get('#passwordConfirm').type('password123')
    cy.get('#role').click() 
    cy.get('.ant-select-item-option').contains('Empleado').click() 
    cy.get('.btn').click()

    // Ensure that the loading spinner is visible after form submission
    cy.get('.btn').find('.ant-spin', { timeout: 10000 }).should('be.visible')
  })

  it('should show an error alert if the registration fails', () => {
    // Mock a failed registration request
    cy.intercept('POST', '/api/register', {
      statusCode: 400,
      body: { message: 'Error during registration' },
    }).as('registerRequest')

    // Fill in the form and submit it
    cy.get('#name').type('Test User')
    cy.get('#email').type('testuser@example.com')
    cy.get('#password').type('password123')
    cy.get('#passwordConfirm').type('password123')
    cy.get('#role').click() 
    cy.get('.ant-select-item-option').contains('Empleado').click() 
    cy.get('.btn').contains('Crear cuenta').should('be.visible')

    // Validate that the error alert is displayed after the failed request
    cy.wait('@registerRequest')
    cy.get('.alert').should('contain', 'Error during registration')
  })

  it('should display an error message for an invalid email format', () => {
    // Enter an invalid email format and attempt to submit
    cy.get('#email').type('invalid-email')
    cy.get('.btn').click()

    // Validate that the correct error message is displayed
    cy.contains('Este no es un email válido').should('be.visible')
  })

  it('should display an error message if passwords do not match', () => {
    // Fill in the form with non-matching passwords
    cy.get('#name').type('Test User')
    cy.get('#email').type('testuser@example.com')
    cy.get('#password').type('password123')
    cy.get('#passwordConfirm').type('differentPassword')
    cy.get('#role').click() 
    cy.get('.ant-select-item-option').contains('Empleado').click() 
    cy.get('.btn').contains('Crear cuenta').should('be.visible').click()

    // Validate that the error message for non-matching passwords is displayed
    cy.contains('Las contraseñas no coinciden').should('be.visible')
  })

  it('should redirect to the homepage after successful registration', () => {
    // Mock a successful registration request
    cy.intercept('POST', '/api/register', {
      statusCode: 200,
      body: { token: 'mockToken', user: { name: 'Test User' } },
    }).as('registerRequest')
  
    // Fill in the form and submit it
    cy.get('#name').type('Test User')
    cy.get('#email').type('testuser@example.com')
    cy.get('#password').type('password123')
    cy.get('#passwordConfirm').type('password123')
    cy.get('#role').click()
    cy.get('.ant-select-item-option').contains('Empleado').click()
    cy.get('.btn').click()
  
    // Verify that the user is redirected to the homepage after successful registration
    cy.wait('@registerRequest')
    cy.url().should('include', '/dashboard')  
  })
})
