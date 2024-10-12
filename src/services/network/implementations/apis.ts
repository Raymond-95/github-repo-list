import { client } from 'services/network/ApiService'
import { routes } from 'services/network/routes'
import { GithubRepoResponse } from 'services/network/models/GithubRepoResponse'

// API implementation
export const apis = {
    getGithubRepos: (date, page) => client.get<GithubRepoResponse>(
        routes.getGithubReposUrl(date, page)
    )
}