import fs from 'fs'
import MarkdownIt from 'markdown-it'
import { fetchRssData } from './fetchRssData'
import {
  blogFeedUrl,
  githubUsername,
  websiteUrl,
  linkedinUrl,
  linkedinSvgBase64,
  websiteSvgBase64,
} from './config'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

async function generateMarkdown() {
  try {
    const websiteBadge = `[![Website Badge](https://img.shields.io/badge/-Website-3B7EBF?style=for-the-badge&logo=data:image/svg+xml;base64,${websiteSvgBase64})](${websiteUrl})`
    const linkedinBadge = `[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-3B7EBF?style=for-the-badge&logo=data:image/svg+xml;base64,${linkedinSvgBase64})](${linkedinUrl})`
    const githubStatsCardDark = `[![GitHub-Stats-Card-Dark](https://github-readme-stats-three-iota-97.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&include_all_commits=true&card_width=600&custom_title=GitHub%20Open%20Source%20Stats&title_color=3B7EBF&text_color=FFF&icon_color=3B7EBF&hide=contribs&show=reviews,prs_merged,prs_merged_percentage&theme=transparent#gh-dark-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-dark-mode-only)`
    const githubStatsCardLight = `[![GitHub-Stats-Card-Light](https://github-readme-stats-three-iota-97.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&include_all_commits=true&card_width=600&custom_title=GitHub%20Open%20Source%20Stats&title_color=3B7EBF&text_color=474A4E&icon_color=3B7EBF&hide=contribs&show=reviews,prs_merged,prs_merged_percentage&theme=transparent#gh-light-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-light-mode-only)`
    const githubLanguagesStatsCardDark = `[![GitHub-Languages-Stats-Card-Dark](https://github-readme-stats-three-iota-97.vercel.app/api/top-langs?username=${githubUsername}&layout=compact&hide_border=true&card_width=600&custom_title=GitHub%20Languages%20Stats&title_color=3B7EBF&text_color=FFF&icon_color=3B7EBF&theme=transparent#gh-dark-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-dark-mode-only)`
    const githubLanguagesStatsCardLight = `[![GitHub-Languages-Stats-Card-Light](https://github-readme-stats-three-iota-97.vercel.app/api/top-langs?username=${githubUsername}&layout=compact&hide_border=true&card_width=600&custom_title=GitHub%20Languages%20Stats&title_color=3B7EBF&text_color=474A4E&icon_color=3B7EBF&theme=transparent#gh-light-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-light-mode-only)`

    const recentPostsMarkdown = await fetchRssData(blogFeedUrl)

    const markdownText = `
<div align="center">

  ${websiteBadge} ${linkedinBadge}

  ---

  ${githubStatsCardDark}
  ${githubStatsCardLight}
  ${githubLanguagesStatsCardDark}
  ${githubLanguagesStatsCardLight}

</div>

---

## Posts recentes

${recentPostsMarkdown}
`

    const renderedMarkdown = md.render(markdownText)

    fs.writeFile('README.md', renderedMarkdown, (error) => {
      if (error) throw new Error(`Something went wrong: ${error}.`)
      console.log('✅ README.md file was successfully generated.')
    })
  } catch (error) {
    console.error(`Error generating markdown: ${error}`)
  }
}

generateMarkdown()
