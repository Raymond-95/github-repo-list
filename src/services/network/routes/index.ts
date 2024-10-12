// API Paths
export const routes = {
    // home
    getGithubReposUrl: (date, page) => `/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`,
}


