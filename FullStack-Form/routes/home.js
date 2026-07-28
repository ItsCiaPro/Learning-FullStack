const express = require("express");
const db = require('../db.js');

const router = express.Router();

router.get('/:username', async (req, res) => {
   const username = req.params.username;

   const data = await db.getUserByName(username);

   if (data === null) {
      return res.redirect('/');
   }

   res.render('main',
      {
         username: data['name'],
         email: data['email'],
         user_type: data['account_type'],
      }
   );
})

module.exports = router;