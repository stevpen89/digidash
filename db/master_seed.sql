-- IF WE NEED TO GIVE IT MORE OPTION VALUES, EDIT THE FOLLOWING TABLES:
-- Table master, get widgets, edit widget settings

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

INSERT INTO users (user_id, user_name, user_email, auth_id, auth_picture, user_bg, color, theme)
VALUES (1, 'Taryn Ficklin', 'tarynficklin@gmail.com', 'google-oauth2|100800992512531079080', 'https://lh4.googleusercontent.com/-xeeCTQ3xyYw/AAAAAAAAAAI/AAAAAAAAAHM/59818DJojEk/photo.jpg', 'http://unsplash.com', '#CCC', 'light');

INSERT INTO users (user_id, user_name, user_email, auth_id, auth_picture, user_bg, color, theme)
VALUES (2, 'Taryn Ficklin', 'clayf700@gmail.com', 'google-oauth2|115352869833705350314', 'https://lh4.googleusercontent.com/-WtSvKjFYiXM/AAAAAAAAAAI/AAAAAAAAAHc/fXzUoy8H42A/photo.jpg', 'http://unsplash.com', '#CCC', 'light');

INSERT INTO users (user_id, user_name, user_email, auth_id, auth_picture, user_bg, color, theme)
VALUES (3, 'TarynFicklin@gmail.com', 'TarynFicklin@gmail.com', 'github|38847691', 'https://avatars2.githubusercontent.com/u/38847691?v=4', 'http://unsplash.com', '#CCC', 'light');

INSERT INTO users (user_id, user_name, user_email, auth_id, auth_picture, user_bg, color, theme)
VALUES (4, 'Taryn Ficklin', 'clayf700@gmail.com', 'facebook|1346171328848139', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1346171328848139&height=50&width=50&ext=1536190305&hash=AeTPNLQ9xlGCTpxU', 'http://unsplash.com', '#CCC', 'light');

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