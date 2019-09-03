import idGeneratorHelper from '../helpers/idGeneratorHelper';

export const SET_JSONTABLE = 'SET_JSONTABLE';
export const LOAD_JSONTABLE = 'LOAD_JSONTABLE';
export const EDIT_VALUE_IN_TABLE = 'EDIT_VALUE_IN_TABLE';
export const GET_TABLEDATA = 'GET_TABLEDATA';
export const DEL_OBJ_IN_TABLE = 'DEL_OBJ_IN_TABLE';
export const UP_OBJ_IN_TABLE = 'UP_OBJ_IN_TABLE';
export const DOWN_OBJ_IN_TABLE = 'DOWN_OBJ_IN_TABLE';
export const ADD_NEW_OBJ = 'ADD_NEW_OBJ';

export function setJsonTable(dataJson){
    return dispatch => {
        dispatch({
            type: LOAD_JSONTABLE,
        });

        dispatch({
            type: SET_JSONTABLE,
            payload:dataJson
        });
    }
}

export function changeTableValue (name, value) {

    return dispatch => {
        dispatch({
            type: EDIT_VALUE_IN_TABLE,
            payload: {name, value}
        });
    }
}

export function getStoreTableData(){

    return dispatch => {
        dispatch({
            type: GET_TABLEDATA
        });
    }
}

export function delObjInStore(index) {

    return dispatch => {
        dispatch({
            type:DEL_OBJ_IN_TABLE,
            payload: Number(index)
        })
    }
}

export function downObjInStore(index) {
    return dispatch => {
        dispatch({
            type:DOWN_OBJ_IN_TABLE,
            payload: Number(index)
        })
    }
}

export function upObjInStore(index) {
    return dispatch => {
        dispatch({
            type:UP_OBJ_IN_TABLE,
            payload: Number(index)
        })
    }   
}

export function addNewObj () {
    
    return dispatch => {
        dispatch({
            type:ADD_NEW_OBJ,
            payload: idGeneratorHelper()
        })
    }
}

