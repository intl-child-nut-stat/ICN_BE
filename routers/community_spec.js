const db = require('../data/dbConfig.js');

const {insert} = require("../routers/community.js");


describe('community', () => {


    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
      });

      describe('insert()', () => {
        it('should insert community', async () => {
          await ({ community: 'dharan' });
          await ({ community: 'butwal' });
    
          const community = await db('cmmunity');
    
          expect(community).toHaveLength(0);
        });
    });
    


});
