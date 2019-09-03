import {SET_JSONTABLE, EDIT_VALUE_IN_TABLE, GET_TABLEDATA, DEL_OBJ_IN_TABLE, UP_OBJ_IN_TABLE, DOWN_OBJ_IN_TABLE, LOAD_JSONTABLE, ADD_NEW_OBJ} from '../actions/action';

export const initialState = {
    data:[
        {id:"1", name:"Ira", value:"33.5"},
        {id:"2", name:"Ivan", value:"55"},
        {id:"3", name:"Kolya", value:"44"},
        {id:"4", name:"Lesha", value:"1"}
    ]
};

    let indexArr = '';
    let nameKeyObj =  '';

export function tableReducer(state = initialState, action ) {

    switch (action.type) {
        case GET_TABLEDATA:
            return state
        case SET_JSONTABLE :
            return {...state, data:[...state.data,...action.payload]}
        case EDIT_VALUE_IN_TABLE:
            nameKeyObj = action.payload.name.indexOf('name')?"value":"name";
            indexArr = parseInt(action.payload.name.replace(/\D+/g,""));

            return {...state, data:state.data.map((item, index) => {
                    if(index === indexArr){
                        return{
                            ...item,
                            [nameKeyObj]:action.payload.value
                        }
                    }
                    return item;
                })
            };
        case DEL_OBJ_IN_TABLE: 
            return {...state, data:[...state.data.filter((obj, index) => index !== action.payload)]}

        case LOAD_JSONTABLE:
            return {...state, data:[]}  

        case UP_OBJ_IN_TABLE:
            const newArrUp = objGoUp(state.data, action.payload, action.payload-1)

            function objGoUp(items, firstIndex, secondIndex) {
                const results= items.slice();
                const firstItem = items[firstIndex];
                results[firstIndex] = items[secondIndex];
                results[secondIndex] = firstItem;
            
                return results;
            }

            return (action.payload > 0)?{...state, data:[...newArrUp]}:state;
        case  ADD_NEW_OBJ:
            return {...state, data:[...state.data, {id:action.payload, name:"", value:""}]}

        case DOWN_OBJ_IN_TABLE:
            const newArrDown = objGoDown(state.data, action.payload, action.payload+1)

            function objGoDown(items, firstIndex, secondIndex) {
                const results= items.slice();
                const firstItem = items[firstIndex];
                results[firstIndex] = items[secondIndex];
                results[secondIndex] = firstItem;
            
                return results;
            }
            return (action.payload+1 < state.data.length)?{...state, data:[...newArrDown]}:state; 

        default:
            return state
    }
}