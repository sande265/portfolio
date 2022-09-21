import { getAllError, getAllSuccess, processing } from '../redux/slices/ProjectSlice';
import { api } from './axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const getProjects = (
    attribute?: ApiRequestAttributes,
    controller?: AbortController,
): any => {
    const url = '/project/v1/projects';
    const params: DataObj = {
        limit: attribute?.limit || 10,
        page: attribute?.page || 1,
        q: attribute?.q,
        sort_by: attribute?.sort_by || "asc",
        sort_field: attribute?.sort_field || ""
    };
    attribute?.filter &&
        attribute?.filter?.forEach(({ key, value }: FilterAttributes | DataObj) => {
            if (value?.toString()) params[`filter[${key}]`] = value.toString();
        });
    const config: AxiosRequestConfig = {
        params,
        signal: controller?.signal,
    };
    return (dispatch: any) => {
        dispatch(processing());
        api.get(url, config)
            .then((res: AxiosResponse) => {
                dispatch(getAllSuccess(res?.data));
                return res;
            })
            .catch(error => {
                if (error?.data) dispatch(getAllError(error));
                return error;
            });
    };
};
