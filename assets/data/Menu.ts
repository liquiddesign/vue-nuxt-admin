export interface MenuItem {
    title: string
    name: string
    route: string|undefined
    icon: string|undefined
    disabled: boolean|undefined
    hidden: boolean|undefined
    items: MenuItem[]|never[]
}


const menu: MenuItem[] = [
    <MenuItem>{
        title: 'Dashboardy',
        name: 'allDashboards',
        items: [
            <MenuItem>{
                title: 'Můj přehled',
                name: 'dashboards',
                route: 'dashboards',
                icon: 'pe-7s-graph',
                items: [],
            },
        ],
    },
    <MenuItem>{
        title: 'Zákazníci',
        name: 'allCustomers',
        items: [
            <MenuItem>{
                title: 'Zakázky',
                icon: 'pe-7s-box1',
                name: 'contracts',
                items: [
                    <MenuItem>{ title: 'Příjaté objednávky', route: 'orders', disabled: true},
                    <MenuItem>{ title: 'Historie objednávek', route: 'history-orders', disabled: true},
                    <MenuItem>{ title: 'Poptávky', route: 'demands', disabled: true},
                    <MenuItem>{ title: 'Reklamace', route: 'complaints', disabled: true},
                ],
            },
            <MenuItem>{
                title: 'Zakázky',
                icon: 'pe-7s-box1',
                name: 'contracts2',
                items: [
                    <MenuItem>{ title: 'Příjaté objednávky', route: 'orders', disabled: true},
                    <MenuItem>{ title: 'Historie objednávek', route: 'history-orders', disabled: true},
                    <MenuItem>{ title: 'Poptávky', route: 'demands', disabled: true},
                    <MenuItem>{ title: 'Reklamace', route: 'complaints', disabled: true},
                ],
            },
            <MenuItem>{
                title: 'Zakázky',
                icon: 'pe-7s-box1',
                name: 'contracts3',
                items: [
                    <MenuItem>{ title: 'Příjaté objednávky', route: 'orders', disabled: true},
                    <MenuItem>{ title: 'Historie objednávek', route: 'history-orders', disabled: true},
                    <MenuItem>{ title: 'Poptávky', route: 'demands', disabled: true},
                    <MenuItem>{ title: 'Reklamace', route: 'complaints', disabled: true},
                ],
            },
            <MenuItem>{
                title: 'Zakázky',
                icon: 'pe-7s-box1',
                name: 'contracts4',
                items: [
                    <MenuItem>{ title: 'Příjaté objednávky', route: 'orders', disabled: true},
                    <MenuItem>{ title: 'Historie objednávek', route: 'history-orders', disabled: true},
                    <MenuItem>{ title: 'Poptávky', route: 'demands', disabled: true},
                    <MenuItem>{ title: 'Reklamace', route: 'complaints', disabled: true},
                ],
            },
        ],
    },
];

export default menu;