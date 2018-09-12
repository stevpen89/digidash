const initialState = {
  user_id      : 2,
  user_name    : 'Roger Williams',
  user_email   : '',
  auth_id      : '',
  auth_picture : '',
  user_bg      : 'https://images.unsplash.com/photo-1536130371825-ac75012d9b24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c1c97eb0f52f1174d7a8281dd8348828&auto=format&fit=crop&w=1050&q=80',
  color        : '115, 164, 191',
  theme        : 'light',
  flavor       : 'modern',
  search       : true,
  compact      : true,
  collision    : false    
}

const SET_USER      = "SET_USER";
const SET_THEME     = "SET_THEME";
const SET_FLAVOR    = "SET_FLAVOR";
const SET_SEARCH    = "SET_SEARCH";
const SET_COLLISION = "SET_COLLISION";
const SET_COMPACT   = "SET_COMPACT";

export function setUser(val)         {return {type: SET_USER,      payload: val}}
export function setTheme(val)        {return {type: SET_THEME,     payload: val}}
export function setFlavor(val)       {return {type: SET_FLAVOR,    payload: val}}
export function setSearch(val)       {return {type: SET_SEARCH,    payload: val}}
export function setCollision(val)    {return {type: SET_COLLISION, payload: val}}
export function setCompact(val)      {return {type: SET_COMPACT,   payload: val}}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER       : return Object.assign({}, state, action.payload)
    case SET_THEME      : return Object.assign({}, state, {theme     : action.payload})
    case SET_FLAVOR     : return Object.assign({}, state, {flavor    : action.payload})
    case SET_SEARCH     : return Object.assign({}, state, {search    : !state.search})
    case SET_COLLISION  : return Object.assign({}, state, {collision : !state.collision})
    case SET_COMPACT    : return Object.assign({}, state, {compact   : !state.compact})
    default             : return state;
  }
}

// case PULL_TABLE_U: return Object.assign({},state,{flavor: action.payload})