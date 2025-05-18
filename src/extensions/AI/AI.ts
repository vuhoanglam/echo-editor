import { Node } from '@tiptap/core'
import ActionButton from './components/AIButton.vue'
import { GeneralOptions, MenuItem } from '@/type'

export interface AIMenuItem extends MenuItem {
  prompt?: string
}
export interface AIOptions extends GeneralOptions<AIOptions> {
  completions: (history: Array<{ role: string; content: string }>, signal?: AbortSignal) => Promise<any>
  /**
   * AI Shortcuts Menu
   */
  shortcuts: AIMenuItem[]
}

export const AI = Node.create<AIOptions>({
  name: 'AI',
  group: 'block',
  addOptions() {
    return {
      ...this.parent?.(),
      toolbar: false,
      button: ({ editor, t }) => ({
        component: ActionButton,
        componentProps: {
          icon: 'Sparkles',
          tooltip: t('editor.AI.ask'),
        },
      }),
    }
  },
})
