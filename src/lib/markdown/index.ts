
// Markdown 処理ユーティリティ


/**
 * 単純なMarkdownパーサーを用いて目次を抽出
 * @param markdown Markdownテキスト
 * @returns 目次アイテム配列
 */
export function extractToc(markdown: string): Array<{ level: number; text: string; slug: string }> {
  const toc: Array<{ level: number; text: string; slug: string }> = [];
  
  // 見出し行を検出する正規表現
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  
  // すべての見出しを処理
  while (true) {
    match = headingRegex.exec(markdown);
    if (match === null) break;
    
    const level = match[1].length; // #の数が見出しレベル
    const text = match[2].trim();
    
    // スラグ（ID）を生成
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 特殊文字を削除
      .replace(/\s+/g, '-')     // スペースをハイフンに変換
      .replace(/^-+|-+$/g, ''); // 先頭と末尾のハイフンを削除
    
    // 見出しレベルが3以下の場合のみ目次に追加
    if (level <= 3) {
      toc.push({
        level,
        text,
        slug
      });
    }
  }
  
  return toc;
}

/**
 * シンプルな正規表現ベースのMarkdown→HTML変換
 * 注: 完全なMarkdown構文をサポートするわけではありません
 * 
 * @param markdown Markdownテキスト
 * @returns HTML文字列
 */
export function markdownToHtml(markdown: string): string {
  // フロントマターを除去
  const { content } = extractFrontMatter(markdown);
  
  // 改行を保持
  let html = content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
  
  // 見出し
  html = html.replace(/^#{6}\s+(.+)$/gm, '<h6 id="$1">$1</h6>');
  html = html.replace(/^#{5}\s+(.+)$/gm, '<h5 id="$1">$1</h5>');
  html = html.replace(/^#{4}\s+(.+)$/gm, '<h4 id="$1">$1</h4>');
  html = html.replace(/^#{3}\s+(.+)$/gm, '<h3 id="$1">$1</h3>');
  html = html.replace(/^#{2}\s+(.+)$/gm, '<h2 id="$1">$1</h2>');
  html = html.replace(/^#{1}\s+(.+)$/gm, '<h1 id="$1">$1</h1>');
  
  // コードブロック（パターンのsフラグをgに置き換え）
  const codePattern = /```([\s\S]+?)```/g;
  html = html.replace(codePattern, '<pre><code>$1</code></pre>');
  
  // インラインコード
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // 強調（太字と斜体）
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // リンク
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // リスト
  html = html.replace(/^\s*-\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.+<\/li>\n)<li>/g, '$1<li>'); // 連続するリストアイテム
  html = html.replace(/(<li>.+<\/li>(?:\n)?(?!<li>))/g, '<ul>$1</ul>'); // リスト全体をul要素で囲む
  
  // パラグラフタグで囲む
  const wrappedHtml = `<p>${html}</p>`;
  
  // 連続する段落を修正
  return wrappedHtml.replace(/<\/p><p>/g, '</p>\n<p>');
}

/**
 * Markdownの先頭からメタデータを抽出する
 * フォーマット:
 * ```
 * ---
 * title: タイトル
 * date: 2023-01-01
 * ---
 * ```
 * 
 * @param markdown Markdownテキスト
 * @returns メタデータとMarkdown本文
 */
export function extractFrontMatter(markdown: string): { 
  frontMatter: Record<string, string>; 
  content: string;
} {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = markdown.match(frontMatterRegex);
  
  if (!match) {
    return { 
      frontMatter: {}, 
      content: markdown 
    };
  }
  
  const frontMatterString = match[1];
  const content = markdown.slice(match[0].length);
  
  // フロントマターを解析
  const frontMatter: Record<string, string> = {};
  const lines = frontMatterString.split('\n');
  
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      frontMatter[key.trim()] = valueParts.join(':').trim();
    }
  }
  
  return { frontMatter, content };
}

/**
 * Markdownからプレーンテキストを抽出する
 * @param markdown Markdownテキスト
 * @param maxLength 最大文字数（省略可）
 * @returns プレーンテキスト
 */
export function extractPlainText(markdown: string, maxLength?: number): string {
  // フロントマターを除去
  const { content } = extractFrontMatter(markdown);
  
  // Markdownの構文を除去してプレーンテキストに変換
  const plainText = content
    // ヘディング記号を除去
    .replace(/#{1,6}\s+/g, '')
    // リンクからテキストを抽出
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // コードブロックを除去
    .replace(/```[\s\S]*?```/g, '')
    // インラインコードを除去
    .replace(/`([^`]+)`/g, '$1')
    // 太字と斜体を除去
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // 水平線を除去
    .replace(/^\s*[-*_]{3,}\s*$/gm, '')
    // リスト記号を除去
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    // HTML要素を除去
    .replace(/<[^>]+>/g, '')
    // 複数の空白行を1つにまとめる
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  // 最大文字数が指定されている場合は切り詰める
  if (maxLength && plainText.length > maxLength) {
    return `${plainText.substring(0, maxLength)}...`;
  }
  
  return plainText;
} 