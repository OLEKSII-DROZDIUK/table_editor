export const ping = store => next => action => {
    console.log('ping', action);
    return next (action)
};