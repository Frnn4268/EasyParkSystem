const Contact = require('../src/models/contactModel');
const createError = require('../src/utils/appError');
const { getAllContacts, createContact, updateContact, deleteContact } = require('../src/controllers/contactController');

jest.mock('../src/models/contactModel');
jest.mock('../src/utils/appError');

// Test suite for the Contact Controller
describe('contactController Unit Testing - Contact Controller', () => {
    let req, res, next;

    // Setup mock request, response, and next function for each test
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(), // Mock status method and enable chaining
            json: jest.fn(), // Mock json method to return response data
        };
        next = jest.fn(); // Mock next function for error handling
    });

    // Test suite for getAllContacts function
    describe('contactController - getAllContacts', () => {
        // Test successful retrieval of all contacts
        it('should retrieve and return all contacts', async () => {
            const contacts = [{ name: 'John Doe', email: 'john@example.com', message: 'Hello!' }];
            Contact.find.mockResolvedValueOnce(contacts); // Mock successful database retrieval

            await getAllContacts(req, res, next); // Call the controller method

            expect(Contact.find).toHaveBeenCalled(); // Verify that Contact.find was called
            expect(res.status).toHaveBeenCalledWith(200); // Verify that status 200 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: contacts
            }); // Verify that correct data was returned in response
        });

        // Test error handling during retrieval of contacts
        it('should handle errors during retrieval of contacts', async () => {
            const error = new Error('Database error');
            Contact.find.mockRejectedValueOnce(error); // Mock a database error

            await getAllContacts(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    // Test suite for createContact function
    describe('contactController - createContact', () => {
        // Test successful creation of a new contact
        it('should create a new contact and return it', async () => {
            const newContact = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };
            Contact.create.mockResolvedValueOnce(newContact); // Mock successful contact creation

            req.body = newContact;

            await createContact(req, res, next);

            expect(Contact.create).toHaveBeenCalledWith(newContact); // Verify that Contact.create was called with correct data
            expect(res.status).toHaveBeenCalledWith(201); // Verify that status 201 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Contacto creado exitosamente!',
                data: newContact
            }); // Verify that correct data was returned in response
        });

        // Test error handling during creation of a new contact
        it('should handle errors during creation of a new contact', async () => {
            const error = new Error('Database error');
            Contact.create.mockRejectedValueOnce(error); // Mock a database error during contact creation

            req.body = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };

            await createContact(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    // Test suite for updateContact function
    describe('contactController - updateContact', () => {
        // Test successful update of an existing contact
        it('should update an existing contact and return it', async () => {
            const updatedContact = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };
            const id = '123';
            req.params = { id };
            req.body = updatedContact;
            Contact.findByIdAndUpdate.mockResolvedValueOnce(updatedContact); // Mock successful contact update

            await updateContact(req, res, next);

            expect(Contact.findByIdAndUpdate).toHaveBeenCalledWith(id, updatedContact, { new: true }); // Verify that the update method was called with correct parameters
            expect(res.status).toHaveBeenCalledWith(200); // Verify that status 200 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Contacto actualizado exitosamente!',
                data: updatedContact
            }); // Verify that correct data was returned in response
        });

        // Test handling of contact not found during update
        it('should handle contact not found during update', async () => {
            const id = '123';
            req.params = { id };
            req.body = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };
            Contact.findByIdAndUpdate.mockResolvedValueOnce(null); // Mock a case where contact is not found

            await updateContact(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Contacto no encontrado')); // Verify that a 404 error was passed to next()
        });

        // Test error handling during update of a contact
        it('should handle errors during update of a contact', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            req.body = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };
            Contact.findByIdAndUpdate.mockRejectedValueOnce(error); // Mock a database error during contact update

            await updateContact(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    // Test suite for deleteContact function
    describe('contactController - deleteContact', () => {
        // Test successful deletion of a contact
        it('should delete a contact and return success', async () => {
            const id = '123';
            req.params = { id };
            const deletedContact = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };
            Contact.findByIdAndDelete.mockResolvedValueOnce(deletedContact); // Mock successful contact deletion

            await deleteContact(req, res, next);

            expect(Contact.findByIdAndDelete).toHaveBeenCalledWith(id); // Verify that the delete method was called with correct id
            expect(res.status).toHaveBeenCalledWith(204); // Verify that status 204 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Contacto eliminado exitosamente!',
                data: null
            }); // Verify that correct response was returned
        });

        // Test handling of contact not found during deletion
        it('should handle contact not found during deletion', async () => {
            const id = '123';
            req.params = { id };
            Contact.findByIdAndDelete.mockResolvedValueOnce(null); // Mock a case where contact is not found

            await deleteContact(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Contacto no encontrado')); // Verify that a 404 error was passed to next()
        });

        // Test error handling during deletion of a contact
        it('should handle errors during deletion of a contact', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            Contact.findByIdAndDelete.mockRejectedValueOnce(error); // Mock a database error during contact deletion

            await deleteContact(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });
});