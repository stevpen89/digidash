const initialState = {
  user_id: 0,      
	user_name: '',
	user_email: '',
	auth_id:'',       
	auth_picture: '',  
	user_bg: '',		
	color:'',		
	theme:''
}



const SET_USER = 'SET_USER';


export const setUser = (val) => ({
  type: SET_USER,
  payload: payload
})


export default function reducer(state=initialState,action){
  switch (action.type){
    case SET_USER:
      return Object.assign({}, state, action.payload)
    
    default:
      return state;
    

}
}