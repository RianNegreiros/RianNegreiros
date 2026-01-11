import { writeFile } from 'fs/promises'
import { fetchRssData } from './fetchRssData'
import { blogFeedUrl } from './config'
import { createBadges, createStats, createLanguageStats } from './generators'

async function generateReadme() {
  try {
    const badges = createBadges()
    const stats = createStats()
    const languageStats = createLanguageStats()
    const recentPosts = await fetchRssData(blogFeedUrl)

    const readme = `<div align="center">

${badges}

---

${stats.dark}
${stats.light}
${languageStats.dark}
${languageStats.light}
</div>

## Posts recentes

${recentPosts}
`
    await writeFile('README.md', readme)
    console.log('README.md generated successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

generateReadme()
