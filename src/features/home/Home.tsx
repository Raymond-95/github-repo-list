import { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from 'features/navigation/Navigator';
import { GithubRepoFlatList } from 'features/home/components/GithubRepoFlatList';
import { useGithubRepoGetList } from './hooks/useGithubRepoGetList';

interface Props {
	navigation: StackNavigationProp<RootStackParamsList, 'Home'>;
}

const Home = ({ navigation }: Props) => {
	const {
		fetchGithubRepoList,
		isFetching,
		githubRepoList,
	} = useGithubRepoGetList();

	useEffect(() => {
		fetchGithubRepoList(1);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<GithubRepoFlatList
				isFetching={isFetching}
				data={githubRepoList}
				fetchGithubRepoList={fetchGithubRepoList}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Home;
