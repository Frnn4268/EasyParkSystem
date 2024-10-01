const {
  getAllTimeSearchParking,
  getLastTimeSearchParking,
  createTimeSearchParking,
  updateTimeSearchParking,
  deleteTimeSearchParking,
} = require("../src/controllers/timeSearchParkingController");
const TimeSearchParking = require("../src/models/timeSearchParkingModel");
const createError = require("../src/utils/appError");

jest.mock("../src/models/timeSearchParkingModel");
jest.mock("../src/utils/appError");

// Test suite for the Time Search Parking Controller
describe("timeSearchParkingController Unit Testing - Time Search Parking Controller", () => {
    let req, res, next;

    // Initialize the req, res, and next objects before each test
    beforeEach(() => {
        req = { params: { id: "someId" }, body: {} };
        res = {
        status: jest.fn().mockReturnThis(), // Mock the status method to allow chaining
        json: jest.fn(), // Mock the json method to verify responses
        };
        next = jest.fn(); // Mock the next function to verify error handling
    });

    // Test suite for getAllTimeSearchParking function
    describe("timeSearchParkingController - getAllTimeSearchParking", () => {
        // Test successful retrieval of all time search parking records
        it("should return all time search parking records", async () => {
            const mockData = [{ id: 1 }, { id: 2 }];
            TimeSearchParking.find.mockResolvedValue(mockData);

            await getAllTimeSearchParking(req, res, next);

            // Verify that the find method is called
            expect(TimeSearchParking.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: mockData,
            });
        });

        // Test error handling during retrieval of all time search parking records
        it("should call next with an error if there is an exception", async () => {
            const error = new Error("Something went wrong");
            TimeSearchParking.find.mockRejectedValue(error);

            await getAllTimeSearchParking(req, res, next);

            // Verify that the next function is called with the error
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    // Test suite for getLastTimeSearchParking function
    describe("timeSearchParkingController - getLastTimeSearchParking", () => {
        // Test successful retrieval of the last created time search parking ID
        it('should return the last created time search parking ID', async () => {
            const mockData = { _id: 'someId' };
            TimeSearchParking.findOne.mockImplementation(() => ({
                sort: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockData)
            }));

            await getLastTimeSearchParking(req, res, next);

            // Verify that the findOne method is called
            expect(TimeSearchParking.findOne).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: mockData.data
            });
        });

        // Uncomment the following tests if needed

        // Test handling of no records found
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

        // Test error handling during retrieval of the last created time search parking ID
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

    // Test suite for createTimeSearchParking function
    describe("timeSearchParkingController - createTimeSearchParking", () => {
        // Test successful creation of a new time search parking record
        it("should create a new time search parking record", async () => {
            const mockData = { id: "newId" };
            TimeSearchParking.create.mockResolvedValue(mockData);

            await createTimeSearchParking(req, res, next);

            // Verify that the create method is called
            expect(TimeSearchParking.create).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: mockData,
            });
        });

        // Test error handling during creation of a new time search parking record
        it("should call next with an error if there is an exception", async () => {
            const error = new Error("Something went wrong");
            TimeSearchParking.create.mockRejectedValue(error);

            await createTimeSearchParking(req, res, next);

            // Verify that the next function is called with the error
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    // Test suite for updateTimeSearchParking function
    describe("timeSearchParkingController - updateTimeSearchParking", () => {
        // Test successful update of a time search parking record
        it("should update a time search parking record", async () => {
            const mockData = {
                _id: "someId",
                hour_date_entry: new Date(),
                hour_date_output: null,
            };
            TimeSearchParking.findById.mockResolvedValue(mockData);
            mockData.save = jest.fn().mockResolvedValue(mockData);

            await updateTimeSearchParking(req, res, next);

            // Verify that the findById method is called with the correct ID
            expect(TimeSearchParking.findById).toHaveBeenCalledWith("someId");
            expect(mockData.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: mockData,
            });
        });

        // Test handling of record not found during update
        it("should return 404 if the record is not found", async () => {
            TimeSearchParking.findById.mockResolvedValue(null);

            await updateTimeSearchParking(req, res, next);

            // Verify that the next function is called with a 404 error
            expect(next).toHaveBeenCalledWith(
                createError(
                404,
                "Registro de búsqueda de estacionamiento no encontrado"
                )
            );
        });

        // Test handling of record already updated
        it("should return 400 if the record has already been updated", async () => {
            const mockData = {
                _id: "someId",
                hour_date_entry: new Date(),
                hour_date_output: new Date(),
            };
            TimeSearchParking.findById.mockResolvedValue(mockData);

            await updateTimeSearchParking(req, res, next);

            // Verify that the next function is called with a 400 error
            expect(next).toHaveBeenCalledWith(
                createError(
                400,
                "El registro de búsqueda de estacionamiento ya ha sido actualizado"
                )
            );
        });

        // Test error handling during update of a time search parking record
        it("should call next with an error if there is an exception", async () => {
            const error = new Error("Something went wrong");
            TimeSearchParking.findById.mockRejectedValue(error);

            await updateTimeSearchParking(req, res, next);

            // Verify that the next function is called with the error
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    // Test suite for deleteTimeSearchParking function
    describe("timeSearchParkingController - deleteTimeSearchParking", () => {
        // Test successful deletion of a time search parking record
        it("should delete a time search parking record", async () => {
            const mockData = { _id: "someId" };
            TimeSearchParking.findByIdAndDelete.mockResolvedValue(mockData);

            await deleteTimeSearchParking(req, res, next);

            // Verify that the findByIdAndDelete method is called with the correct ID
            expect(TimeSearchParking.findByIdAndDelete).toHaveBeenCalledWith(
                "someId"
            );
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                message: "Time search parking deleted successfully",
                data: null,
            });
        });

        // Test handling of record not found during deletion
        it("should return 404 if the record is not found", async () => {
            TimeSearchParking.findByIdAndDelete.mockResolvedValue(null);

            await deleteTimeSearchParking(req, res, next);

            // Verify that the next function is called with a 404 error
            expect(next).toHaveBeenCalledWith(
                createError(404, "Time search parking not found")
            );
        });

        // Test error handling during deletion of a time search parking record
        it("should call next with an error if there is an exception", async () => {
            const error = new Error("Something went wrong");
            TimeSearchParking.findByIdAndDelete.mockRejectedValue(error);

            await deleteTimeSearchParking(req, res, next);

            // Verify that the next function is called with the error
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});