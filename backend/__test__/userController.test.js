const User = require('../src/models/userModel');
const createError = require('../src/utils/appError');
const userController = require('../src/controllers/userController');

// Mocking the necessary models and utilities
jest.mock('../src/models/userModel');
jest.mock('../src/utils/appError');

describe('User Controller', () => {
  let req, res, next;

  // Setup mock objects before each test
  beforeEach(() => {
    req = { params: {}, body: {} }; // Mock request object
    res = {
      status: jest.fn().mockReturnThis(), // Mock response object with status method
      json: jest.fn() // Mock response object with json method
    };
    next = jest.fn(); // Mock next function
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users with a 200 status', async () => {
      // Mock data for successful response
      const mockUsers = [
        { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', active: true },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', active: false }
      ];
      User.find.mockResolvedValue(mockUsers); // Mock User.find to return mockUsers

      await userController.getAllUsers(req, res, next); // Call the controller method

      expect(User.find).toHaveBeenCalled(); // Ensure User.find was called
      expect(res.status).toHaveBeenCalledWith(200); // Check status code
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockUsers
      }); // Check response data
    });

    it('should call next with an error if one occurs', async () => {
      // Mock error for rejection
      const error = new Error('Test Error');
      User.find.mockRejectedValue(error); // Mock User.find to throw an error

      await userController.getAllUsers(req, res, next); // Call the controller method

      expect(next).toHaveBeenCalledWith(error); // Ensure next was called with the error
    });
  });

  describe('createUser', () => {
    it('should create a new user and return a 201 status', async () => {
      // Mock data for successful creation
      const mockUser = { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', active: true };
      req.body = { name: 'John Doe', email: 'john@example.com', role: 'admin', password: 'password123', active: true };

      User.prototype.save.mockResolvedValue(mockUser); // Mock save method to return mockUser

      await userController.createUser(req, res, next); // Call the controller method

      expect(User.prototype.save).toHaveBeenCalled(); // Ensure save method was called
      expect(res.status).toHaveBeenCalledWith(201); // Check status code
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'User created successfully!',
        data: mockUser
      }); // Check response data
    });

    it('should call next with an error if one occurs', async () => {
      // Mock error for rejection
      const error = new Error('Test Error');
      User.prototype.save.mockRejectedValue(error); // Mock save method to throw an error

      await userController.createUser(req, res, next); // Call the controller method

      expect(next).toHaveBeenCalledWith(error); // Ensure next was called with the error
    });
  });

  describe('updateUser', () => {
    it('should update a user and return a 200 status with the updated user', async () => {
      // Mock data for successful update
      const mockUser = { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', active: true };
      req.params.id = '1';
      req.body = { name: 'John Doe', email: 'john@example.com', role: 'admin', password: 'newpassword123', active: true };

      User.findByIdAndUpdate.mockResolvedValue(mockUser); // Mock findByIdAndUpdate to return mockUser

      await userController.updateUser(req, res, next); // Call the controller method

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { name: 'John Doe', email: 'john@example.com', role: 'admin', password: 'newpassword123', active: true },
        { new: true }
      ); // Ensure findByIdAndUpdate was called with the correct arguments
      expect(res.status).toHaveBeenCalledWith(200); // Check status code
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'User updated successfully!',
        data: mockUser
      }); // Check response data
    });

    it('should call next with a 404 error if the user is not found', async () => {
      // Mock non-existing user
      req.params.id = 'nonexistent-id';
      User.findByIdAndUpdate.mockResolvedValue(null); // Mock findByIdAndUpdate to return null

      await userController.updateUser(req, res, next); // Call the controller method

      expect(createError).toHaveBeenCalledWith(404, 'User not found'); // Ensure createError was called
      expect(next).toHaveBeenCalledWith(expect.any(Error)); // Ensure next was called with the error
    });

    it('should call next with an error if one occurs', async () => {
      // Mock error for rejection
      const error = new Error('Test Error');
      User.findByIdAndUpdate.mockRejectedValue(error); // Mock findByIdAndUpdate to throw an error

      await userController.updateUser(req, res, next); // Call the controller method

      expect(next).toHaveBeenCalledWith(error); // Ensure next was called with the error
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return a 204 status', async () => {
      // Mock data for successful deletion
      req.params.id = '1';
      User.findByIdAndDelete.mockResolvedValue(true); // Mock findByIdAndDelete to return true

      await userController.deleteUser(req, res, next); // Call the controller method

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1'); // Ensure findByIdAndDelete was called with the correct ID
      expect(res.status).toHaveBeenCalledWith(204); // Check status code
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'User deleted successfully!',
        data: null
      }); // Check response data
    });

    it('should call next with a 404 error if the user is not found', async () => {
      // Mock non-existing user
      req.params.id = 'nonexistent-id';
      User.findByIdAndDelete.mockResolvedValue(null); // Mock findByIdAndDelete to return null

      await userController.deleteUser(req, res, next); // Call the controller method

      expect(createError).toHaveBeenCalledWith(404, 'User not found'); // Ensure createError was called
      expect(next).toHaveBeenCalledWith(expect.any(Error)); // Ensure next was called with the error
    });

    it('should call next with an error if one occurs', async () => {
      // Mock error for rejection
      const error = new Error('Test Error');
      User.findByIdAndDelete.mockRejectedValue(error); // Mock findByIdAndDelete to throw an error

      await userController.deleteUser(req, res, next); // Call the controller method

      expect(next).toHaveBeenCalledWith(error); // Ensure next was called with the error
    });
  });
});
