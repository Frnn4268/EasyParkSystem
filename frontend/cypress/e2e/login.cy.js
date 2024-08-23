describe('Login Component', () => {
  beforeEach(() => {
    // Navigate to the login page before each test
    cy.visit('/login')
    cy.wait(2000)  
  })

  it('should render the login form with all elements', () => {
    // Verify that the title "Iniciar sesión" is present
    cy.contains('Iniciar sesión').should('be.visible')
    cy.wait(2000)  

    // Verify that the login logo is rendered
    cy.get('.auth-image').should('have.attr', 'src').and('include', 'login_logo1.jpg')
    cy.wait(2000)  

    // Verify that the email input field is present
    cy.contains('Ingresa tu email').should('be.visible')
    cy.wait(2000)  

    // Verify that the password input field is present
    cy.get('input[placeholder="Ingresa tu contraseña"]').should('be.visible')
    cy.wait(2000)  

    // Verify that the login button is present
    cy.get('.btn').contains('Iniciar sesión').should('be.visible')
    cy.wait(2000)  

    // Verify that the floating buttons are present
    cy.get('.float-button-color').should('have.length', 3)
    cy.wait(2000)  
  })

  it('should display error message if login fails', () => {
    // Simulate a failed login by submitting the form without data
    cy.get('.btn').click()
    cy.wait(2000)  

    // Verify that an error message appears
    cy.get('.ant-alert-error').should('be.visible')
    cy.wait(2000)  
  })

  it('should show loading spinner when submitting form', () => {
    // Simulate the login action by entering a valid email and password
    cy.get('input[placeholder="Ingresa tu email"]').type('test@example.com')
    cy.wait(2000)  

    cy.get('input[placeholder="Ingresa tu contraseña"]').type('password123')
    cy.wait(2000)  

    // Click the login button
    cy.get('.btn').click()
    cy.wait(2000)  

    // Verify that the spinner is displayed while the form is submitting
    cy.get('.btn').find('.ant-spin').should('be.visible')
    cy.wait(2000)  
  })

  it('should navigate to the registration page', () => {
    // Click on the registration link
    cy.contains('Registrate').click()
    cy.wait(2000)  

    // Verify that the URL changes to the registration page
    cy.url().should('include', '/register')
    cy.wait(2000)  
  })
})
