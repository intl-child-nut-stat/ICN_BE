const db = require('../data/dbConfig.js');

const {insert} = require("../routers/country.js");


describe('country', () => {
   

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
      });

      describe('insert()', () => {
        it('should insert country', async () => {
          await ({ country: 'usa' });
          await ({ country: 'uk' });
    
          const country = await db('country');
    
          expect(country).toHaveLength(0);
        });
    
        it('should insert the provided delete', async () => {
          let country = { country: 'france' };
          let inserted = await (country);
          expect(inserted.country).toBe(country.country);
    
          country = { country: 'Spain' };
          inserted = await (country);
          expect(inserted.country).toBe(country.country);
        });
      });
    });

     
    
