DROP TABLE widgets;
DROP TABLE master;
DROP TABLE users;



CREATE TABLE users (
	user_id       SERIAL PRIMARY KEY,
	user_name   	VARCHAR(100),
	user_email   	VARCHAR(100),
	auth_id       TEXT,
	auth_picture  TEXT,
	user_bg				TEXT,
	color					TEXT DEFAULT '#CCC',
	theme					TEXT DEFAULT 'light'
);

INSERT INTO users (user_name, user_email, auth_id, auth_picture, user_bg, color, theme)
VALUES ('Taryn Ficklin', 'tarynficklin@gmail.com', 'google-oauth2|100800992512531079080', 'https://lh4.googleusercontent.com/-xeeCTQ3xyYw/AAAAAAAAAAI/AAAAAAAAAHM/59818DJojEk/photo.jpg', 'http://unsplash.com', '#CCC', 'light');

select * from users;



CREATE TABLE master (
	master_id	SERIAL PRIMARY KEY,
	user_id		VARCHAR(100),
	widget_id	VARCHAR(100),
	x					INTEGER,
	y					INTEGER,
	w					INTEGER,
	h					INTEGER,
	o1				TEXT DEFAULT NULL,
	o2				TEXT DEFAULT NULL,
	o3				TEXT DEFAULT NULL,
	o4				TEXT DEFAULT NULL,
	o5				TEXT DEFAULT NULL,
	o6				TEXT DEFAULT NULL
);

INSERT INTO master (user_id, widget_id, x, y, w, h)
VALUES (1, 1, 0, 0, 0, 0);

select * from master;



CREATE TABLE widgets (
	widget_id	SERIAL PRIMARY KEY,
	name			TEXT
);

INSERT INTO widgets (widget_id, name)
VALUES (1, 'search');

INSERT INTO widgets (widget_id, name)
VALUES (2, 'dictionary');

INSERT INTO widgets (widget_id, name)
VALUES (3, 'note');

INSERT INTO widgets (widget_id, name)
VALUES (4, 'clock');

INSERT INTO widgets (widget_id, name)
VALUES (5, 'weather');

select * from widgets;