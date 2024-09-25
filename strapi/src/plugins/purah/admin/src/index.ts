import { getTranslation } from './utils/getTranslation'
import { PLUGIN_ID } from './pluginId'
import { Initializer } from './components/Initializer'
import { PluginIcon } from './components/PluginIcon'
import EXIFIcon from './components/EXIF/icon'
import PhotoKeyIcon from './components/PhotoKey/icon'
import FilterSelect from './components/FilterSelect/icon'

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: () => import('./pages/App'),
    })

    app.customFields.register({
      name: 'EXIF',
      pluginId: 'purah',
      type: 'json',
      intlLabel: {
        id: 'color-picker.color.label',
        defaultMessage: 'EXIF',
      },
      intlDescription: {
        id: 'color-picker.color.description',
        defaultMessage: 'EXIF Data',
      },
      icon: EXIFIcon,
      components: {
        Input: async () => import('./components/EXIF/index'),
      },
      options: {},
    })

    app.customFields.register({
      name: 'PhotoKey',
      pluginId: 'purah',
      type: 'string',
      intlLabel: {
        id: 'color-picker.color.label',
        defaultMessage: 'Photo Key',
      },
      intlDescription: {
        id: 'color-picker.color.description',
        defaultMessage: '',
      },
      icon: PhotoKeyIcon,
      components: {
        Input: async () => import('./components/PhotoKey/index'),
      },
      options: {},
    })

    app.customFields.register({
      name: 'FilterSelect',
      pluginId: 'purah',
      type: 'json',
      intlLabel: {
        id: 'color-picker.color.label',
        defaultMessage: 'Filter Select',
      },
      intlDescription: {
        id: 'color-picker.color.description',
        defaultMessage: '',
      },
      icon: FilterSelect,
      components: {
        Input: async () => import('./components/FilterSelect/index'),
      },
      options: {},
    })

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    })
  },

  async registerTrads(app: any) {
    const { locales } = app

    const importedTranslations = await Promise.all(
      (locales as string[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: getTranslation(data),
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

    return importedTranslations
  },
}
