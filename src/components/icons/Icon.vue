<script setup lang="ts">
import { computed } from 'vue'
import icons from './icons'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  name: keyof typeof icons
  class?: HTMLAttributes['class']
}>()

const icon = computed(() => icons[props.name])

if (!icon.value) {
  console.error(`Icon ${props.name} not found`)
}
</script>

<template>
  <Icon :name="props.name" :icon="icon" :class="cn('size-4', props.class)" />
</template>
