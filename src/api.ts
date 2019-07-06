import { EventBus } from "@thi.ng/interceptors";
import { IView, ViewTransform } from "@thi.ng/atom";
import { RouteMatch } from "@thi.ng/router";

export type AppViews<T> = { [P in keyof T]: IView<T[P]> };
export type ViewSpec = string | [string, ViewTransform<any>];

export interface Views {
  route: RouteMatch;
  bgOpacity: number;
}

export interface Context {
  ui: any;
  bus: EventBus;
  views: AppViews<Views>
}

export enum EVENTS {
  INIT = 'init',
  ROUTE_TO = 'route-to',
}

export enum EFFECTS {
  ROUTE_TO,
}