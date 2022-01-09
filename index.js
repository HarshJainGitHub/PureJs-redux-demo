const redux = require('redux');
const reduxLogger = require('redux-logger')


const createStore = redux.createStore
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware

//action part implemented
// BUY_CAKE IS LIKE A DISPATCH MSG WHICH INFORM REDUCER TO CHANGE DATA FOR THIS ACTION

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

function buyCake () {
    return {
        type:BUY_CAKE,
        info:'first redux action'
    }
};

function buyIceCream() {
    return  {
        type:BUY_ICE_CREAM
    }
}

// reducer part implemented
// REDUCER TAKE 2 ARGS initalState of app and action

// const initalState =  {
//         numOfCakes:10,
//         numOfIceCream:20
// };

const initalCakeState = {
    numOfCakes: 10
};

const initalIceCreamState = {
    numOfIceCream: 20
};


// const reducer = (state = initalState , action ) => {
//     switch(action.type){
//         case 'BUY_CAKE': return {
//             ...state,
//             numOfCakes : state.numOfCakes - 1
//         }
//         case 'BUY_ICE_CREAM' : return {
//             ...state,
//             numOfIceCream : state.numOfIceCream - 1
//         }
//         default: 
//             return state
//     }
// };

const cakeReducer = (state = initalCakeState, action) => {
    switch (action.type) {
        case 'BUY_CAKE': return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default:
            return state
    }
};


const iceCreamReducer = (state = initalIceCreamState, action) => {
    switch (action.type) {
        case 'BUY_ICE_CREAM': return {
            ...state,
            numOfIceCream: state.numOfIceCream - 1
        }
        default:
            return state
    }
};

const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})


// store 
// responsibilites of store
// 1) holds state of app
// 2) allow access to state via getState()
// 3) state to updated via dispatch(action)
// 4) register listeners via subscribe(listener)
// 5) handles unregistering of listeners via the functn returned by subscribe(listener)


const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Intial State of App '+JSON.stringify(store.getState()));
const unsubcribe = store.subscribe( () => console.log('Update State of app '+JSON.stringify(store.getState())));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubcribe();

//logger help to track logs,crash reports and so on