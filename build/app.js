"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const md = require('markdown-it')({
    html: true, // Enable HTML tags in source
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: true, // Autoconvert URL-like text to links
});
const fetchRssData_1 = require("./fetchRssData");
const blogFeedUrl = 'https://api.riannegreiros.dev/api/rss';
const githubUsername = 'RianNegreiros';
const websiteUrl = 'https://www.riannegreiros.dev';
const linkedinUrl = 'https://linkedin.com/in/riannegreiros';
function generateMarkdown() {
    return __awaiter(this, void 0, void 0, function* () {
        const websiteBadge = `[![Website Badge](https://img.shields.io/badge/-Website-3B7EBF?style=for-the-badge&logo=amp&logoColor=white)](${websiteUrl})`;
        const linkedinBadge = `[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-3B7EBF?style=for-the-badge&logo=Linkedin&logoColor=white)](${linkedinUrl})`;
        const githubStatsCardDark = `[![GitHub-Stats-Card-Dark](https://github-readme-stats-three-iota-97.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&include_all_commits=true&card_width=600&custom_title=GitHub%20Open%20Source%20Stats&title_color=3B7EBF&text_color=FFF&icon_color=3B7EBF&hide=contribs&show=reviews,prs_merged,prs_merged_percentage&theme=transparent#gh-dark-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-dark-mode-only)`;
        const githubStatsCardLight = `[![GitHub-Stats-Card-Light](https://github-readme-stats-three-iota-97.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&include_all_commits=true&card_width=600&custom_title=GitHub%20Open%20Source%20Stats&title_color=3B7EBF&text_color=474A4E&icon_color=3B7EBF&hide=contribs&show=reviews,prs_merged,prs_merged_percentage&theme=transparent#gh-light-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-light-mode-only)`;
        const githubLanguagesStatsCardDark = `[![GitHub-Languages-Stats-Card-Dark](https://github-readme-stats.vercel.app/api/top-langs?username=${githubUsername}&layout=compact&hide_border=true&card_width=600&hide=typescript&custom_title=GitHub%20Languages%20Stats&title_color=3B7EBF&text_color=FFF&icon_color=3B7EBF&theme=transparent#gh-dark-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-dark-mode-only)`;
        const githubLanguagesStatsCardLight = `[![GitHub-Languages-Stats-Card-Light](https://github-readme-stats.vercel.app/api/top-langs?username=${githubUsername}&layout=compact&hide_border=true&card_width=600&hide=typescript&custom_title=GitHub%20Languages%20Stats&title_color=3B7EBF&text_color=474A4E&icon_color=3B7EBF&theme=transparent#gh-light-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-light-mode-only)`;
        const recentPostsMarkdown = yield (0, fetchRssData_1.fetchRssData)(blogFeedUrl);
        let markdownText = `
<div align="center">

  ${websiteBadge} ${linkedinBadge}

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

${recentPostsMarkdown}
`;
        fs.writeFile('README.md', markdownText, (error) => {
            if (error)
                throw new Error(`Something went wrong: ${error}.`);
            console.log(`✅ README.md file was successfully generated.`);
        });
    });
}
generateMarkdown();
