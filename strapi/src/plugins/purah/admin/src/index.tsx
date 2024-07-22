import { prefixPluginTranslations } from '@strapi/helper-plugin'

import pluginPkg from '../../package.json'
import pluginId from './pluginId'
import Initializer from './components/Initializer'
import PluginIcon from './components/PluginIcon'
import EXIFIcon from './components/EXIF/icon'
import PhotoKeyIcon from './components/PhotoKey/icon'
import FilterSelect from './components/FilterSelect/icon'

const name = pluginPkg.strapi.name

export default {
  register(app: any) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import('./pages/App')

        return component
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    })
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    }

    app.registerPlugin(plugin)

    app.customFields.register({
      name: 'EXIF',
      pluginId: 'purah', // the custom field is created by a color-picker plugin
      type: 'json', // the color will be stored as a string
      intlLabel: {
        id: 'color-picker.color.label',
        defaultMessage: 'EXIF',
      },
      intlDescription: {
        id: 'color-picker.color.description',
        defaultMessage: 'EXIF Data',
      },
      icon: EXIFIcon, // don't forget to create/import your icon component
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ './components/EXIF/index'
          ),
      },
      options: {
        // declare options here
      },
    })

    app.customFields.register({
      name: 'PhotoKey',
      pluginId: 'purah', // the custom field is created by a color-picker plugin
      type: 'string', // the color will be stored as a string
      intlLabel: {
        id: 'color-picker.color.label',
        defaultMessage: 'Photo Key',
      },
      intlDescription: {
        id: 'color-picker.color.description',
        defaultMessage: '',
      },
      icon: PhotoKeyIcon, // don't forget to create/import your icon component
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ './components/PhotoKey/index'
          ),
      },
      options: {
        // declare options here
      },
    })

    app.customFields.register({
      name: 'FilterSelect',
      pluginId: 'purah', // the custom field is created by a color-picker plugin
      type: 'json', // the color will be stored as a string
      intlLabel: {
        id: 'color-picker.color.label',
        defaultMessage: 'Filter Select',
      },
      intlDescription: {
        id: 'color-picker.color.description',
        defaultMessage: '',
      },
      icon: FilterSelect, // don't forget to create/import your icon component
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ './components/FilterSelect/index'
          ),
      },
      options: {
        // declare options here
      },
    })
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            }
          })
          .catch(() => {
            return {
              data: {},
              locale,
            }
          })
      })
    )

    return Promise.resolve(importedTrads)
  },
}
