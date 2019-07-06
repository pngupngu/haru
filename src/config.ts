import { IObjectOf } from "@thi.ng/api";
import { Atom } from "@thi.ng/atom";
import { transduce, pairs, assocObj, map } from "@thi.ng/transducers";
import { isArray } from "@thi.ng/checks";
import { dispatch, dispatchNow, EV_SET_VALUE, valueSetter } from "@thi.ng/interceptors";
import { Route, HTMLRouterConfig, EVENT_ROUTE_CHANGED, HTMLRouter } from "@thi.ng/router";

import { EVENTS as EV, EFFECTS as FX, ViewSpec } from './api';

export const ui = {
  app: { class: 'font-sans font-normal text-sm text-green leading-normal no-debug-grid' },

  header: { class: 'mx-6 pt-5' },
  logo: { class: 'text-9xl font-indieflower' },
};

export const initialState = {

};

const viewSpec: IObjectOf<ViewSpec> = {
  route: 'route',
};

export const makeViews = (state: Atom<any>) => transduce(
  map(([key, spec]) =>
    [key, isArray(spec) ? state.addView(spec[0], spec[1]) : state.addView(spec)]),
  assocObj(),
  pairs(viewSpec)
);

export const routes: IObjectOf<Route> = {
  HOME: {
    id: "home",
    match: ["home"]
  },
};

export const router: HTMLRouterConfig = {
  useFragment: true,
  defaultRouteID: routes.HOME.id,
  routes: Object.keys(routes).map(key => routes[key])
};

export const events = {
  [EVENT_ROUTE_CHANGED]: [
    valueSetter('route'),
    dispatchNow([EV_SET_VALUE, ['nav.visible', false]]),
  ],
  [EV.ROUTE_TO]: (_, [__, route]) => ({ [FX.ROUTE_TO]: route }),

  [EV.INIT]: dispatch([EV_SET_VALUE, ['initialized', true]]),
};

export const effects = (router: HTMLRouter) => ({
  [FX.ROUTE_TO]: ([id, params]) => router.routeTo(router.format(id, params))
});