import { IObjectOf } from "@thi.ng/api";
import { Atom } from "@thi.ng/atom";
import { transduce, pairs, assocObj, map } from "@thi.ng/transducers";
import { isArray } from "@thi.ng/checks";
import { dispatchNow, EV_SET_VALUE, valueSetter } from "@thi.ng/interceptors";
import { Route, HTMLRouterConfig, EVENT_ROUTE_CHANGED, HTMLRouter } from "@thi.ng/router";
import { fit } from '@thi.ng/math';

import { EVENTS as EV, EFFECTS as FX, ViewSpec } from './api';

export const ui = {
  app: { class: 'font-sans font-normal text-sm text-white h-full w-full leading-normal no-debug-grid' },

  cover: { class: 'px-6 pt-5 absolute h-full w-full' },
  logo: { class: 'text-9xl font-indieflower text-green logo absolute right-12' },

  content: {
    outer: { class: 'h-full w-full overflow-y-scroll absolute' },
    inner: { class: 'content px-6 ' }
  },

  post: {
    main: { class: 'post' },
    img: { class: 'block mb-2' },
    desc: { class: 'text-right font-medium' }
  }
};

export const initialState = {
  scrollOffset: 0
};

const viewSpec: IObjectOf<ViewSpec> = {
  route: 'route',
  bgOpacity: ['scrollOffset', x => fit(x, 0, screen.height, 0, 1)]
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

  [EV.INIT]: dispatchNow([EV_SET_VALUE, ['initialized', true]]),
};

export const effects = (router: HTMLRouter) => ({
  [FX.ROUTE_TO]: ([id, params]) => router.routeTo(router.format(id, params))
});