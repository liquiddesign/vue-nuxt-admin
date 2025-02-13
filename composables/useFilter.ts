export const useFilter = (): {
    filterType: Ref<any>;
    filterTypes: any;
    setFilterType: (value: string) => void;
} => {
    const setFilterType = function (value: string) : void {
        filterType.value = filterTypes[value];
    };

    const filterTypes: any = {
        starts: {
            code: 'starts',
            name: 'Začíná s',
            request: '%',
        },
        contains: {
            code: 'contains',
            name: 'Obsahuje',
            request: '%',
        },
        notContains: {
            code: 'notContains',
            name: 'Neobsahuje',
            request: '',
        },
        ends: {
            code: 'ends',
            name: 'Končí s',
            request: '',
        },
        equals: {
            code: 'equals',
            name: 'Rovná se',
            request: '',
        },
        notEquals: {
            code: 'notEquals',
            name: 'Nerovná se',
            request: '',
        },
    };

    const filterType: Ref<any> = ref(filterTypes.equals);

    return { filterType, filterTypes, setFilterType };
};