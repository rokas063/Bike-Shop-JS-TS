const singleBikePageRoot = '/bike/';

const routes = {
  HomePage: '/',
  SingleBikePage: {
    path: `${singleBikePageRoot}:id`,
    createLink: (id: string | number) => `${singleBikePageRoot}${id}`,
  },
} as const;

export type Routes = typeof routes;
export type RouteLink = Routes[keyof Routes];

export default routes;
