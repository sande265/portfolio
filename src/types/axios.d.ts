declare interface ApiRequestAttributes {
    limit?: string | number | undefined;
    page?: string | number | undefined;
    q?: string | number | undefined;
    filter?: Array<DataObj> | undefined;
    sort_by?: string | undefined;
    sort_field?: string | undefined;
}

declare interface FilterAttributes extends DataObj {
    key: string;
    value: string;
}