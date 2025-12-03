export const paths = {
  app: {
    root: {
      path: '',
    },
    products: {
      path: 'products',
      getHref: () => '/products',
    },
    contacts: {
      path: 'contact',
      getHref: () => '/contact',
    },
  }
} as const;
