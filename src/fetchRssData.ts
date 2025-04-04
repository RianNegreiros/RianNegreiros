import Parser from 'rss-parser'
const parser = new Parser()

export async function fetchRssData(url: string): Promise<string> {
  const feed = await parser.parseURL(url)

  const list = feed.items.slice(0, 5).map((item) => {
    const date = new Date(item.pubDate as string)
    const publishedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    return `<li><a href="${item.link}">${item.title}</a> (${publishedDate}).</li>`
  })

  const readMoreLink = `<p>Leia mais posts em: <a href="https://www.riannegreiros.xyz/posts">riannegreiros.xyz</a></p>`

  return `<ul>${list.join('\n')}</ul>\n${readMoreLink}\n`
}
