import Parser from "rss-parser";
const parser = new Parser();

export async function fetchRssData(url: string): Promise<string> {
  const feed = await parser.parseURL(url);

  const list = feed.items.slice(0, 5).map((item) => {
    const date = new Date(item.pubDate as string);
    const publishedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return `<li><a href=${item.link} target="_blank" rel="noopener noreferrer">${item.title}</a> (${publishedDate}).</li>`;
  });

  const readMoreLink = url.endsWith('rss') ? `<p>Leia mais posts: <a href="${url.replace(/\/rss$/, '')}" target="_blank" rel="noopener noreferrer">riannegreiros.dev</a>.</p>` : '';

  return `<ul>${list.join('\n')}</ul>\n${readMoreLink}\n`;
}