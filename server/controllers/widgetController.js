module.exports = {
  read: (req, res) => {
    const db = req.app.get('db');

    db.widgets.read_widget()
    	.then(user => res.status(200).send(user))
    	.catch(err => console.log(`Error Message: ${err}`))
  }
}