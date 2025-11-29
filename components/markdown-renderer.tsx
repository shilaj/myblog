import ReactMarkdown from 'react-markdown';

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className="markdown-content"
      components={{
        h1: ({ node, ...props }) => <h1 className="text-3xl font-semibold" {...props} />,
        h2: ({ node, ...props }) => <h2 className="mt-8 text-2xl font-semibold" {...props} />,
        h3: ({ node, ...props }) => <h3 className="mt-6 text-xl font-semibold" {...props} />,
        p: ({ node, ...props }) => <p className="leading-relaxed text-slate-200" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc space-y-2 pl-5 text-slate-200" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal space-y-2 pl-5 text-slate-200" {...props} />,
        li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
        img: ({ node, ...props }) => <img className="rounded-lg border border-white/10" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-sky-400/50 bg-white/5 px-4 py-2 italic text-slate-200"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
