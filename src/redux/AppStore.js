import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {User} from './userStore';
import {Dishes} from './dishesStore';
import {Promotions} from './promotionsStore';
import {Leaders} from './leadersStore';

export const AppStore = () => {

    const store = createStore(
       
        combineReducers({
            user:User,
            dishes: Dishes,
            promotions: Promotions,
            leaders: Leaders
            }
        ),
        applyMiddleware(thunk, logger)
    );
    return store;
}





