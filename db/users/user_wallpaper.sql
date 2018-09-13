UPDATE users
SET	user_bg=$1,
		color=$2
WHERE user_id=$3;