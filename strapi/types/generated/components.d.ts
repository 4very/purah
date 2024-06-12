import type { Schema, Attribute } from '@strapi/strapi';

export interface SummaryLatest3 extends Schema.Component {
  collectionName: 'components_summary_latest_3s';
  info: {
    displayName: 'latest 3';
    icon: 'file';
  };
  attributes: {
    posts: Attribute.Relation<
      'summary.latest-3',
      'oneToMany',
      'api::post.post'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'summary.latest-3': SummaryLatest3;
    }
  }
}
