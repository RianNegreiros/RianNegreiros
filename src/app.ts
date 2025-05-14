import fs from 'fs'
import MarkdownIt from 'markdown-it'
import { fetchRssData } from './fetchRssData'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

const blogFeedUrl = 'https://riannegreiros.xyz/api/rss'
const githubUsername = 'RianNegreiros'
const websiteUrl = 'https://www.riannegreiros.xyz'
const linkedinUrl = 'https://linkedin.com/in/riannegreiros'

const linkedinSvgBase64 =
  'PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI3MiIgdmlld0JveD0iMCAwIDcyIDcyIiB3aWR0aD0iNzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNOCw3MiBMNjQsNzIgQzY4LjQxODI3OCw3MiA3Miw2OC40MTgyNzggNzIsNjQgTDcyLDggQzcyLDMuNTgxNzIyIDY4LjQxODI3OCwtOC4xMTYyNDUwMWUtMTYgNjQsMCBMOCwwIEMzLjU4MTcyMiw4LjExNjI0NTAxZS0xNiAtNS40MTA4MzAwMWUtMTYsMy41ODE3MjIgMCw4IEwwLDY0IEM1LjQxMDgzMDAxZS0xNiw2OC40MTgyNzggMy41ODE3MjIsNzIgOCw3MiBaIiBmaWxsPSIjMDA3RUJCIi8+PHBhdGggZD0iTTYyLDYyIEw1MS4zMTU2MjUsNjIgTDUxLjMxNTYyNSw0My44MDIxMTQ5IEM1MS4zMTU2MjUsMzguODEyNzU0MiA0OS40MTk3OTE3LDM2LjAyNDUzMjMgNDUuNDcwNzAzMSwzNi4wMjQ1MzIzIEM0MS4xNzQ2MDk0LDM2LjAyNDUzMjMgMzguOTMwMDc4MSwzOC45MjYxMTAzIDM4LjkzMDA3ODEsNDMuODAyMTE0OSBMMzguOTMwMDc4MSw2MiBMMjguNjMzMzMzMyw2MiBMMjguNjMzMzMzMywyNy4zMzMzMzMzIEwzOC45MzAwNzgxLDI3LjMzMzMzMzMgTDM4LjkzMDA3ODEsMzIuMDAyOTI4MyBDMzguOTMwMDc4MSwzMi4wMDI5MjgzIDQyLjAyNjA0MTcsMjYuMjc0MjE1MSA0OS4zODI1NTIxLDI2LjI3NDIxNTEgQzU2LjczNTY3NzEsMjYuMjc0MjE1MSA2MiwzMC43NjQ0NzA1IDYyLDQwLjA1MTIxMiBMNjIsNjIgWiBNMTYuMzQ5MzQ5LDIyLjc5NDAxMzMgQzEyLjg0MjA1NzMsMjIuNzk0MDEzMyAxMCwxOS45Mjk2NTY3IDEwLDE2LjM5NzAwNjcgQzEwLDEyLjg2NDM1NjYgMTIuODQyMDU3MywxMCAxNi4zNDkzNDksMTAgQzE5Ljg1NjY0MDYsMTAgMjIuNjk3MDA1MiwxMi44NjQzNTY2IDIyLjY5NzAwNTIsMTYuMzk3MDA2NyBDMjIuNjk3MDA1MiwxOS45Mjk2NTY3IDE5Ljg1NjY0MDYsMjIuNzk0MDEzMyAxNi4zNDkzNDksMjIuNzk0MDEzMyBaIE0xMS4wMzI1NTIxLDYyIEwyMS43Njk0MDEsNjIgTDIxLjc2OTQwMSwyNy4zMzMzMzMzIEwxMS4wMzI1NTIxLDI3LjMzMzMzMzMgTDExLjAzMjU1MjEsNjIgWiIgZmlsbD0iI0ZGRiIvPjwvZz48L3N2Zz4='
const websiteSvgBase64 =
  'PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMjU2LjAwMDAwMHB0IiBoZWlnaHQ9IjI1Ni4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDI1Ni4wMDAwMDAgMjU2LjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMjU2LjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTAgMTI4MCBsMCAtMTI4MCAxMjgwIDAgMTI4MCAwIDAgMTI4MCAwIDEyODAgLTEyODAgMCAtMTI4MCAwIDAKLTEyODB6IG0xNDEyIDUwMCBjNzAgLTI2IDExOCAtNjcgMTUyIC0xMzAgMzMgLTYwIDQ0IC0xNTIgMjcgLTIxNSAtMTQgLTU1Ci02OCAtMTM4IC04MyAtMTI5IC02IDQgLTggMyAtNCAtNCA5IC0xNSAtNzQgLTYyIC0xMjEgLTY3IGwtMzggLTUgMzggMTAgYzQ1CjEyIDkzIDM2IDEwMiA1MSA1IDcgMiA4IC0xMSAxIC00MSAtMjIgLTkzIC00MiAtMTA4IC00MiAtOSAwIC0xOSAtNyAtMjIgLTE1Ci01IC0xMSAtMjQgLTE1IC04MSAtMTUgbC03NCAwIDMgNTggMyA1NyA4NSA2IGM5MSA1IDEyNSAxNiAxNTEgNDUgNzYgODcgNTkKMjE3IC0zNiAyNzEgLTM1IDIwIC01NSAyMyAtMTQ3IDIzIGwtMTA4IDAgMCAtMzkgYzAgLTY1IC02IC03MSAtNjUgLTcxIGwtNTMKMCAtNyAxMDQgYy00IDU3IC00IDEwOSAtMSAxMTUgNSA3IDY1IDExIDE3NiAxMSAxNDQgMCAxNzcgLTMgMjIyIC0yMHogbS0yNzcKLTMzNSBjMCAtMTcgLTggLTIwIC01NCAtMjMgLTU1IC0zIC03NCA3IC02NCAzNSA0IDEwIDIxIDEzIDYyIDExIDQ4IC0zIDU2IC02CjU2IC0yM3oiLz4KPC9nPgo8L3N2Zz4K'

async function generateMarkdown() {
  try {
    const websiteBadge = `[![Website Badge](https://img.shields.io/badge/-Website-3B7EBF?style=for-the-badge&logo=data:image/svg+xml;base64,${websiteSvgBase64})](${websiteUrl})`
    const linkedinBadge = `[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-3B7EBF?style=for-the-badge&logo=data:image/svg+xml;base64,${linkedinSvgBase64})](${linkedinUrl})`
    const githubStatsCardDark = `[![GitHub-Stats-Card-Dark](https://github-readme-stats-three-iota-97.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&include_all_commits=true&card_width=600&custom_title=GitHub%20Open%20Source%20Stats&title_color=3B7EBF&text_color=FFF&icon_color=3B7EBF&hide=contribs&show=reviews,prs_merged,prs_merged_percentage&theme=transparent#gh-dark-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-dark-mode-only)`
    const githubStatsCardLight = `[![GitHub-Stats-Card-Light](https://github-readme-stats-three-iota-97.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&include_all_commits=true&card_width=600&custom_title=GitHub%20Open%20Source%20Stats&title_color=3B7EBF&text_color=474A4E&icon_color=3B7EBF&hide=contribs&show=reviews,prs_merged,prs_merged_percentage&theme=transparent#gh-light-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-light-mode-only)`
    const githubLanguagesStatsCardDark = `[![GitHub-Languages-Stats-Card-Dark](https://github-readme-stats-three-iota-97.app/api/top-langs?username=${githubUsername}&layout=compact&hide_border=true&card_width=600&custom_title=GitHub%20Languages%20Stats&title_color=3B7EBF&text_color=FFF&icon_color=3B7EBF&theme=transparent#gh-dark-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-dark-mode-only)`
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
