import Parser from 'rss-parser'

interface RssItem {
  title?: string
  link?: string
  pubDate?: string
}

export async function fetchRssData(url: string): Promise<string> {
  try {
    const parser = new Parser()
    const feed = await parser.parseURL(url)

    const posts = feed.items
      .slice(0, 5)
      .map((item: RssItem) => {
        if (!item.title || !item.link || !item.pubDate) return null

        const date = new Date(item.pubDate)
        if (isNaN(date.getTime())) return null

        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return `- [${item.title}](${item.link}) (${formattedDate})`
      })
      .filter(Boolean)

    if (posts.length === 0) {
      return 'Nenhum post encontrado. Visite [riannegreiros.com.br/blog](https://www.riannegreiros.com.br/blog) para ver todos os posts.'
    }

    return (
      posts.join('\n') + '\n\nLeia mais posts em: [riannegreiros.com.br/blog](https://www.riannegreiros.com.br/blog)'
    )
  } catch (error) {
    console.error('RSS fetch error:', error)
    return 'Erro ao carregar posts. Visite [riannegreiros.com.br/blog](https://www.riannegreiros.com.br/blog) para ver todos os posts.'
  }
}
