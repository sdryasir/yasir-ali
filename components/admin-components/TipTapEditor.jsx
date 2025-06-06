'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect, useState } from 'react'
import { BoldIcon, Code2, Heading1, Heading2, List, ListOrdered, LucideItalic, ParkingSquare, QuoteIcon, Strikethrough, UnderlineIcon, Undo, Redo, Link2, ImageDown, Heading3 } from 'lucide-react'
import Blockquote from '@tiptap/extension-blockquote'
import CodeBlock from '@tiptap/extension-code-block'
import Heading from '@tiptap/extension-heading'
import Youtube from '@tiptap/extension-youtube'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  const [height, setHeight] = useState(480)
  const [width, setWidth] = useState(640)
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      })
    }
  }

  return (
    <div className="btn-toolbar flex-wrap" role="toolbar">
      <div className="btn-group me-1">
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleBold().run()}>
          <BoldIcon />
        </button>
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <LucideItalic/>
        </button>
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon/>
        </button>
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough />
        </button>
      </div>

      <div className="btn-group me-1">
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().setParagraph().run()}>
          <ParkingSquare />
        </button>
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 />
        </button>
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 />
        </button>
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3/>
        </button>
      </div>

      <div className="btn-group me-1">
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List />
        </button>
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered />
        </button>
      </div>

      <div className="btn-group me-1">
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <QuoteIcon/>
        </button>
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code2 />
        </button>
      </div>

      <div className="btn-group me-1">
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().undo().run()}>
          <Undo />
        </button>
        <button className="btn btn-outline-secondary rounded-0" onClick={() => editor.chain().focus().redo().run()}>
          <Redo />
        </button>
      </div>

      <div className="btn-group me-1">
        <button
          className="btn btn-outline-secondary rounded-0"
          onClick={() => {
            const url = prompt('Enter URL')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
        >
          <Link2 />
        </button>
        <button
          className="btn btn-outline-secondary rounded-0"
          onClick={() => {
            const url = prompt('Enter image URL')
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
        >
          <ImageDown />
        </button>
      </div>
      <div className="button-group">
        <input
          className="form-control"
          style={{ width: '100px', display: 'inline-block' }}
          id="width"
          type="number"
          min="320"
          max="1024"
          placeholder="width"
          value={width}
          onChange={event => setWidth(event.target.value)}
        />
        <input
          className="form-control"
          style={{ width: '100px', display: 'inline-block' }}
          id="height"
          type="number"
          min="180"
          max="720"
          placeholder="height"
          value={height}
          onChange={event => setHeight(event.target.value)}
        />
        <button className='btn btn-outline-secondary rounded-0' id="add" onClick={addYoutubeVideo}>Add YouTube video</button>
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
      Blockquote.configure({
        HTMLAttributes: {
          class: 'blockquote',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'code-block',
        },
      }), 
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
    ],
    content: '<p></p>',
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
    <div className="card card-body border p-0">
      <MenuBar editor={editor} />
      <div className="tiptap-wrapper bg-white" style={{ minHeight: '300px' }}>
        <EditorContent editor={editor} style={{ minHeight: '300px' }} />
      </div>
    </div>
  )
}
