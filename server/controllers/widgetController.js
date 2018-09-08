module.exports = {
  read: (req, res) => {
    const db = req.app.get('db');
    const {user_id} = req.params;

    db.widgets.read_widget([user_id])
    	.then(widget => res.status(200).send(widget))
    	.catch(err => console.log(`Error Message: ${err}`))
  },

	create: (req, res) => {
    const db = req.app.get('db');
    const {user_id} = req.params;
		const {widget_name, x, y, w, h, o1, o2, o3, o4, o5, o6} = req.body;

		db.widgets.create_widget([user_id, widget_name, x, y, w, h, o1, o2, o3, o4, o5, o6])
			.then(widget => res.status(200).send(widget[0]))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	position: (req, res) => {
		const db = req.app.get('db');
		const {master_id} = req.params;
		const {x, y, w, h} = req.body;

		db.widgets.widget_position([x, y, w, h, master_id])
			.then(widget => res.status(200).send(widget))
			.catch(err => console.log(`Error Message: ${err}`))
  },
  
  settings: (req, res) => {
		const db = req.app.get('db');
		const {master_id} = req.params;
		const {o1, o2, o3, o4, o5, o6} = req.body;

		db.widgets.widget_settings([o1, o2, o3, o4, o5, o6, master_id])
			.then(widget => res.status(200).send(widget))
			.catch(err => console.log(`Error Message: ${err}`))
	},

  delete: (req, res) => {
		const db = req.app.get('db');
		const {master_id} = req.params;

		db.widgets.delete_widget([master_id])
			.then(widget => res.status(200).send(widget))
			.catch(err => console.log(`Error Message: ${err}`))
	}
}