const singleBikePageRoot = '/bike/';

const routes = {
  HomePage: '/',
  BikesFormPage: '/create-bike',
  SingleBikePage: {
    path: `${singleBikePageRoot}:id`,
    createLink: (id: string | number) => `${singleBikePageRoot}${id}`,
    link: (id: string | number) => `${singleBikePageRoot}${id}`,
  },
  EditBikesPage: '/edit-bikes/:id',
  NotFoundPage: '*',
} as const;

export type Routes = typeof routes;
export type RouteLink = Routes[keyof Routes];

export default routes;
