import { getAllError, getAllSuccess, processing } from '../redux/slices/AboutSlice';
import { api } from './axios';
import { AxiosResponse } from 'axios';

export const getAboutMeList = (
    attribute?: ApiRequestAttributes,
    controller?: AbortController,
): any => {
    const url = '/about/v1/aboutme';
    const params: DataObj = {
        limit: attribute?.limit || 10,
        page: attribute?.page || 1,
        q: attribute?.q,
        filter: attribute?.filter || []
    };
    params.filter && params.filter.forEach(({ key, value }: FilterAttributes) => {
        if (value) params[`${key}`] = value;
    })
    const config = {
        params,
        signal: controller?.signal
    }
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
