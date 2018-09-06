const initialState = {
  user_id      : 0,
	user_name    : '',
	user_email   : '',
	auth_id      : '',
	auth_picture : '',
	user_bg      : 'https://images.unsplash.com/photo-1536130371825-ac75012d9b24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c1c97eb0f52f1174d7a8281dd8348828&auto=format&fit=crop&w=1050&q=80',
	color        : '115, 164, 191',
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
