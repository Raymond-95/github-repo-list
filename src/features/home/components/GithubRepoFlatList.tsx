import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	FlatList,
	View,
	Text,
	Image,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { palettes, fonts } from 'common/theme';
import { GithubRepoModel } from 'models';
import Star from 'common/assets/images/star.svg';
import { Label } from 'common/components';

interface Props {
	isFetching: boolean;
	data: GithubRepoModel[];
	fetchGithubRepoList: (page: number) => void;
}

export const GithubRepoFlatList = ({
	isFetching,
	data = [],
	fetchGithubRepoList,
}: Props) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isError, setError] = useState<boolean>(false);

	const handleEndReached = async () => {
		if (!isFetching && data.length > 0 && !isError) {
			try {
				const nextPage = currentPage + 1;
				await fetchGithubRepoList(nextPage);
				setCurrentPage(nextPage);
			} catch (error) {
				// prevent multiple calls
				setError(true);
				Alert.alert('Error: ', error, [
					{
						text: 'Ok',
						onPress: () => setError(false),
						style: 'default',
					},
				]);
			}
		}
	};

	return (
		<FlatList
			data={data}
			keyExtractor={item => item?.id?.toString()}
			renderItem={({ item }) => <Item item={item} />}
			ItemSeparatorComponent={FlatListItemSeparator}
			ListEmptyComponent={renderEmptyFlatList(!isFetching && data.length === 0)}
			ListFooterComponent={renderFlatListFooter(isFetching)}
			onEndReached={() => handleEndReached()}
			onEndReachedThreshold={0}
			onRefresh={() => fetchGithubRepoList(1)}
			refreshing={isFetching}
		/>
	);
};

interface ItemProps {
	item: GithubRepoModel;
}

const Item = React.memo(({ item }: ItemProps) => (
	<View style={styles.itemContainer}>
		<Label title={item.name} />

		{item.description && <Text>{item.description}</Text>}

		<View style={styles.itemFooterContainer}>
			<View style={styles.itemFooterLeftContainer}>
				<Image source={{ uri: item.avatarUrl }} width={24} height={24} />
				<Text>{item.username}</Text>
			</View>
			<View style={styles.itemFooterRightContainer}>
				<Star />
				<Text>{item.stargazersCount}</Text>
			</View>
		</View>
	</View>
));

const FlatListItemSeparator = () => {
	return <View style={styles.separator} />;
};

const renderEmptyFlatList = (isEmpty: boolean) => {
	return isEmpty ? <Text>No repositories found</Text> : null;
};

const renderFlatListFooter = (isFetching: boolean) => {
	return isFetching ? (
		<ActivityIndicator size="large" color={palettes.lightgrey} />
	) : null;
};

const styles = StyleSheet.create({
	itemContainer: {
		padding: 15,
		rowGap: 15,
	},
	itemFooterContainer: {
		flexDirection: 'row',
	},
	itemFooterLeftContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		columnGap: 10,
	},
	itemFooterRightContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		columnGap: 10,
	},
	separator: {
		height: 1,
		backgroundColor: palettes.lightgrey,
	},
});
