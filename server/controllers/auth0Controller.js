const axios = require('axios')

module.exports = {
  auth: async (req, res) => {
    const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, CLIENT_SECRET } = process.env;

    let payload = {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: `http://${req.headers.host}/auth/callback`
    }

    let resWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
    let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`);
    const db = req.app.get('db');
    let { name, email, sub, picture } = resWithUserData.data
    let foundUser = await db.users.find_user([sub]);

    if (foundUser[0]) {
      console.log('hello');
      req.session.user = foundUser[0];
      res.redirect('/#/')
    } else {
      let createdUser = await db.users.create_user([name, email, sub, picture]);
      req.session.user = createdUser[0];
      res.redirect('/#/');
    }
  },

  user: (req, res) => {
    req.session.user ? res.status(200).send(req.session.user) : null;
  },

  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send('Logged out');
  },

  purge: (req, res) => {
    req.session.destroy();
    const db = req.app.get('db');
    const { user_id } = req.params;

    db.users.purge_user([user_id])
      .then(user => res.status(200).send(user))
      .catch(err => console.log(`Error Message: ${err}`))
  },

  update: (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;
    const { user_bg, color, theme, flavor, compact, collision } = req.body;

    db.users.update_user([user_bg, color, theme, flavor, compact, collision, user_id])
      .then(user => res.status(200).send(user))
      .catch(err => console.log(`Error Message: ${err}`))
  }
}