import { Router } from "express";
import { bookReservation } from "./book.js";
import { calculateRefund, cancelReservation } from "./cancel.js";
import { employeeBookReservation } from "./employee.js";
import { availableSites, employeeViewAvailableSlots, employeeViewReservationDetails, employeeViewReservations, viewReservations } from "./view.js";

export const reservationsRouter = Router();
export const unauthenticatedReservationRouter = Router();

unauthenticatedReservationRouter.get('/available', availableSites);
unauthenticatedReservationRouter.post('/book', bookReservation);
reservationsRouter.post('/book', bookReservation);
reservationsRouter.get('/view', viewReservations);
reservationsRouter.get('/available', availableSites);
reservationsRouter.get('/employee/reserved', employeeViewReservations);
reservationsRouter.get('/employee/available', employeeViewAvailableSlots);
reservationsRouter.get('/employee/reserved/details', employeeViewReservationDetails);
reservationsRouter.post('/employee/book', employeeBookReservation);
reservationsRouter.post('/cancel', cancelReservation);
reservationsRouter.get('/refund', calculateRefund);
