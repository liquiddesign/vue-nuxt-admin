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
                title: 'Zakázky1',
                icon: 'pe-7s-box1',
                name: 'contracts',
                items: [
                    <MenuItem>{ title: 'Příjaté objednávky', route: 'orders1', disabled: true},
                    <MenuItem>{ title: 'Historie objednávek', route: 'history-orders1', disabled: true},
                    <MenuItem>{ title: 'Poptávky', route: 'demands1', disabled: true},
                    <MenuItem>{ title: 'Reklamace', route: 'complaints1', disabled: true},
                ],
            },
            <MenuItem>{
                title: 'Zakázky2',
                icon: 'pe-7s-box1',
                name: 'contracts2',
                items: [
                    <MenuItem>{ title: 'Příjaté objednávky', route: 'orders2', disabled: true},
                    <MenuItem>{ title: 'Historie objednávek', route: 'history-orders2', disabled: true},
                    <MenuItem>{ title: 'Poptávky', route: 'demands2', disabled: true},
                    <MenuItem>{ title: 'Reklamace', route: 'complaints2', disabled: true},
                ],
            },
            <MenuItem>{
                title: 'Zakázky3',
                icon: 'pe-7s-box1',
                name: 'contracts3',
                items: [
                    <MenuItem>{ title: 'Příjaté objednávky', route: 'orders3', disabled: true},
                    <MenuItem>{ title: 'Historie objednávek', route: 'history-orders3', disabled: true},
                    <MenuItem>{ title: 'Poptávky', route: 'demands3', disabled: true},
                    <MenuItem>{ title: 'Reklamace', route: 'complaints3', disabled: true},
                ],
            },
            <MenuItem>{
                title: 'Zakázky4',
                icon: 'pe-7s-box1',
                name: 'contracts4',
                items: [
                    <MenuItem>{ title: 'Příjaté objednávky', route: 'orders4', disabled: true},
                    <MenuItem>{ title: 'Historie objednávek', route: 'history-orders4', disabled: true},
                    <MenuItem>{ title: 'Poptávky', route: 'demands4', disabled: true},
                    <MenuItem>{ title: 'Reklamace', route: 'complaints4', disabled: true},
                ],
            },
        ],
    },
];

export default menu;