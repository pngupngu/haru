import { Context } from '../api';

const header = ({ ui }: Context) =>
  ['header', ui.header,
    ['div', ui.logo, 'haru'],
    ['div', '2018-07-01']
  ];

export const root = ({ ui }: Context) =>
  ['div', ui.app,
    [header]];