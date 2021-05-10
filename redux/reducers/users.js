import { USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_LIKESS_STATE_CHANGE, CLEAR_DATA } from "../constants"

const initialState = {
    users: [],
    userLoaded: 0,
}

export const users = (state = initialState, action) => {

    switch(action.type){
        case USERS_DATA_STATE_CHANGE:
            return{
                ...state,
                users: [...state.users, action.user]
            }
        case USERS_POSTS_STATE_CHANGE:
            return{
                ...state,
                userLoaded: state.userLoaded + 1,
                // users: state.users.map(user => user.uid === action.uid ? 
                //     {...user, posts: action.posts} :
                //     user)
                feed: [...state.feed, ...action.posts]
            }
        case USERS_LIKESS_STATE_CHANGE:
            return{
                ...state,
                feed: state.feed.map(post => post.id == action.postId ?
                    {...post, currentUserLike: action.currentUserLike} : post)
            }
        case CLEAR_DATA:
            return initialState
            
        default:
            return state
    }
}