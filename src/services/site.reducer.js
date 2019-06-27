import initial from '@/services/site.initial'

export default (state = initial, action) => {
  switch (action.type) {
    case 'LOADED_OPTIONS':
      return {
        ...state,
        options: action.payload
      }
    case 'LOADED_MENUS':
      return {
      	...state,
      	menus: action.payload
      }
    case 'LOADED_WIDGETS':
      return {
      	...state,
      	widgets: action.payload
      }
    default:
      return {...state}
  }
}
