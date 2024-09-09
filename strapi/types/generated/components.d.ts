import type { Schema, Attribute } from '@strapi/strapi';

export interface GalleryFilter extends Schema.Component {
  collectionName: 'components_gallery_filters';
  info: {
    displayName: 'Filter';
    icon: 'filter';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    key: Attribute.String & Attribute.CustomField<'plugin::purah.PhotoKey'>;
    filters: Attribute.JSON &
      Attribute.CustomField<'plugin::purah.FilterSelect'>;
    type: Attribute.Enumeration<
      ['date', 'text', 'shutter_speed', 'collection']
    >;
  };
}

export interface GalleryTag extends Schema.Component {
  collectionName: 'components_gallery_tags';
  info: {
    displayName: 'Tag';
  };
  attributes: {
    value: Attribute.String;
  };
}

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
      'gallery.filter': GalleryFilter;
      'gallery.tag': GalleryTag;
      'summary.latest-3': SummaryLatest3;
    }
  }
}
