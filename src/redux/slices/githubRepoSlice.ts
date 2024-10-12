import { Alert } from 'react-native';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { GithubRepoModel } from 'models';

import { ApiService } from 'services/network/ApiService';
import { GithubRepoPayload } from 'services/network/models/GithubRepoPayload';
import {
	GithubRepoResponseItem,
	GithubRepoResponse,
} from 'services/network/models/GithubRepoResponse';

interface GithubRepo {
	isFetching: boolean;
	list: GithubRepoModel[];
	error?: string;
}

const initialState: GithubRepo = {
	isFetching: false,
	list: [],
	error: null,
};

export const githubRepoSlice = createSlice({
	name: 'githubRepo',
	initialState,
	reducers: {
		setIsFetching: (state, action) => {
			state.isFetching = action.payload;
		},
		setGithubRepo: (state, action) => {
			state.isFetching = false;
			state.list = action.payload;
			state.error = null;
		},
		setGithubRepoError: (state, action) => {
			state.isFetching = false;
			state.error = action.payload;
		},
	},
});

export const getGithubRepoList = createAsyncThunk(
	'githubRepo/getGithubRepo',
	async (
		payload: GithubRepoPayload,
		{ dispatch, getState, rejectWithValue },
	) => {
		const { date, page } = payload;
		const { githubRepo } = getState() as RootState;

		try {
			dispatch(githubRepoSlice.actions.setIsFetching(true));

			const response: GithubRepoResponse = await ApiService.apis.getGithubRepos(
				date,
				page,
			);

			if (response) {
				const results: GithubRepoModel[] = response.items.map(
					(item: GithubRepoResponseItem) => ({
						id: item.id,
						name: item.name,
						description: item.description,
						stargazersCount: item.stargazers_count,
						username: item.owner.login,
						avatarUrl: item.owner.avatar_url,
					}),
				);

				if (page === 1) {
					dispatch(githubRepoSlice.actions.setGithubRepo(results));
					return;
				}

				dispatch(
					githubRepoSlice.actions.setGithubRepo([
						...githubRepo.list,
						...results,
					]),
				);
			} else {
				// handle the case where the API request fails
				dispatch(
					githubRepoSlice.actions.setGithubRepoError('No result received'),
				);
			}
		} catch (error) {
			const errorMessage = error._message.message || error.message;
			dispatch(githubRepoSlice.actions.setGithubRepoError(errorMessage));

			return rejectWithValue(errorMessage);
		}
	},
);

export const { setIsFetching, setGithubRepo } = githubRepoSlice.actions;
export const githubRepoReducer = githubRepoSlice.reducer;
