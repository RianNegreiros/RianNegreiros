import { githubUsername, websiteUrl, linkedinUrl, linkedinSvgBase64, websiteSvgBase64 } from './config'

const createBadge = (label: string, url: string, svg: string) =>
  `[![${label}](https://img.shields.io/badge/-${label}-3B7EBF?style=for-the-badge&logo=data:image/svg+xml;base64,${svg})](${url})`

const createGitHubStats = (theme: 'dark' | 'light') => {
  const textColor = theme === 'dark' ? 'FFF' : '474A4E'
  const params = new URLSearchParams({
    username: githubUsername,
    show_icons: 'true',
    hide_border: 'true',
    include_all_commits: 'true',
    card_width: '600',
    custom_title: 'GitHub Open Source Stats',
    title_color: '3B7EBF',
    text_color: textColor,
    icon_color: '3B7EBF',
    hide: 'contribs',
    show: 'reviews,prs_merged,prs_merged_percentage',
    theme: 'transparent',
  })

  const modeFragment = `#gh-${theme}-mode-only`
  const url = `https://github-readme-stats-9l7g.vercel.app/api?${params}${modeFragment}`
  const linkUrl = `https://github.com/${githubUsername}/${githubUsername}${modeFragment}`

  return `[![GitHub Stats](${url})](${linkUrl})`
}

const createLanguageStatsHelper = (theme: 'dark' | 'light') => {
  const textColor = theme === 'dark' ? 'FFF' : '474A4E'
  const params = new URLSearchParams({
    username: githubUsername,
    layout: 'compact',
    hide_border: 'true',
    card_width: '600',
    custom_title: 'GitHub Languages Stats',
    title_color: '3B7EBF',
    text_color: textColor,
    icon_color: '3B7EBF',
    theme: 'transparent',
    hide: 'typescript,javascript',
  })

  const modeFragment = `#gh-${theme}-mode-only`
  const url = `https://github-readme-stats-9l7g.vercel.app/api/top-langs?${params}${modeFragment}`
  const linkUrl = `https://github.com/${githubUsername}/${githubUsername}${modeFragment}`

  return `[![Top Languages](${url})](${linkUrl})`
}

export const createBadges = () =>
  [createBadge('Website', websiteUrl, websiteSvgBase64), createBadge('LinkedIn', linkedinUrl, linkedinSvgBase64)].join(
    ' ',
  )

export const createStats = () => ({
  dark: createGitHubStats('dark'),
  light: createGitHubStats('light'),
})

export const createLanguageStats = () => ({
  dark: createLanguageStatsHelper('dark'),
  light: createLanguageStatsHelper('light'),
})
