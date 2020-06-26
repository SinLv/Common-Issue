/**
 * redux中间件，将action包装成promise对象，在组件中可对其执行后的结果可控
 */
function createThunkMiddleware (extraArgument) {
    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            return new Promise((resolve, reject) => {
                action(dispatch, getState, resolve, reject, extraArgument);
            })
        }

        return next(action);
    }
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;