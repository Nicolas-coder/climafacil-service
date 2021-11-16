import {Request, Response} from 'express'
import knex from '../database/connection'
var axios = require("axios");

class ClimaTempoController {
    async index (request: Request, response: Response) {

      // Log info
      console.log('Requisição recebida!');
      
      // Prepare request
      const url: string = 'http://apiadvisor.climatempo.com.br/api/v1/anl/synoptic/locale/BR?token=ff51004023744404fd344c4c132cfd19';

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
          route: "/clima-tempo",
          description: "Requisição recebida e finalizada com sucesso!"
        };
      
        await trx('logs').insert(log);

        await trx.commit();
        
        // Return
        return response.status(200).json({ message: "Success!", data: responseData.data[0] });
      } catch (error) {
        console.log(error);
        // Add log
        const trx = await knex.transaction();

        const log = {
          error: JSON.stringify(error),
          route: "/clima-tempo",
          description: "Requisição falhou!"
        };
      
        await trx('logs').insert(log);

        await trx.commit();
        // Return error
        return response.status(500).json({ message: "Something went wrong!", data: error });
      }
    };
};

export default ClimaTempoController;