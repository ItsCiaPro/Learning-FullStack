const express = require("express");
const db = require('../db.js');
const { requireAuth, checkUser } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
   res.redirect(`/home/${res.locals.user.name}`);
});

router.get('/:username', async (req, res) => {
   const username = req.params.username;

   const data = await db.getUserByName(username);

   if (data === null) {
      return res.status(404).send('<h1>User not found</h1>');
   }

   res.locals.isOwner = false;

   if ('isAuthenticated' in res.locals) {
      if (req.params.username.toLowerCase() === res.locals.user.name.toLowerCase()) {
         res.locals.isOwner = true;
      }
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