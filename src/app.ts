import * as fs from "fs";
const md = require("markdown-it")({
  html: true,      // Enable HTML tags in source
  breaks: true,    // Convert '\n' in paragraphs into <br>
  linkify: true    // Autoconvert URL-like text to links
});
import { fetchRssData } from "./fetchRssData";

const blogFeedUrl = "https://personalwebsitebackend.azurewebsites.net/api/posts/rss";
const githubUsername = "RianNegreiros";
const websiteUrl = "https://riannegreiros.dev";
const blogUrl = "https://riannegreiros.dev/posts";
const linkedinUrl = "https://linkedin.com/in/riannegreiros";

async function generateMarkdown() {
  const websiteBadge = `[![Website Badge](https://img.shields.io/badge/-Website-3B7EBF?style=for-the-badge&logo=amp&logoColor=white)](${websiteUrl})`;
  const hashnodeBadge = `[![Blog Badge](https://img.shields.io/badge/-Blog-3B7EBF?style=for-the-badge&logo=Hashnode&logoColor=white)](${blogUrl})`;
  const linkedinBadge = `[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-3B7EBF?style=for-the-badge&logo=Linkedin&logoColor=white)](${linkedinUrl})`;
  const githubStatsCardDark = `[![GitHub-Stats-Card-Dark](https://github-readme-stats-three-iota-97.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&include_all_commits=true&card_width=600&custom_title=GitHub%20Open%20Source%20Stats&title_color=3B7EBF&text_color=FFF&icon_color=3B7EBF&hide=contribs&show=reviews,prs_merged,prs_merged_percentage&theme=transparent#gh-dark-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-dark-mode-only)`;
  const githubStatsCardLight = `[![GitHub-Stats-Card-Light](https://github-readme-stats-three-iota-97.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&include_all_commits=true&card_width=600&custom_title=GitHub%20Open%20Source%20Stats&title_color=3B7EBF&text_color=474A4E&icon_color=3B7EBF&hide=contribs&show=reviews,prs_merged,prs_merged_percentage&theme=transparent#gh-light-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-light-mode-only)`;
  const githubLanguagesStatsCardDark = `[![GitHub-Languages-Stats-Card-Dark](https://github-readme-stats.vercel.app/api/top-langs?username=${githubUsername}&layout=compact&hide_border=true&card_width=600&hide=typescript&custom_title=GitHub%20Languages%20Stats&title_color=3B7EBF&text_color=FFF&icon_color=3B7EBF&theme=transparent#gh-dark-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-dark-mode-only)`;
  const githubLanguagesStatsCardLight = `[![GitHub-Languages-Stats-Card-Light](https://github-readme-stats.vercel.app/api/top-langs?username=${githubUsername}&layout=compact&hide_border=true&card_width=600&hide=typescript&custom_title=GitHub%20Languages%20Stats&title_color=3B7EBF&text_color=474A4E&icon_color=3B7EBF&theme=transparent#gh-light-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-light-mode-only)`;

  const markdownText = `
<div align="center">

  ${websiteBadge} ${hashnodeBadge} ${linkedinBadge}

  ---

  Sou um Desenvolvedor Backend do Rio de Janeiro. Iniciei minha jornada na adolescência, configurando servidores e mods para o jogo DayZ usando Batchfile, Linguagem C, XML e JSON. Mas só após terminar o ensino médio, por influência do meu irmão mais velho, que já trabalhava na área, me guiou a escolha de ingressar na faculdade, dedicando-me integralmente a essa carreira.

  Tenho com experiência em Java, C# e Golang. Tenho foco de trabalhar em aplicações empresarias, por isso estudo as tecnologias e frameworks mais utilizados no mercado, como Spring e .NET Core.
  
  Além disso, sou apaixonado por Golang, uma linguagem que me ajudou a aprender muito sobre desenvolvimento de software. Adoro que a maioria das coisas são feitas sem a abstração de um framework, o que me deu uma visão mais profunda de como os sistemas funcionam.  
  
  ---

  ${githubStatsCardDark}
  ${githubStatsCardLight}
  ${githubLanguagesStatsCardDark}
  ${githubLanguagesStatsCardLight}

</div>

---

## Posts recentes

${await fetchRssData(blogFeedUrl)}
`;

  const result = md.render(markdownText);

  fs.writeFile("README.md", result, (error) => {
    if (error) throw new Error(`Something went wrong: ${error}.`);
    console.log(`✅ README.md file was successfully generated.`);
  });
}

generateMarkdown();
