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
        title: 'Logistika',
        name: 'logistic',
        items: [
            <MenuItem>{
                title: 'Doprava a platby',
                icon: 'pe-7s-box1',
                name: 'delivery-payments',
                items: [
                    <MenuItem>{ title: 'Typy dopravy', route: 'delivery-types'},
                    <MenuItem>{ title: 'Typy plateb', route: 'history-orders1', disabled: true},
                ],
            },
            <MenuItem>{
                title: 'Sklady a dostupnost',
                icon: 'pe-7s-box1',
                name: 'stores-availability',
                items: [
                    <MenuItem>{ title: 'Sklady a množství', route: 'orders2', disabled: true},
                    <MenuItem>{ title: 'Dostupnost', route: 'display-amount'},
                    <MenuItem>{ title: 'Doručení', route: 'display-delivery'},
                    <MenuItem>{ title: 'Výdejní místa', route: 'demands2', disabled: true},
                ],
            },
            // <MenuItem>{
            //     title: 'Doručení',
            //     icon: 'pe-7s-box1',
            //     name: 'contracts3',
            //     items: [],
            // },
        ],
    },
    <MenuItem>{
        title: 'Ceny a akce',
        name: 'price-action',
        items: [
            <MenuItem>{
                title: 'Ceníky a slevy',
                icon: 'pe-7s-box1',
                name: 'contracts',
                items: [
                    <MenuItem>{ title: 'Ceníky', route: 'orders1', disabled: true},
                    <MenuItem>{ title: 'Ceny', route: 'orders1', disabled: true},
                    <MenuItem>{ title: 'Akce', route: 'history-orders1', disabled: true},
                ],
            },
            <MenuItem>{
                title: 'Měny a DPH',
                icon: 'pe-7s-box1',
                name: 'contracts2',
                items: [
                    <MenuItem>{ title: 'Země a DPH', route: 'orders2', disabled: true},
                    <MenuItem>{ title: 'Měny', route: 'history-orders2', disabled: true},
                    <MenuItem>{ title: 'Výdejní místa', route: 'demands2', disabled: true},
                ],
            },
            <MenuItem>{
                title: 'Věrnostní programy',
                icon: 'pe-7s-box1',
                name: 'contracts3',
                items: [],
            },
        ],
    },
];

export default menu;