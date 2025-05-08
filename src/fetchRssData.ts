import Parser from 'rss-parser'

interface RssFeedItem {
  title?: string
  link?: string
  pubDate?: string
}

export async function fetchRssData(url: string): Promise<string> {
  const parser = new Parser()

  try {
    const feed = await parser.parseURL(url)

    const list = feed.items
      .slice(0, 5)
      .map((item: RssFeedItem) => {
        if (!item.title || !item.link || !item.pubDate) {
          return null // Skip invalid items
        }

        const date = new Date(item.pubDate)
        if (isNaN(date.getTime())) {
          return null // Skip items with invalid dates
        }

        const publishedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return `<li><a href="${item.link}">${item.title}</a> (${publishedDate}).</li>`
      })
      .filter((item): item is string => item !== null) // Type guard to filter out null items

    if (list.length === 0) {
      throw new Error('No valid RSS feed items found')
    }

    const readMoreLink = `<p>Leia mais posts em: <a href="https://www.riannegreiros.xyz/posts">riannegreiros.xyz</a></p>`
    return `<ul>${list.join('\n')}</ul>\n${readMoreLink}\n`
  } catch (error) {
    console.error(`Failed to fetch RSS feed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return '<p>Failed to load recent posts. Please visit <a href="https://www.riannegreiros.xyz/posts">riannegreiros.xyz</a> for all posts.</p>'
  }
}
