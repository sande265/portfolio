import { getAllError, getAllSuccess, processing } from '../redux/slices/ExperienceSlice';
import { api } from './axios';
import { AxiosResponse } from 'axios';

declare interface ApiRequestAttributes {
    limit?: string | number | undefined;
    page?: string | number | undefined;
    q?: string | number | undefined;
}

export const getExperiences = (
    attribute?: ApiRequestAttributes,
    controller?: AbortController,
): any => {
    const url = '/experience/v1/experiences';
    const params: DataObj = {
        limit: attribute?.limit || 10,
        page: attribute?.page || 1,
        q: attribute?.q || ``,
    };

    return (dispatch: any) => {
        dispatch(processing());
        api.get(url, { signal: controller?.signal, ...params })
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
