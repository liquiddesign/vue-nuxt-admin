export const useFilter = (): {
    filterType: Ref<string>;
    filterTypes: any;
    setFilterType: (value: string) => void;
} => {
    const filterType: Ref<string> = ref('starts');

    const setFilterType = function(value: string) {
        filterType.value = value;
    };

    const filterTypes: any = {
        starts: {
            code: 'starts',
            name: 'Začíná s',
        },
        contains: {
            code: 'contains',
            name: 'Obsahuje',
        },
        notContains: {
            code: 'notContains',
            name: 'Neobsahuje',
        },
        ends: {
            code: 'ends',
            name: 'Končí s',
        },
        equals: {
            code: 'equals',
            name: 'Rovná se',
        },
        notEquals: {
            code: 'norEquals',
            name: 'Nerovná se',
        },
    };

    return { filterType, filterTypes, setFilterType };
};