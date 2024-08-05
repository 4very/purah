<script setup lang="ts">
import {
  ChevronDownIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  title: string
  total: number
  values: [string, number][]
  type?: string
}>()

const collapsed = ref(false)
const expanded = ref(false)
const search = ref('')

if (props.type && props.type === 'date') {
}
</script>

<template>
  <div id="filter">
    <button
      id="filter-header"
      @click="collapsed = !collapsed"
    >
      <span id="title">{{ title }}</span>
      <span id="total">{{ total }}</span>
      <ChevronDownIcon
        :style="{
          transform: `rotate(${collapsed ? '180' : '0'}deg)`,
        }"
      />
    </button>
    <div
      id="filter-items"
      v-if="!collapsed"
    >
      <ul id="filter-list">
        <li
          v-for="([val, num], i) in values.slice(0, expanded ? undefined : 3)"
          :key="val"
          id="filter-item"
        >
          <input type="checkbox" />
          <span id="title">{{
            type === 'date' ? new Date(val).toLocaleDateString() : val
          }}</span>
          <span id="total">{{ num }}</span>
        </li>
      </ul>
    </div>
    <button
      id="filter-header"
      @click="expanded = !expanded"
    >
      <span id="title">Show All</span>
      <ArrowDownIcon
        :style="{
          transform: `rotate(${expanded ? '180' : '0'}deg)`,
        }"
      ></ArrowDownIcon>
    </button>
  </div>
</template>
