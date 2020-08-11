import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';
import {authHeader} from '../shared/auth-header';

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response =>
        {
            if(response.ok)
            {
                return response;
            }
            else{
                var error = new Error('Error  '+ response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading(true));
    return fetch(baseUrl + 'promotions')
    .then(response =>
        {
            if(response.ok)
            {
                return response;
            }
            else{
                var error = new Error('Error  '+ response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading(true));
    return fetch(baseUrl + 'leaders')
    .then(response =>
        {
            if(response.ok)
            {
                return response;
            }
            else{
                var error = new Error('Error  '+ response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess

});

export const addDishes = (dishes) => ({
    type: ActionTypes.LOAD_DISHES,
    payload: dishes
});

export const updateDish = (dish) => ({
    type: ActionTypes.UPDATE_DISHES,
    payload: dish
});


export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess

});

export const addPromos = (promos) => ({
    type: ActionTypes.LOAD_PROMOS,
    payload: promos
});

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess

});

export const addLeaders = (promos) => ({
    type: ActionTypes.LOAD_LEADERS,
    payload: promos
});

export const register = (username, password, firstname, lastname, email) => (dispatch) => {
    console.log('77777777777777777777777777')
    const newuser = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        email:email
    };
    
    const fetchUrl = baseUrl+'users/signup';

    return fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: {
          "Content-Type": "application/json",
        }
        
    })
    .then(response => {
        if (response.ok) {
          return response;

        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .catch(error => {
        console.log(error);
        dispatch(registerFailed(error.message))});
};

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user

});

export const registerFailed = (errMess) => ({
    type: ActionTypes.REGISTER_FAILED,
    payload: errMess

});

export const login = (username, password) => (dispatch) => {

    const request = {
        method: "POST",
        body:JSON.stringify({username:username, password:password}),
        headers: {
          "Content-Type": "application/json"
        }
    }
    
    const fetchUrl = baseUrl+'users/login';

    return fetch(fetchUrl, request)
    .then(response => {
        if (response.ok || response.status===200 || response.status===204) {
        
          return response;

        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(user => {

        localStorage.setItem('user', JSON.stringify(user));
        dispatch(addUser(user))
    })
    .catch(error => {
        console.log(error.message);

        dispatch(loginFailed(error.message));
    });
};

export const loginFailed = (errMess) => ({
    
    type: ActionTypes.LOGIN_FAILED,
    payload: errMess

});

export const logout = () => (dispatch)=> {
    
    dispatch(removeUser());
    dispatch(redirect("/home"));

};

export const removeUser = () =>{

    return  ({
        type: ActionTypes.LOGOUT_USER,
        payload: 'Logout is Successful'
    })

}

export const redirect = link => {
    console.log("=== REDIRECT ACTION DISPATCHED ===");
    return { type: ActionTypes.REDIRECT_USER, payload: link };
};

export const postComment = (dish, rating, author, comment) => (dispatch) => {

    const newComment = {
        rating: rating,
        author: author,
        comment: comment
    };
    
    return fetch(baseUrl+ 'dishes/'+dish._id + '/comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {...authHeader(), "Content-Type": "application/json"}
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(updateDish(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});



