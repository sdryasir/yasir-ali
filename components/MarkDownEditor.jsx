// components/MarkdownEditor.js
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false });

export default function MarkdownEditor({
  editorId,
  value,
  onChange,
  theme = 'light',
  readOnly = false,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // prevent hydration issues
  }, []);

  if (!mounted) return null;

  return (
    <div className="mb-5">
      {!readOnly ? (
        <MDEditor
          value={value}
          onChange={onChange}
          height={300}
          preview="edit"
          theme={theme}
        />
      ) : (
        <MarkdownPreview source={value} style={{ background: theme === 'dark' ? '#1e1e1e' : '#fff', padding: '1rem' }} />
      )}
    </div>
  );
}
