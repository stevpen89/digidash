UPDATE users
SET	user_bg=$1,
		color=$2,
		theme=$3
WHERE user_id=$4;