import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import { getGithubRepoList } from 'redux/slices/githubRepoSlice';
import { RootStoreType } from 'redux/rootReducer';

export const useGithubRepoGetList = () => {
	const dispatch = useAppDispatch();
	const { isFetching, list: githubRepoList } = useSelector(
		(state: RootStoreType) => state.githubRepo,
	);

	const getTenDaysBefore = () => {
		const currentDate = new Date();
		const tenDaysBefore = new Date();
		tenDaysBefore.setDate(currentDate.getDate() - 10);
		return tenDaysBefore.toISOString().split('T')[0];
	};

	const fetchGithubRepoList = (page: number) => {
		const tenDaysBeforeCurrentDate = getTenDaysBefore();
		return dispatch(
			getGithubRepoList({ date: tenDaysBeforeCurrentDate, page }),
		).unwrap();
	};

	return {
		fetchGithubRepoList,
		isFetching,
		githubRepoList,
	};
};
