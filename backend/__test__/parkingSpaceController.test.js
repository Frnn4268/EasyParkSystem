const ParkingSpace = require('../src/models/parkingSpaceModel');
const createError = require('../src/utils/appError');
const parkingSpaceController = require('../src/controllers/parkingSpaceController');

jest.mock('../src/models/parkingSpaceModel');
jest.mock('../src/utils/appError');

describe('Parking Space Controller', () => {
    let req, res, next;

    beforeEach(() => {
        // Initialize request, response, and next objects before each test
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks();
    });

    describe('getAllParkingSpaces', () => {
        it('should return all parking spaces with a 200 status', async () => {
              // Mock data for the test
              const mockParkingSpaces = [{ estado: 'Available' }, { estado: 'Occupied' }];
              ParkingSpace.find.mockResolvedValue(mockParkingSpaces);

              // Call the controller function and verify the results
              await parkingSpaceController.getAllParkingSpaces(req, res, next);

              // Check if find method was called
              expect(ParkingSpace.find).toHaveBeenCalled();
              expect(res.status).toHaveBeenCalledWith(200);
              expect(res.json).toHaveBeenCalledWith({
                  status: 'success',
                  data: mockParkingSpaces
              });
          });

          it('should return a 500 status if an error occurs', async () => {
              // Simulate an error in the model
              ParkingSpace.find.mockRejectedValue(new Error('Test Error'));

              await parkingSpaceController.getAllParkingSpaces(req, res, next);

              expect(next).toHaveBeenCalledWith(new Error('Test Error'));
        });
    });

    describe('createParkingSpace', () => {
        it('should create a new parking space with a 201 status', async () => {
            // Mock data for the test
            const newParkingSpace = { estado: 'Available' };
            ParkingSpace.prototype.save = jest.fn().mockResolvedValue(newParkingSpace); // Ensure the mock returns the correct object
            req.body = { estado: 'Available' };
      
            // Call the controller function and verify the results
            await parkingSpaceController.createParkingSpace(req, res, next);
      
            // Check if save method was called
            expect(ParkingSpace.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Parking space created successfully!',
                data: newParkingSpace
            });
        });

        it('should return a 500 status if an error occurs', async () => {
            // Simulate an error in the model
            ParkingSpace.prototype.save.mockRejectedValue(new Error('Test Error'));
            req.body = { estado: 'Available' };

            await parkingSpaceController.createParkingSpace(req, res, next);

            expect(next).toHaveBeenCalledWith(new Error('Test Error'));
        });
    });

    describe('updateParkingSpace', () => {
        it('should update a parking space with a 200 status', async () => {
          // Mock data for the test
          const updatedParkingSpace = { estado: 'Occupied' };
          ParkingSpace.findByIdAndUpdate.mockResolvedValue(updatedParkingSpace);
          req.params = { id: '123' };
          req.body = { estado: 'Occupied' };

          // Call the controller function and verify the results
          await parkingSpaceController.updateParkingSpace(req, res, next);

          // Check if findByIdAndUpdate method was called
          expect(ParkingSpace.findByIdAndUpdate).toHaveBeenCalledWith('123', { estado: 'Occupied' }, { new: true });
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
              status: 'success',
              message: 'Parking space updated successfully!',
              data: updatedParkingSpace
          });
      });

      it('should return a 404 status if the parking space is not found', async () => {
          // Simulate a not found error
          ParkingSpace.findByIdAndUpdate.mockResolvedValue(null);
          req.params = { id: '123' };
          req.body = { estado: 'Occupied' };

          await parkingSpaceController.updateParkingSpace(req, res, next);

          expect(next).toHaveBeenCalledWith(createError(404, 'Parking space not found'));
      });

      it('should return a 500 status if an error occurs', async () => {
          // Simulate an error in the model
          ParkingSpace.findByIdAndUpdate.mockRejectedValue(new Error('Test Error'));
          req.params = { id: '123' };
          req.body = { estado: 'Occupied' };

          await parkingSpaceController.updateParkingSpace(req, res, next);

          expect(next).toHaveBeenCalledWith(new Error('Test Error'));
        });
    });

    describe('deleteParkingSpace', () => {
        it('should delete a parking space with a 204 status', async () => {
            // Mock data for the test
            const deletedParkingSpace = { estado: 'Available' };
            ParkingSpace.findByIdAndDelete.mockResolvedValue(deletedParkingSpace);
            req.params = { id: '123' };

            // Call the controller function and verify the results
            await parkingSpaceController.deleteParkingSpace(req, res, next);

            // Check if findByIdAndDelete method was called
            expect(ParkingSpace.findByIdAndDelete).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Parking space deleted successfully!',
                data: null
            });
        });

        it('should return a 404 status if the parking space is not found', async () => {
            // Simulate a not found error
            ParkingSpace.findByIdAndDelete.mockResolvedValue(null);
            req.params = { id: '123' };

            await parkingSpaceController.deleteParkingSpace(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Parking space not found'));
        });

        it('should return a 500 status if an error occurs', async () => {
            // Simulate an error in the model
            ParkingSpace.findByIdAndDelete.mockRejectedValue(new Error('Test Error'));
            req.params = { id: '123' };

            await parkingSpaceController.deleteParkingSpace(req, res, next);

            expect(next).toHaveBeenCalledWith(new Error('Test Error'));
        });
    });
});
