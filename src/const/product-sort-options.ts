export const PRODUCT_SORT_OPTIONS =  [
    { name:"Name ( A - Z )" , value:"A_Z" },
    { name:"Name ( Z - A)" , value:"Z_A"},
    { name:"Price ( Low - High )" , value:"LOW_HIGH" },
    { name:"Price ( High - Low )" , value:"HIGH_LOW"},
];

export const ADMIN_PRODUCT_SORT_OPTION = [
    ...PRODUCT_SORT_OPTIONS,
    { name:"Stock ( Low - High )" , value:"STOCK_LOW_HIGH" },
    { name:"Stock ( High - Low )" , value:"STOCK_HIGH_LOW"},
]