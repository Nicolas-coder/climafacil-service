import {Request, Response} from 'express'
import knex from '../database/connection'
var axios = require("axios");

class HgWeatherController {
    async index (request: Request, response: Response) {
      
      // Log info
      console.log('Requisição recebida!');
      
      // Prepare request
      const url: string = 'https://api.hgbrasil.com/weather?key=82c28efe&user_ip=remote';

      // Try catch to treat errors
      try {
        // Make request
        const responseData = await axios.get(url);

        // Log info
        console.log('Requisição no webserver finalizada!');

        // Add log
        const trx = await knex.transaction();

        const log = {
          error: '',
          route: "/temperature",
          description: "Requisição recebida e finalizada com sucesso!"
        };
      
        await trx('logs').insert(log);

        await trx.commit();
        
        // Return
        return response.status(200).json({ message: "Success!", data: responseData.data.results });
      } catch (error) {
        console.log(error);
        // Add log
        const trx = await knex.transaction();

        const log = {
          error: JSON.stringify(error),
          route: "/temperature",
          description: "Requisição falhou!"
        };
      
        await trx('logs').insert(log);

        await trx.commit();
        // Return error
        return response.status(500).json({ message: "Something went wrong!", data: error });
      }
    };
};

export default HgWeatherController;