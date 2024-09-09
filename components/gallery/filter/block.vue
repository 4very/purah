<script setup lang="ts">
import {
  ChevronDownIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  title: string
  total: number
  values: { raw_value: string; count: number }[]
  type?: string
}>()

const collapsed = ref(false)
const expanded = ref(false)
const search = ref('')

const [checked] = defineModel<string[]>('checked', { default: [] })

if (props.type && props.type === 'date') {
}

const f = (v: string, e: any) => {
  if (e.target.checked) checked.value.push(v)
  else checked.value.splice(checked.value.indexOf(v), 1)
}
</script>

<template>
  <div id="gallery-filter">
    <button
      id="gallery-filter-header"
      @click="collapsed = !collapsed"
    >
      <span id="gallery-filter-title">{{ title }}</span>
      <span id="gallery-filter-total">{{ total }}</span>
      <ChevronDownIcon
        :style="{
          transform: `rotate(${collapsed ? '180' : '0'}deg)`,
        }"
      />
    </button>
    <div
      id="gallery-filter-items"
      v-if="!collapsed"
    >
      <ul id="gallery-filter-list">
        <li
          v-for="({ raw_value, count }, i) in values.slice(
            0,
            expanded ? undefined : 3
          )"
          :key="raw_value"
          id="gallery-filter-item"
        >
          <input
            type="checkbox"
            @change="f(raw_value, $event)"
          />
          <span id="gallery-filter-title">{{
            type === 'date'
              ? new Date(raw_value).toLocaleDateString()
              : raw_value
          }}</span>
          <span id="gallery-filter-total">{{ count }}</span>
        </li>
      </ul>
    </div>
    <button
      id="gallery-filter-header"
      @click="expanded = !expanded"
    >
      <span id="gallery-filter-title">Show All</span>
      <ArrowDownIcon
        :style="{
          transform: `rotate(${expanded ? '180' : '0'}deg)`,
        }"
      ></ArrowDownIcon>
    </button>
  </div>
</template>
