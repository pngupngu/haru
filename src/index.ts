import { start } from '@thi.ng/hdom';
import { EventBus } from "@thi.ng/interceptors";
import { Atom } from '@thi.ng/atom';
import { EVENT_ROUTE_CHANGED, HTMLRouter } from "@thi.ng/router";

import { Context, EVENTS as EV } from './api';
import * as config from './config';
import { root } from './components/root';

// setup

const state = new Atom(config.initialState);
const router = new HTMLRouter(config.router);
const bus = new EventBus(state, config.events, config.effects(router));
router.addListener(EVENT_ROUTE_CHANGED, e => bus.dispatch([EVENT_ROUTE_CHANGED, e.value]));
const ctx = { ui: config.ui, views: config.makeViews(state), bus };

// run

router.start();
bus.dispatch([EV.INIT]);

start(({ bus }: Context) => bus.processQueue() ? [root] : null, { ctx });