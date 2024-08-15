const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../src/models/userModel');
const { signup, login } = require('../src/controllers/authController');
const createError = require('../src/utils/appError');

// Mock dependencies for testing
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../src/models/userModel');
jest.mock('../src/utils/appError');

// Test suite for the signup functionality of the Auth Controller
describe('Auth Controller - signup', () => {
    let req, res, next;

    // Setup mock request, response, and next function before each test
    beforeEach(() => {
        req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'Usuario',
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    // Test successful user signup
    it('should create a new user and return a token', async () => {
        User.findOne.mockResolvedValueOnce(null); // Mocking User.findOne to return null, meaning no existing user
        bcrypt.hash.mockResolvedValueOnce('hashedPassword'); // Mocking bcrypt.hash to return a hashed password
        // Mocking User.create to return a new user object
        User.create.mockResolvedValueOnce({
            _id: '123',
            ...req.body,
            password: 'hashedPassword',
            active: true,
        });
        // Mocking jwt.sign to return a token
        jwt.sign.mockReturnValue('token');

        // Call the signup function
        await signup(req, res, next);

         // Assert the expected behavior
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 12);
        expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
            ...req.body,
            password: 'hashedPassword',
            active: true,
        }));
        expect(jwt.sign).toHaveBeenCalledWith({ _id: '123' }, process.env.SECRET_KEY, { expiresIn: '90d' });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 'success',
            token: 'token',
            user: expect.any(Object),
        }));
    });

    // Test that an error is returned if the user already exists
    it('should return an error if the user already exists', async () => {
        User.findOne.mockResolvedValueOnce({}); // Mocking User.findOne to return an existing user

        await signup(req, res, next); // Call the signup function

        expect(next).toHaveBeenCalledWith(expect.any(createError)); // Assert the expected behavior
    });
});

// Test suite for the login functionality of the Auth Controller
describe('Auth Controller - login', () => {
    let req, res, next;

    // Setup mock request, response, and next function before each test
    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    // Test successful user login
    it('should login a user and return a token', async () => {
         // Mocking User.findOne to return a user object
        User.findOne.mockResolvedValueOnce({
            _id: '123',
            email: 'test@example.com',
            password: 'hashedPassword',
            active: true,
        });
        // Mocking bcrypt.compare to return true for password comparison
        bcrypt.compare.mockResolvedValueOnce(true);
        jwt.sign.mockReturnValue('token');  // Mocking jwt.sign to return a token

         // Call the login function
        await login(req, res, next);

         // Assert the expected behavior
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, 'hashedPassword');
        expect(jwt.sign).toHaveBeenCalledWith({ _id: '123' }, process.env.SECRET_KEY, { expiresIn: '90d' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 'succes',
            token: 'token',
            user: expect.any(Object),
        }));
    });

    // Test that an error is returned if the password is incorrect
    it('should return an error if the password is incorrect', async () => {
        User.findOne.mockResolvedValueOnce({ // Mocking User.findOne to return a user object
            email: 'test@example.com',
            password: 'hashedPassword',
        });
        // Mocking bcrypt.compare to return false for password comparison
        bcrypt.compare.mockResolvedValueOnce(false);

         // Call the login function
        await login(req, res, next);

        // Assert the expected behavior
        expect(next).toHaveBeenCalledWith(expect.any(createError));
    });

    // Test that an error is returned if the user is not found
    it('should return an error if the user is not found', async () => {
        // Mocking User.findOne to return null, meaning no user found
        User.findOne.mockResolvedValueOnce(null);

        await login(req, res, next); // Call the login function

        expect(next).toHaveBeenCalledWith(expect.any(createError)); // Assert the expected behavior
    });
});
