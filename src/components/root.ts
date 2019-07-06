import { EV_SET_VALUE } from "@thi.ng/interceptors";
import { map } from "@thi.ng/transducers";

import { Context } from '../api';
import { photos } from '../data';

const cover = ({ ui, views }: Context) =>
  ['header', {
    ...ui.cover,
    style: {
      'background-color': `rgba(32,82,10,${views.bgOpacity.deref()})`
    }
  },
    ['div', ui.logo, 'haru'],
  ];

const content = ({ ui, bus }: Context) =>
  ['div', {
    ...ui.content.outer,
    onscroll: e => bus.dispatch([EV_SET_VALUE, ['scrollOffset', e.target.scrollTop]])
  },
    ['div', ui.content.inner, [main]]];

const post = ({ ui }: Context, photo) =>
  ['div', ui.post.main,
    ['img', { src: photo.url, ...ui.post.img } ],
    ['div', ui.post.desc, photo.desc]
  ];

const main = ({ ui }: Context) =>
  ['main', ui.main,
    map(p => [post, p], photos)
  ];

export const root = ({ ui }: Context) =>
  ['div', ui.app,
    [cover],
    [content]
  ];