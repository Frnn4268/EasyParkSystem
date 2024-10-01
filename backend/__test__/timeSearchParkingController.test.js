const {
  getAllTimeSearchParking,
  getLastTimeSearchParking,
  createTimeSearchParking,
  updateTimeSearchParking,
  deleteTimeSearchParking
} = require('../src/controllers/timeSearchParkingController');
const TimeSearchParking = require('../src/models/timeSearchParkingModel');
const createError = require('../src/utils/appError');

jest.mock('../src/models/timeSearchParkingModel');
jest.mock('../src/utils/appError');

describe('TimeSearchParking Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: { id: 'someId' }, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('getAllTimeSearchParking', () => {
        it('should return all time search parking records', async () => {
            const mockData = [{ id: 1 }, { id: 2 }];
            TimeSearchParking.find.mockResolvedValue(mockData);

            await getAllTimeSearchParking(req, res, next);

            expect(TimeSearchParking.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: mockData
            });
        });

        it('should call next with an error if there is an exception', async () => {
            const error = new Error('Something went wrong');
            TimeSearchParking.find.mockRejectedValue(error);

            await getAllTimeSearchParking(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getLastTimeSearchParking', () => {
        it('should return the last created time search parking ID', async () => {
            const mockData = { _id: 'someId' };
            TimeSearchParking.findOne.mockImplementation(() => ({
                sort: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockData)
            }));

            await getLastTimeSearchParking(req, res, next);

            expect(TimeSearchParking.findOne).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: mockData.data
            });
        });

        // it('should return 404 if no records are found', async () => {
        //     TimeSearchParking.findOne.mockImplementation(() => ({
        //         sort: jest.fn().mockReturnThis(),
        //         exec: jest.fn().mockResolvedValue(null)
        //     }));
        
        //     await getLastTimeSearchParking(req, res, next);
        
        //     expect(res.status).toHaveBeenCalledWith(404);
        //     expect(res.json).toHaveBeenCalledWith({
        //         status: 'success',
        //         message: 'No se encontraron registros de búsqueda de estacionamiento',
        //         data: null
        //     });
        // });

        // it('should call next with an error if there is an exception', async () => {
        //     const error = new Error('Something went wrong');
        //     TimeSearchParking.findOne.mockImplementation(() => ({
        //         sort: jest.fn().mockReturnThis(),
        //         exec: jest.fn().mockRejectedValue(error)
        //     }));

        //     await getLastTimeSearchParking(req, res, next);

        //     expect(next).toHaveBeenCalledWith(error);
        // });
    });

    describe('createTimeSearchParking', () => {
        it('should create a new time search parking record', async () => {
            const mockData = { id: 'newId' };
            TimeSearchParking.create.mockResolvedValue(mockData);

            await createTimeSearchParking(req, res, next);

            expect(TimeSearchParking.create).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: mockData
            });
        });

        it('should call next with an error if there is an exception', async () => {
            const error = new Error('Something went wrong');
            TimeSearchParking.create.mockRejectedValue(error);

            await createTimeSearchParking(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateTimeSearchParking', () => {
        it('should update a time search parking record', async () => {
            const mockData = { _id: 'someId', hour_date_entry: new Date(), hour_date_output: null };
            TimeSearchParking.findById.mockResolvedValue(mockData);
            mockData.save = jest.fn().mockResolvedValue(mockData);

            await updateTimeSearchParking(req, res, next);

            expect(TimeSearchParking.findById).toHaveBeenCalledWith('someId');
            expect(mockData.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: mockData
            });
        });

        it('should return 404 if the record is not found', async () => {
            TimeSearchParking.findById.mockResolvedValue(null);

            await updateTimeSearchParking(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Registro de búsqueda de estacionamiento no encontrado'));
        });

        it('should return 400 if the record has already been updated', async () => {
            const mockData = { _id: 'someId', hour_date_entry: new Date(), hour_date_output: new Date() };
            TimeSearchParking.findById.mockResolvedValue(mockData);

            await updateTimeSearchParking(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(400, 'El registro de búsqueda de estacionamiento ya ha sido actualizado'));
        });

        it('should call next with an error if there is an exception', async () => {
            const error = new Error('Something went wrong');
            TimeSearchParking.findById.mockRejectedValue(error);

            await updateTimeSearchParking(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteTimeSearchParking', () => {
        it('should delete a time search parking record', async () => {
            const mockData = { _id: 'someId' };
            TimeSearchParking.findByIdAndDelete.mockResolvedValue(mockData);

            await deleteTimeSearchParking(req, res, next);

            expect(TimeSearchParking.findByIdAndDelete).toHaveBeenCalledWith('someId');
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Time search parking deleted successfully',
                data: null
            });
        });

        it('should return 404 if the record is not found', async () => {
            TimeSearchParking.findByIdAndDelete.mockResolvedValue(null);

            await deleteTimeSearchParking(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Time search parking not found'));
        });

        it('should call next with an error if there is an exception', async () => {
            const error = new Error('Something went wrong');
            TimeSearchParking.findByIdAndDelete.mockRejectedValue(error);

            await deleteTimeSearchParking(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});