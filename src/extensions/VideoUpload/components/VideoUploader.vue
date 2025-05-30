<script setup lang="ts">
import { ref } from 'vue'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/icons'
import { useLocale } from '@/locales'
const props = defineProps({
  ...nodeViewProps,
})

const link = ref<string>('')
const loading = ref<boolean>(false)
const fileInput = ref()

const { t } = useLocale()

function handleFile(event) {
  loading.value = true
  const files = event?.target?.files
  if (!props.editor || props.editor.isDestroyed || files.length === 0) return
  const file = files[0]
  const uploadOptions = props.editor.extensionManager.extensions.find(
    extension => extension.name === 'videoUpload'
  )?.options
  uploadOptions?.upload([file]).then(res => {
    props.editor
      .chain()
      .setVideo({ src: res[0].src, width: '100%' })
      .deleteRange({ from: props.getPos(), to: props.getPos() })
      .run()
    loading.value = false
  })
}
function handleLink() {
  props.editor
    .chain()
    .setVideo({
      src: link.value,
      width: '100%',
    })
    .deleteRange({ from: props.getPos(), to: props.getPos() })
    .run()
}
function handleDelete() {
  props.deleteNode()
}
function handleClick() {
  fileInput.value?.click()
}
</script>

<template>
  <NodeViewWrapper as="div" data-drag-handle>
    <Popover defaultOpen>
      <PopoverTrigger as-child>
        <div
          class="flex items-center w-full p-3 my-3 hover:bg-accent border border-border text-muted-foreground cursor-pointer rounded-xs transition-all"
        >
          <div class="flex justify-center items-center gap-3 text-s" v-if="loading">
            <Icon class="animate-spin w-6 h-6" name="LoaderCircle" />
            <span>{{ t('editor.video.dialog.uploading') }}...</span>
          </div>
          <div v-else class="flex justify-between items-center w-full">
            <div class="flex justify-center items-center gap-3">
              <Icon name="Video" class="w-6 h-6" />
              <span class="text-sm">{{ t('editor.video.dialog.title') }}</span>
            </div>
            <Icon name="Trash2" class="hover:text-foreground" @click.stop="handleDelete" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent trapFocus class="w-full" :onOpenAutoFocus="e => e.preventDefault()">
        <Tabs default-value="upload" class="w-[400px]" activationMode="manual">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="upload">{{ t('editor.video.dialog.tab.upload') }} </TabsTrigger>
            <TabsTrigger value="link"> {{ t('editor.video.dialog.link') }} </TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <Button class="w-full mt-1" size="sm" @click="handleClick">{{
              t('editor.video.dialog.tab.upload')
            }}</Button>
            <input type="file" accept="video/*" ref="fileInput" multiple style="display: none" @change="handleFile" />
          </TabsContent>
          <TabsContent value="link">
            <form @submit.prevent="handleLink">
              <div class="flex items-center gap-2">
                <Input
                  type="url"
                  autofocus
                  required
                  v-model="link"
                  :placeholder="t('editor.video.dialog.placeholder')"
                />
                <Button type="submit">{{ t('editor.video.dialog.button.apply') }}</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  </NodeViewWrapper>
</template>
