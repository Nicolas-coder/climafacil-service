import express, { request, response } from 'express'

import LogsController from './controllers/logsController';
import ClimaTempoController from './controllers/climaTempoController';
import HgWeatherController from './controllers/hgWeatherController';

const routes = express.Router();

const logsController = new LogsController();
const climaTempoController = new ClimaTempoController();
const hgWeatherController = new HgWeatherController();

routes.get('/clima-tempo', climaTempoController.index);
routes.get('/temperature', hgWeatherController.index);
routes.get('/logs', logsController.index)

export default routes;