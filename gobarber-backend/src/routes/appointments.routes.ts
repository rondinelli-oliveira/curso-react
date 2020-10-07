import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateApponitmentService from '../services/CreateAppointmentService';

import ensureAuthtenticated from '../middlewares/ensureAutheticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthtenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateApponitmentService();

  const appointment = await createAppointment.execute({
    date: parseDate,
    providerId,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
