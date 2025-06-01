'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect } from 'react'


const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="btn-toolbar mb-3 flex-wrap" role="toolbar">
      <div className="btn-group me-2 mb-2">
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().toggleStrike().run()}>
          Strike
        </button>
      </div>

      <div className="btn-group me-2 mb-2">
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().setParagraph().run()}>
          P
        </button>
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
      </div>

      <div className="btn-group me-2 mb-2">
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. List
        </button>
      </div>

      <div className="btn-group me-2 mb-2">
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          Blockquote
        </button>
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          Code
        </button>
      </div>

      <div className="btn-group me-2 mb-2">
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </button>
        <button className="btn btn-outline-secondary" onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </button>
      </div>

      <div className="btn-group me-2 mb-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            const url = prompt('Enter URL')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
        >
          Link
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            const url = prompt('Enter image URL')
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
        >
          Image
        </button>
      </div>
    </div>
  )
}

export default function TiptapEditor({ onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p>Start writing...</p>',
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    return () => {
      editor?.destroy()
    }
  }, [editor])

  return (
    <div className="card card-body border rounded">
      <MenuBar editor={editor} />
      <div className="border rounded p-3 bg-white" style={{ minHeight: '300px' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
