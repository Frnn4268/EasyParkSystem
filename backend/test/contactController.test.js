const Contact = require('../src/models/contactModel');
const createError = require('../src/utils/appError');
const { getAllContacts, createContact, updateContact, deleteContact } = require('../src/controllers/contactController');

jest.mock('../src/models/contactModel');
jest.mock('../src/utils/appError');

describe('Contact Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe('getAllContacts', () => {
        it('should return all contacts', async () => {
            const contacts = [{ name: 'John Doe', email: 'john@example.com', message: 'Hello!' }];
            Contact.find.mockResolvedValueOnce(contacts);

            await getAllContacts(req, res, next);

            expect(Contact.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: contacts
            });
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            Contact.find.mockRejectedValueOnce(error);

            await getAllContacts(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('createContact', () => {
        it('should create a new contact and return it', async () => {
            const newContact = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };
            Contact.create.mockResolvedValueOnce(newContact);

            req.body = newContact;

            await createContact(req, res, next);

            expect(Contact.create).toHaveBeenCalledWith(newContact);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Contacto creado exitosamente!',
                data: newContact
            });
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            Contact.create.mockRejectedValueOnce(error);

            req.body = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };

            await createContact(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateContact', () => {
        it('should update an existing contact and return it', async () => {
            const updatedContact = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };
            const id = '123';
            req.params = { id };
            req.body = updatedContact;
            Contact.findByIdAndUpdate.mockResolvedValueOnce(updatedContact);

            await updateContact(req, res, next);

            expect(Contact.findByIdAndUpdate).toHaveBeenCalledWith(id, updatedContact, { new: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Contacto actualizado exitosamente!',
                data: updatedContact
            });
        });

        it('should handle contact not found', async () => {
            const id = '123';
            req.params = { id };
            req.body = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };
            Contact.findByIdAndUpdate.mockResolvedValueOnce(null);

            await updateContact(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Contacto no encontrado'));
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            req.body = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };
            Contact.findByIdAndUpdate.mockRejectedValueOnce(error);

            await updateContact(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteContact', () => {
        it('should delete a contact and return success', async () => {
            const id = '123';
            req.params = { id };
            const deletedContact = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi!' };
            Contact.findByIdAndDelete.mockResolvedValueOnce(deletedContact);

            await deleteContact(req, res, next);

            expect(Contact.findByIdAndDelete).toHaveBeenCalledWith(id);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Contacto eliminado exitosamente!',
                data: null
            });
        });

        it('should handle contact not found', async () => {
            const id = '123';
            req.params = { id };
            Contact.findByIdAndDelete.mockResolvedValueOnce(null);

            await deleteContact(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Contacto no encontrado'));
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            Contact.findByIdAndDelete.mockRejectedValueOnce(error);

            await deleteContact(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
