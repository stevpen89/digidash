DROP TABLE master;
DROP TABLE users;



CREATE TABLE users (
	user_id       SERIAL PRIMARY KEY,
	user_name   	VARCHAR(100),
	user_email   	VARCHAR(100),
	auth_id       TEXT,
	auth_picture  TEXT,
	user_bg				TEXT DEFAULT 'https://images.unsplash.com/photo-1536130371825-ac75012d9b24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c1c97eb0f52f1174d7a8281dd8348828&auto=format&fit=crop&w=1050&q=80',
	color					TEXT DEFAULT '115, 164, 191',
	theme					TEXT DEFAULT 'dark',
	flavor				TEXT DEFAULT 'modern',
	compact				BOOLEAN DEFAULT true,
	collision			BOOLEAN DEFAULT false
);

INSERT INTO users (user_name, user_email, auth_id, auth_picture, user_bg, color, theme, flavor, compact, collision)
VALUES ('Taryn Ficklin', 'tarynficklin@gmail.com', 'google-oauth2|100800992512531079080', 'https://lh4.googleusercontent.com/-xeeCTQ3xyYw/AAAAAAAAAAI/AAAAAAAAAHM/59818DJojEk/photo.jpg', 'http://unsplash.com', '#CCC', 'light', 'modern', true, false);

select * from users;



CREATE TABLE master (
	master_id		SERIAL PRIMARY KEY,
	user_id			VARCHAR(100),
	widget_name	VARCHAR(100),
	x						INTEGER,
	y						INTEGER,
	w						INTEGER,
	h						INTEGER,
	o1					TEXT DEFAULT NULL,
	o2					TEXT DEFAULT NULL,
	o3					TEXT DEFAULT NULL,
	o4					TEXT DEFAULT NULL,
	o5					TEXT DEFAULT NULL,
	o6					TEXT DEFAULT NULL
);

INSERT INTO master (user_id, widget_name, x, y, w, h)
VALUES (2, 'Search', 5, 0, 18, 4);

INSERT INTO master (user_id, widget_name, x, y, w, h)
VALUES (2, 'Dictionary', 10, 4, 8, 20);

INSERT INTO master (user_id, widget_name, x, y, w, h)
VALUES (2, 'Weather', 5, 24, 13, 26);

INSERT INTO master (user_id, widget_name, x, y, w, h, o1)
VALUES (2, 'Clock', 18, 4, 5, 20, 'true');

INSERT INTO master (user_id, widget_name, x, y, w, h)
VALUES (2, 'Calculator', 18, 24, 5, 26);

INSERT INTO master (user_id, widget_name, x, y, w, h)
VALUES (2, 'Note', 5, 4, 5, 20);

select * from master;