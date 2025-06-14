'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(() => import('@/components/MarkDownEditor'), { ssr: false });

export default function EditorPage() {
  const [theme, setTheme] = useState('light');
  const [content2, setContent2] = useState('');

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Markdown Playground</h2>
        <button className="btn btn-sm btn-outline-primary" onClick={toggleTheme}>
          Toggle Theme ({theme})
        </button>
      </div>

      <MarkdownEditor
        editorId="editor-2"
        value={content2}
        onChange={setContent2}
        theme={theme}
      />

      <hr className="my-5" />

      <h4>Read-Only Preview</h4>
      <MarkdownEditor
        editorId="readonly"
        value={content2}
        onChange={() => {}}
        readOnly={true}
        theme={theme}
      />
    </div>
  );
}
