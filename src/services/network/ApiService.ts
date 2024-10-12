import { ApisauceInstance, ApiResponse } from 'apisauce';
import { AxiosError } from 'axios';

import { instance } from 'services/network/setup';
import { routes } from 'services/network/routes';
import { apis } from 'services/network/implementations/apis';
import HttpException from 'common/exceptions/HttpException';
import {
	UnauthorizedException,
	TimeoutException,
} from 'common/exceptions/HttpException';

type getArgs = Parameters<ApisauceInstance['get']>;
type postArgs = Parameters<ApisauceInstance['post']>;
type putArgs = Parameters<ApisauceInstance['put']>;
type deleteArgs = Parameters<ApisauceInstance['delete']>;

/**
 * Wrapper around API instance.
 * By default, apisauce does not throw on failure.
 *
 * In order for useSWR() to correctly return the error,
 * the fetcher needs to throw on failure.
 */
export const client = {
	/**
	 * We're forwarding the types and arguments and then throwing on error.
	 */
	...instance,
	get: async <T>(...args: getArgs) => {
		const res = (await instance.get(...args)) as ApiResponse<T>;
		return util.throwOnError<T>(res);
	},
	post: async <T>(...args: postArgs) => {
		const res = (await instance.post(...args)) as ApiResponse<T>;
		return util.throwOnError<T>(res);
	},
	put: async <T>(...args: putArgs) => {
		const res = (await instance.put(...args)) as ApiResponse<T>;
		return util.throwOnError<T>(res);
	},
	delete: async <T>(...args: deleteArgs) => {
		const res = (await instance.delete(...args)) as ApiResponse<T>;
		return util.throwOnError<T>(res);
	},
	// override more methods as needed
};

// API utilities
const util = {
	throwOnError: <T>(response: ApiResponse<T>) => {
		if (!response.ok) {
			const error = new HttpException(
				response.status || 'unknown',
				response.data,
				response.config?.url || 'unknown',
				response,
			);

			__DEV__ && console.log(error);

			// Handle timeout errors
			if (error instanceof AxiosError && error.code === 'ECONNABORTED') {
				throw new TimeoutException('Request timed out');
			}
			// Handle unauthorized access (401) separately
			else if (response.status === 401) {
				throw new UnauthorizedException('Unauthorized access');
			}

			throw error;
		} else {
			// all good!
			return response.data;
		}
	},
};

export const ApiService = {
	apis,
	routes,
	client,
	util,
};
