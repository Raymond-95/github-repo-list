import { combineReducers } from "redux"
import { githubRepoReducer } from 'redux/slices/githubRepoSlice'

export const rootReducer = combineReducers({
    githubRepo: githubRepoReducer
})

export type RootStoreType = ReturnType<typeof rootReducer>
