export interface MenuItem {
    title: string
    name: string
    route: string|undefined
    icon: string
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
                icon: 'CircleGauge',
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
                icon: 'Archive',
                name: 'delivery-payments',
                items: [
                    <MenuItem>{ title: 'Typy dopravy', route: 'delivery-types'},
                    <MenuItem>{ title: 'Typy plateb', route: 'payment-type'},
                ],
            },
            <MenuItem>{
                title: 'Sklady a dostupnost',
                icon: 'Archive',
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
            //     icon: 'Archive',
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
                icon: 'Archive',
                name: 'contracts',
                items: [
                    <MenuItem>{ title: 'Ceníky', route: 'pricelist' },
                    <MenuItem>{ title: 'Ceny', route: 'orders1', disabled: true},
                    <MenuItem>{ title: 'Akce', route: 'discount' },
                ],
            },
            <MenuItem>{
                title: 'Měny a DPH',
                icon: 'Archive',
                name: 'contracts2',
                items: [
                    <MenuItem>{ title: 'Země a DPH', route: 'orders2', disabled: true},
                    <MenuItem>{ title: 'Měny', route: 'currency'},
                    <MenuItem>{ title: 'Výdejní místa', route: 'demands2', disabled: true},
                ],
            },
            <MenuItem>{
                title: 'Věrnostní programy',
                icon: 'Archive',
                name: 'contracts3',
                items: [],
            },
        ],
    },
    <MenuItem>{
        title: 'Nastavení',
        name: 'settings',
        items: [
            <MenuItem>{
                title: 'Štítky',
                icon: 'Archive',
                name: 'internal-ribbon',
                route: 'internal-ribbon',
                items: [],
            },
            <MenuItem>{
                title: 'Zákazníci',
                icon: 'Archive',
                name: 'customer',
                route: 'customer',
                items: [],
            },
            <MenuItem>{
                title: 'Obchodníci',
                icon: 'Archive',
                name: 'merchant',
                route: 'merchant',
                items: [],
            },
            <MenuItem>{
                title: 'Skupiny zákazníků',
                icon: 'Archive',
                name: 'customer-group',
                route: 'customer-group',
                items: [],
            },
            <MenuItem>{
                title: 'Viditelníky',
                icon: 'Archive',
                name: 'visibility-list',
                route: 'visibility-list',
                items: [],
            },
        ],
    },
];

export default menu;