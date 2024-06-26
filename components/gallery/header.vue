<script lang="ts" setup>
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  Squares2X2Icon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'

const divisions = defineModel('divisions')
</script>

<template>
  <section id="gallery-header">
    <div id="gallery-inner">
      <div id="gallery-search">
        <form>
          <div id="search-bar">
            <input
              class="search"
              placeholder="Search photographs"
            />
            <button><XMarkIcon /></button>
          </div>
          <button id="search-submit"><MagnifyingGlassIcon /></button>
        </form>
      </div>
      <div id="gallery-slider">
        <div id="gallery-slider-inner">
          <button
            type="button"
            @click="divisions = Math.max((divisions as number) - 1, 1)"
          >
            <Squares2X2Icon />
          </button>
          <div>
            <input
              type="range"
              min="1"
              max="6"
              id="slider"
              v-model="divisions"
            />
          </div>
          <button
            type="button"
            @click="divisions = Math.min((divisions as number) + 1, 7)"
          >
            <CodeBracketSquareIcon />
          </button>
        </div>
      </div>
      <div id="gallery-filter">
        <button>
          Filter
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  </section>
</template>
