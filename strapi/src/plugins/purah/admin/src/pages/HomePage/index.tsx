/*
 *
 * HomePage
 *
 */

import React from 'react'
import pluginId from '../../pluginId'
import { useStrapiApp } from '@strapi/helper-plugin'
import { IconButton } from '@strapi/design-system'
import { Spark } from '@strapi/icons'

const HomePage = () => {
  // const bird = updateBirds({ strapi })
  // console.log(bird)

  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <p>Happy coding</p>
    </div>
  )
}

export default HomePage
