/*interface Menu {
    items: MenuItem[]|never[]
    active: null
}*/

interface MenuItem {
    title: string
    name: string|undefined
    route: string|undefined
    icon: string|undefined
    disabled: boolean|undefined
    items: MenuItem[]|never[]
}


const menu: MenuItem[] = [
    <MenuItem>{
        title: 'Dashboardy',
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
                name: 'contracts',
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
menu.push(<MenuItem>{title: 'pes'});


/*export default [{
    title: 'Dashboardy',
    items: [
        {
            title: 'Můj přehled',
            name: 'dashboards',
            route: 'dashboards',
            icon: 'pe-7s-graph',
            items: [],
        },
    ],
    roles: ['A', 'AOM'],
},
    {
        title: 'Zákazníci',
        items: [
            {
                title: 'Zakázky',
                icon: 'pe-7s-box1',
                name: 'contracts',
                hidden: false,
                items: [
                    { title: 'Příjaté objednávky', route: 'orders', hidden: false},
                    { title: 'Historie objednávek', route: 'history-orders', hidden: false},
                    { title: 'Poptávky', route: 'demands', hidden: false},
                    { title: 'Reklamace', route: 'complaints', hidden: false},
                ],
            },
            {
                title: 'Uživatelé',
                icon: 'pe-7s-users',
                name: 'customers',
                items: [
                    { title: 'Zákazníci', route: 'customers'},
                    { title: 'Obchodníci', route: 'merchants'},
                    { title: 'Skupiny', route: 'groups'},
                    { title: 'Exporty', route: 'customersExports'},
                ],
            },
            {
                title: 'Ceny a slevy',
                icon: 'pe-7s-edit',
                name: 'prices',
                items: [
                    { title: 'Ceníky', route: 'pricelists'},
                    { title: 'Akce', route: 'actions', disabled: true},
                    { title: 'DPH', route: 'vat-rates'},
                    { title: 'Měny', route: 'currencies'},
                ],
            },
            {
                title: 'Viditelnost',
                icon: 'pe-7s-delete-user',
                name: 'dashboard',
                items: [
                    { title: 'Viditelnosti', route: 'visibilities'},
                ],
            },
        ],
    },
    {
        title: 'Produkty',
        items: [
            {
                title: 'Produkty',
                icon: 'pe-7s-portfolio',
                name: 'hire',
                items: [
                    { title: 'Produkty', route: 'hireLeads', disabled: true},
                    { title: 'Výrobci', route: 'producers'},
                    { title: 'Nabídky', route: 'hireOffers'},
                    { title: 'Registrace', route: 'hireRegistrations'},
                    { title: 'Přejímky od M', route: 'hireFinished'},
                ],
            },
            {
                title: 'Zařazení',
                icon: 'pe-7s-culture',
                name: 'estates',
                items: [
                    { title: 'Nemovitosti', route: 'estatesProperties'},
                    { title: 'Přejímky', route: 'estatesAcceptances'},
                    { title: 'Reporty KP', route: 'estatesReports'},
                    { title: 'Pojištění', route: 'estatesInsurances'},
                    { title: 'Klíče', route: 'estatesKeys'},
                ],
            },
            {
                title: 'Zobrazení',
                icon: 'pe-7s-id',
                name: 'owners',
                items: [
                    { title: 'Majitelé', route: 'ownersOwners'},
                    { title: 'Nájemní smlouvy', route: 'ownersContracts'},
                    { title: 'Prodlužování smluv', route: 'ownersProlonging'},
                    { title: 'Ukončování smluv', route: 'ownersTerminating'},
                    { title: 'Kontroly a reporty', route: 'ownersInspections'},
                    { title: 'Partnerský program', route: 'ownersCommissions'},
                ],
            },
            {
                title: 'Dostupnost a doručení',
                icon: 'pe-7s-users',
                name: 'tenants',
                items: [
                    { title: 'Nájemníci', route: 'tenantsTenants'},
                    { title: 'Rezervační smlouvy', route: 'tenantsReservations'},
                    { title: 'Podnájemní smlouvy', route: 'tenantsContracts'},
                    { title: 'Prodlužování smluv', route: 'tenantsProlonging'},
                    { title: 'Ukončování smluv', route: 'tenantsTerminating'},
                ],
            },
        ],
    },
    {
        title: 'Obsah',
        items: [
            {
                title: 'Struktura',
                icon: 'pe-7s-news-paper',
                name: 'structure',
                items: [
                    { title: 'Menu a stránky', route: 'hireLeads'},
                    { title: 'Aktuality', route: 'hireQuestionnaires'},
                    { title: 'Přesměrování', route: 'hireOffers'},
                    { title: 'Mikrotexty', route: 'hireOffers'},
                ],
            },
            {
                title: 'Prvky webu',
                icon: 'pe-7s-news-paper',
                name: 'elements',
                items: [
                    { title: 'Slider na úvodu', route: 'hireLeads'},
                    { title: 'Videa na úvodu', route: 'hireQuestionnaires'},
                ],
            },
        ],
    },
];*/

export default menu;