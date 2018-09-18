UPDATE users
SET	user_bg   = $1,
		color     = $2,
		theme     = $3,
		flavor    = $4,
		compact   = $5,
		collision = $6
WHERE user_id = $7;