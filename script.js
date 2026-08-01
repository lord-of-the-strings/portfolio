
const DATA = {
  name: "AADITY SETU",
  tagline: "Computer Science Generalist // Retro Computing Enthusiast",

  about: {
    heading: "ABOUT.DAT",
    body: `<p>Hello weary traveller! You have entered an area of the internet owned by @lord-of-the-strings, that is, me!</p>
    <p> I am Aadity Setu, a 19 year old computer science generalist with a keen interest in systems software and algorithms.
<p>I care about software that's fast, small, and doesn't waste anyone's time. This portfolio website has been
built on that same idea: no frameworks, no build step, just HTML/CSS/JS files.</p>
<p>Based in <span style="color:var(--yellow)">Ranchi, India</span>.
Currently a learner who is open to and enthusiastic about open source projects and work.</p>`
  },

  skills: {
    heading: "SKILLS.SYS",
    items: [
      { name: "C", level: 9 },
      { name: "C++",     level: 6 },
      { name: "CSS/Design", level: 5 },
      { name: "SQL",        level: 9 },
      { name: "Java",         level: 9 },
      { name: "Python", level: 9},
      { name: "Rust", level: 6}
    ]
  },

  projects: {
    heading: "PROJECTS.EXE",
    items: [
      {
        title: "Project-Micro",
        detail: "My experimentation with making a tiny linux distro that boots from a floppy on an i386 PC",
        link: "https://github.com/lord-of-the-strings/Project-Micro"
      },
      {
        title: "Parallel Gradient Descent",
        detail: "An unnnecessarily over-engineered experimentation with parallelism and memory corruption in pure C with some GNU stuff. The learning rate is stored in .text section of the code itself which it self-patches and spawns a stunning number of workers for mundane tasks that hardly justify the overhead.",
        link: "https://github.com/lord-of-the-strings/Parallel-Gradient-Descent"
      },
      {
        title: "htype",
        detail: "A bot that mimics the behaviour of a human typist. This project inspired clack by @ThisWasAryan.",
        link: "https://github.com/lord-of-the-strings/htype"
      },
      {
         title: "bookstore",
        detail: "An online marketplace for second hand books currently under development. A Flutter-SpringBoot-PostgreSQL project.",
         link: "https://github.com/lord-of-the-strings/bookstore"
      },
    ]
  },

  contact: {
    heading: "CONTACT.COM",
    rows: [
      { label: "EMAIL:",    value: "aaditysetu@gmail.com", href: "mailto:aaditysetu@gmail.com" },
      { label: "GITHUB:",   value: "github.com/lord-of-the-strings", href: "https://github.com/lord-of-the-strings" },
    ]
  }
};


const ASCII_TITLE = `
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗  ██████╗
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║ ██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║ ██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║ ██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║ ╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═════╝
`;

document.getElementById('ascii-title').textContent = ASCII_TITLE;

const menuDefs = [
  { key: 'about',    file: 'ABOUT',    render: renderAbout },
  { key: 'skills',   file: 'SKILLS',   render: renderSkills },
  { key: 'projects', file: 'PROJECTS', render: renderProjects },
  { key: 'contact',  file: 'CONTACT',  render: renderContact },
];

let activeIndex = 0;

function buildMenu(){
  const list = document.getElementById('menu-list');
  list.innerHTML = '';
  menuDefs.forEach((item, i) => {
    const li = document.createElement('li');
    li.dataset.index = i;
    li.innerHTML = `<span class="num">${i+1}.</span>${item.file}`;
    li.addEventListener('click', () => selectMenu(i));
    list.appendChild(li);
  });
  updateMenuHighlight();
}

function updateMenuHighlight(){
  document.querySelectorAll('#menu-list li').forEach((li,i)=>{
    li.classList.toggle('active', i === activeIndex);
  });
}

function selectMenu(i){
  activeIndex = i;
  updateMenuHighlight();
  menuDefs[i].render();
}

function bar(level, max=10){
  const filled = '█'.repeat(level);
  const empty = '░'.repeat(max - level);
  return `<span class="skill-bar">${filled}<span class="empty">${empty}</span></span>`;
}

function renderAbout(){
  document.getElementById('content-heading').textContent = DATA.about.heading;
  document.getElementById('content-body').innerHTML = DATA.about.body;
}

function renderSkills(){
  document.getElementById('content-heading').textContent = DATA.skills.heading;
  const rows = DATA.skills.items.map(s => `
    <div class="skill-row">
      <span class="skill-name">${s.name}</span>
      ${bar(s.level)}
    </div>`).join('');
  document.getElementById('content-body').innerHTML =
    `<p style="color:var(--gray)">Self-rated, out of 10. Take with a grain of salt.</p>${rows}`;
}

function renderProjects(){
  document.getElementById('content-heading').textContent = DATA.projects.heading;
  const items = DATA.projects.items.map((p, i) => `
    <div class="proj-item" data-i="${i}">
      <div class="proj-title">${p.title}</div>
      <div class="proj-detail">${p.detail} ${p.link ? `<br><a href="${p.link}" target="_blank" rel="noopener">view project →</a>` : ''}</div>
    </div>`).join('');
  document.getElementById('content-body').innerHTML =
    `<p style="color:var(--gray)">Click a title to expand.</p>${items}`;

  document.querySelectorAll('.proj-item').forEach(el => {
    el.addEventListener('click', () => el.classList.toggle('open'));
  });
}

function renderContact(){
  document.getElementById('content-heading').textContent = DATA.contact.heading;
  const rows = DATA.contact.rows.map(r => `
    <div class="contact-row">
      <span class="label">${r.label}</span>
      <a href="${r.href}" target="_blank" rel="noopener">${r.value}</a>
    </div>`).join('');
  document.getElementById('content-body').innerHTML = rows;
}

/* keyboard navigation */
document.addEventListener('keydown', (e) => {
  if (document.getElementById('boot') && !document.getElementById('boot').classList.contains('hidden')) return;
  if (e.key === 'ArrowDown' || e.key==='j'){ e.preventDefault(); activeIndex = (activeIndex+1) % menuDefs.length; updateMenuHighlight(); }
  if (e.key === 'ArrowUp' || e.key==='k'){ e.preventDefault(); activeIndex = (activeIndex-1+menuDefs.length) % menuDefs.length; updateMenuHighlight(); }
  if (e.key === 'Enter'){ menuDefs[activeIndex].render(); }
});

/* boot sequence */
const bootLines = [
  "PORTFOLIO-BIOS",
  "",
  `MAIN PROCESSOR: ${DATA.name}`,
  "",
  "Loading PORTFOLIO.EXE ...",
  "Mounting ABOUT.DAT ... OK",
  "Mounting SKILLS.SYS ... OK",
  "Mounting PROJECTS.EXE ... OK",
  "Mounting CONTACT.COM ... OK",
  "",
  "Starting session...",
];

function runBoot(){
  const el = document.getElementById('boot-text');
  const hint = document.getElementById('boot-hint');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced){
    el.textContent = bootLines.join('\n');
    finishBoot();
    return;
  }

  let i = 0;
  function nextLine(){
    if (i < bootLines.length){
      el.textContent += bootLines[i] + '\n';
      i++;
      setTimeout(nextLine, 90 + Math.random()*70);
    } else {
      hint.style.display = 'block';
    }
  }
  nextLine();

  const skip = () => finishBoot();
  document.getElementById('boot').addEventListener('click', skip, { once:true });
  window.addEventListener('keydown', skip, { once:true });
}

function finishBoot(){
  const boot = document.getElementById('boot');
  boot.classList.add('hidden');
  buildMenu();
  selectMenu(0);
}

runBoot();
