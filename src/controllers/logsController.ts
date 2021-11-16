import {Request, Response} from 'express'
import knex from '../database/connection'

class LogsController {
    async index(request: Request, response: Response){

        const logs = await knex('logs')
            .select('logs.*')

        return response.json(logs);
    };
};

export default LogsController;