const initialState = {
  user_id      : 0,
	user_name    : '',
	user_email   : '',
	auth_id      : '',
	auth_picture : '',
	user_bg      : 'https://images.unsplash.com/photo-1473654729523-203e25dfda10?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef5339f6a7615ab9cf6927fcebfdaa77&auto=format&fit=crop&w=1950&q=80',
	color        : '#CCC',
	theme        : 'light'
}

const SET_USER = "SET_USER";

export function setUser(val) {
  return {
    type: SET_USER,
    payload: val
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.payload)

    default:
      return state;
  }
}
