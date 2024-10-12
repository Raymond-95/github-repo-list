export interface GithubRepoResponseItem {
    id: number,
    name: string,
    description: string,
    stargazers_count: number,
    owner: {
        login: string,
        avatar_url: string
    }
}

export interface GithubRepoResponse {
    items: [GithubRepoResponseItem]
}

