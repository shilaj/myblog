import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type MarkdownProps = {
  content: string;
  className?: string;
};

export default function Markdown({ content, className }: MarkdownProps) {
  return (
    <ReactMarkdown className={className} rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  );
}
