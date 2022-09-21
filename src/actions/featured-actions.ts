import { getAllError, getAllSuccess, processing } from '../redux/slices/FeaturedSlice';
import { api } from './axios';
import { AxiosResponse } from 'axios';

export const getFeaturedProjects = (
    attribute?: ApiRequestAttributes,
    controller?: AbortController,
): any => {
    const url = '/projects/v1/featured';
    const params: DataObj = {
        limit: attribute?.limit || 10,
        page: attribute?.page || 1,
        q: attribute?.q
    };

    return (dispatch: any) => {
        dispatch(processing());
        api.get(url, { signal: controller?.signal, params })
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
