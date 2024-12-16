const path = require('path');
const packegeJson = require('./package.json');

const projectName = packegeJson.name;

// Project configuration
const PROJECT_CONFIG = {
  name: projectName,
  buildDir: path.join(__dirname, 'build'),
  sandboxDir: `/var/www/sandboxes/${projectName}/`,
  PORT: 3000,
};

// Build configuration
const BUILD_CONFIG = {
  loader: { '.js': 'jsx' },
  minify: true,
  sourcemap: true,
  treeShaking: true,
  alias: {
    '@app': path.resolve(__dirname, 'src'),
  },
  bundle: true,
};

// Apps configuration
const APPS = [
  {
    name: 'app',
    entryPoint: 'src/index.js',
    outputName: 'bundle',
    rootId: 'app',
    targetDir: '',
    buildDir: ''
  },
];

// HTML template function
const createNginxHtmlContent = (app, projectName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="icon" href="/favicon.ico" />
  <title>Resume</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
  <link rel="stylesheet" href="./resume.css" />
  <link rel="stylesheet" href="./generate.css" />
  <script defer src="/${projectName}/${app.targetDir}/${app.outputName}.js"></script>
  <style>
    *, *:after, *:before {
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="${app.rootId}">
  <div id="resume-container">
      <main>
        <header>
          <div>
            <h1 id="name">UTKARSH GUPTA</h1>
            <h3 id="position" className="primary-color">SDE</h3>
          </div>
          <div id="contact">
            <a href="tel:+91 7510034044" className="item">
              <span>+91 7510034044</span>
              <i className="bi bi-telephone-fill primary-color"></i>
            </a>

            <a href="mailto:gupta13utkarsh@gmail.com" className="item">
              <span>gupta13utkarsh@gmail.com</span>
              <i className="bi bi-envelope-fill primary-color"></i>
            </a>

            <a href="https://www.linkedin.com/in/utkarsh-gupta-1606a3137" className="item">
              <span>linkedin.com/in/utkarsh-gupta-1606a3137</span>
              <i className="bi bi-linkedin primary-color"></i>
            </a>
          </div>
        </header>
        <div id="container">
          <div>
            <section id="experience">
              <h3>EXPERIENCE</h3>

              <div className="body">
                <div className="position">SDE 1</div>
                <div className="company primary-color">BlogVault</div>
                <div className="extra">
                  <div className="item">
                    <i className="bi bi-geo-alt primary-color"></i>
                    <span>Bangalore, India</span>
                  </div>
                  <div className="item">
                    <i className="bi bi-calendar3"></i>
                    <span>Feb 2022 - Present</span>
                  </div>
                </div>

                <div className="contribution">
                  <div className="title">AI-Powered Development Assistance Application</div>
                  <div className="highlights">
                    <ul>

                      <li>Spearheaded the full-stack development of <b>'Amoeba'</b>, an AI-powered internal web
                        application
                        that streamlined software engineering processes, leveraging <b>Ruby on Rails</b>, <b>React</b>,
                        <b>Redux</b>, <b>MySQL</b>, and <b>Material UI</b>.
                      </li>

                      <li>Architected and delivered a robust <b>multi-tenant system</b> with <b>RESTful APIs</b>, ensuring
                        scalable performance for over <b>100 concurrent users</b>.</li>

                      <li>Developed and released an open-source <b>Ruby gem library</b>, enabling seamless backend
                        integration, feature extension, and automated script generation for AI-driven projects.</li>

                      <li>Revamped the company dashboard by independently gathering requirements, implementing backend
                        logic,
                        APIs, and crafting a modern, responsive frontend.</li>

                      <li>Optimized deployments for <b>Amoeba</b> and sandbox environments using <b>Nginx</b>, automating
                        sandbox creation to enhance developer workflows and cut deployment time by <b>50%</b>.</li>

                    </ul>
                  </div>
                </div>

                <div className="contribution">
                  <div className="title">Company Dashboard Revamp</div>
                  <div className="highlights">
                    <ul>

                      <li>Spearheaded the <b>redesign and modernization</b> of the company’s dashboard, delivering a more
                        intuitive and user-friendly experience</li>

                      <li>Streamlined error and success message handling, API calling, <b>Error Boundaries</b>, achieving
                        a
                        <b>40%</b> reduction in site-wide failures and improving reliability
                      </li>

                      <li>Upgraded the frontend by migrating from <b>Bootstrap 2017</b> to <b>Material UI</b>, resulting
                        in a
                        <b>25%</b> increase in user engagement through a sleek, modern interface
                      </li>

                      <li>Enhanced application responsiveness by optimizing frontend performance with <b>Redux caching
                          strategies</b>, cutting API re-fetch rates and boosting efficiency by <b>30%</b></li>

                    </ul>
                  </div>
                </div>

              </div>

              <div className="body">
                <div className="position">SDE Intern</div>
                <div className="company primary-color">NestoFin</div>
                <div className="extra">
                  <div className="item">
                    <i className="bi bi-geo-alt primary-color"></i>
                    <span>Remote</span>
                  </div>
                  <div className="item">
                    <i className="bi bi-calendar3"></i>
                    <span>Aug 2020 - Oct 2020</span>
                  </div>
                </div>

                <div className="contribution">
                  <div className="title">Developed a complete responsive MERN Stack site</div>
                  <div className="highlights">
                    <ul>

                      <li>Tackled new technologies like <b>Number Authentication</b> during a challenging internship</li>

                      <li>Integrated the <b>Razorpay Payment Gateway</b> for secure transactions</li>

                      <li>Built <b>real-time product availability</b> with <b>Socket.IO</b>, for efficiency</li>

                    </ul>
                  </div>
                </div>

              </div>

            </section>
          </div>
          <div>
            <section id="summary">
              <h3>SUMMARY</h3>
              <p className="body"><em>Innovative and results-driven Software Engineer</em> with over <em>4 years of
                  experience</em> in <em>full-stack development</em>, <em>API integrations</em>, and <em>UI/UX
                  enhancements</em>. Demonstrated expertise in leading <em>complex projects</em>, optimizing <em>system
                  architectures</em>, and delivering <em>scalable, user-centric applications</em>. Adept at leveraging
                <em>modern technologies</em> such as <em>React</em>, <em>Redux</em>, <em>Ruby on Rails</em>, and <em>AI
                  integrations</em> to drive efficiency, enhance user experiences, and support business growth.
              </p>
            </section>
            <section id="achievements">
              <h3>KEY ACHIEVEMENTS</h3>
              <div className="body">

                <div className="item">
                  <i className="bi bi-lightning-charge-fill primary-color"></i>
                  <span><b>Reduced ticket resolution times</b> by 25% across all platforms</span>
                </div>

                <div className="item">
                  <i className="bi bi-lightning-charge-fill primary-color"></i>
                  <span><b>Increased dashboard usability and engagement</b> by 40% due to architectural
                    improvements</span>
                </div>

                <div className="item">
                  <i className="bi bi-lightning-charge-fill primary-color"></i>
                  <span>Designed a <b>highly scalable AI platform</b> adopted by 70% of internal engineering teams within
                    3
                    months</span>
                </div>

              </div>
            </section>
            <section id="skills">
              <h3>SKILLS</h3>
              <div className="body">

                <span className="primary-color">
                  <i className="bi bi-layout-wtf"></i>
                  Frontend:
                </span>
                <span>React, Redux, Material UI, Bootstrap, HTML, CSS, JavaScript, Firebase, jQuery</span>

                <span className="primary-color">
                  <i className="bi bi-hdd-rack"></i>
                  Backend:
                </span>
                <span>Ruby on Rails, Node.js, Express, RESTful APIs, MySQL, MongoDB</span>

                <span className="primary-color">
                  <i className="bi bi-lightbulb"></i>
                  Understanding:
                </span>
                <span>Git, Nginx, DevOps, Socket.IO, System Design, Deployment Automation, AI-Driven Development</span>

                <span className="primary-color">
                  <i className="bi bi-tools"></i>
                  Methodologies:
                </span>
                <span>Agile, Scrum, Waterfall, TDD, BDD</span>

              </div>
            </section>
            <section id="education">
              <h3>EDUCATION</h3>

              <div className="body">
                <div className="degree">B.Tech (CSE)</div>
                <div className="institute primary-color">Jaypee Institute of Information Technology</div>
                <div className="extra">
                  <i className="bi bi-calendar3"></i>
                  <span>Jul 2018 - Jun 2022</span>
                </div>
              </div>

            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
</body>
</html>
`;

const createAppHtmlContent = (app, projectName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="icon" href="/favicon.ico" />
  <title>Resume</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
  <link rel="stylesheet" href="./resume.css" />
  <link rel="stylesheet" href="./generate.css" />
  <script defer src="./${app.outputName}.js"></script>
  <style>
    *, *:after, *:before {
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="${app.rootId}">
    <div id="resume-container">
      <main >
        <header>
          <div>
            <h1 id="name">UTKARSH GUPTA</h1>
            <h3 id="position" className="primary-color">SDE</h3>
          </div>
          <div id="contact">
            <a href="tel:+91 7510034044" className="item">
              <span>+91 7510034044</span>
              <i className="bi bi-telephone-fill primary-color"></i>
            </a>

            <a href="mailto:gupta13utkarsh@gmail.com" className="item">
              <span>gupta13utkarsh@gmail.com</span>
              <i className="bi bi-envelope-fill primary-color"></i>
            </a>

            <a href="https://www.linkedin.com/in/utkarsh-gupta-1606a3137" className="item">
              <span>linkedin.com/in/utkarsh-gupta-1606a3137</span>
              <i className="bi bi-linkedin primary-color"></i>
            </a>
          </div>
        </header>
        <div id="container">
          <div>
            <section id="experience">
              <h3>EXPERIENCE</h3>

              <div className="body">
                <div className="position">SDE 1</div>
                <div className="company primary-color">BlogVault</div>
                <div className="extra">
                  <div className="item">
                    <i className="bi bi-geo-alt primary-color"></i>
                    <span>Bangalore, India</span>
                  </div>
                  <div className="item">
                    <i className="bi bi-calendar3"></i>
                    <span>Feb 2022 - Present</span>
                  </div>
                </div>

                <div className="contribution">
                  <div className="title">AI-Powered Development Assistance Application</div>
                  <div className="highlights">
                    <ul>

                      <li>Spearheaded the full-stack development of <b>'Amoeba'</b>, an AI-powered internal web
                        application
                        that streamlined software engineering processes, leveraging <b>Ruby on Rails</b>, <b>React</b>,
                        <b>Redux</b>, <b>MySQL</b>, and <b>Material UI</b>.
                      </li>

                      <li>Architected and delivered a robust <b>multi-tenant system</b> with <b>RESTful APIs</b>, ensuring
                        scalable performance for over <b>100 concurrent users</b>.</li>

                      <li>Developed and released an open-source <b>Ruby gem library</b>, enabling seamless backend
                        integration, feature extension, and automated script generation for AI-driven projects.</li>

                      <li>Revamped the company dashboard by independently gathering requirements, implementing backend
                        logic,
                        APIs, and crafting a modern, responsive frontend.</li>

                      <li>Optimized deployments for <b>Amoeba</b> and sandbox environments using <b>Nginx</b>, automating
                        sandbox creation to enhance developer workflows and cut deployment time by <b>50%</b>.</li>

                    </ul>
                  </div>
                </div>

                <div className="contribution">
                  <div className="title">Company Dashboard Revamp</div>
                  <div className="highlights">
                    <ul>

                      <li>Spearheaded the <b>redesign and modernization</b> of the company’s dashboard, delivering a more
                        intuitive and user-friendly experience</li>

                      <li>Streamlined error and success message handling, API calling, <b>Error Boundaries</b>, achieving
                        a
                        <b>40%</b> reduction in site-wide failures and improving reliability
                      </li>

                      <li>Upgraded the frontend by migrating from <b>Bootstrap 2017</b> to <b>Material UI</b>, resulting
                        in a
                        <b>25%</b> increase in user engagement through a sleek, modern interface
                      </li>

                      <li>Enhanced application responsiveness by optimizing frontend performance with <b>Redux caching
                          strategies</b>, cutting API re-fetch rates and boosting efficiency by <b>30%</b></li>

                    </ul>
                  </div>
                </div>

              </div>

              <div className="body">
                <div className="position">SDE Intern</div>
                <div className="company primary-color">NestoFin</div>
                <div className="extra">
                  <div className="item">
                    <i className="bi bi-geo-alt primary-color"></i>
                    <span>Remote</span>
                  </div>
                  <div className="item">
                    <i className="bi bi-calendar3"></i>
                    <span>Aug 2020 - Oct 2020</span>
                  </div>
                </div>

                <div className="contribution">
                  <div className="title">Developed a complete responsive MERN Stack site</div>
                  <div className="highlights">
                    <ul>

                      <li>Tackled new technologies like <b>Number Authentication</b> during a challenging internship</li>

                      <li>Integrated the <b>Razorpay Payment Gateway</b> for secure transactions</li>

                      <li>Built <b>real-time product availability</b> with <b>Socket.IO</b>, for efficiency</li>

                    </ul>
                  </div>
                </div>

              </div>

            </section>
          </div>
          <div>
            <section id="summary">
              <h3>SUMMARY</h3>
              <p className="body"><em>Innovative and results-driven Software Engineer</em> with over <em>4 years of
                  experience</em> in <em>full-stack development</em>, <em>API integrations</em>, and <em>UI/UX
                  enhancements</em>. Demonstrated expertise in leading <em>complex projects</em>, optimizing <em>system
                  architectures</em>, and delivering <em>scalable, user-centric applications</em>. Adept at leveraging
                <em>modern technologies</em> such as <em>React</em>, <em>Redux</em>, <em>Ruby on Rails</em>, and <em>AI
                  integrations</em> to drive efficiency, enhance user experiences, and support business growth.
              </p>
            </section>
            <section id="achievements">
              <h3>KEY ACHIEVEMENTS</h3>
              <div className="body">

                <div className="item">
                  <i className="bi bi-lightning-charge-fill primary-color"></i>
                  <span><b>Reduced ticket resolution times</b> by 25% across all platforms</span>
                </div>

                <div className="item">
                  <i className="bi bi-lightning-charge-fill primary-color"></i>
                  <span><b>Increased dashboard usability and engagement</b> by 40% due to architectural
                    improvements</span>
                </div>

                <div className="item">
                  <i className="bi bi-lightning-charge-fill primary-color"></i>
                  <span>Designed a <b>highly scalable AI platform</b> adopted by 70% of internal engineering teams within
                    3
                    months</span>
                </div>

              </div>
            </section>
            <section id="skills">
              <h3>SKILLS</h3>
              <div className="body">

                <span className="primary-color">
                  <i className="bi bi-layout-wtf"></i>
                  Frontend:
                </span>
                <span>React, Redux, Material UI, Bootstrap, HTML, CSS, JavaScript, Firebase, jQuery</span>

                <span className="primary-color">
                  <i className="bi bi-hdd-rack"></i>
                  Backend:
                </span>
                <span>Ruby on Rails, Node.js, Express, RESTful APIs, MySQL, MongoDB</span>

                <span className="primary-color">
                  <i className="bi bi-lightbulb"></i>
                  Understanding:
                </span>
                <span>Git, Nginx, DevOps, Socket.IO, System Design, Deployment Automation, AI-Driven Development</span>

                <span className="primary-color">
                  <i className="bi bi-tools"></i>
                  Methodologies:
                </span>
                <span>Agile, Scrum, Waterfall, TDD, BDD</span>

              </div>
            </section>
            <section id="education">
              <h3>EDUCATION</h3>

              <div className="body">
                <div className="degree">B.Tech (CSE)</div>
                <div className="institute primary-color">Jaypee Institute of Information Technology</div>
                <div className="extra">
                  <i className="bi bi-calendar3"></i>
                  <span>Jul 2018 - Jun 2022</span>
                </div>
              </div>

            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  projectName,
  PROJECT_CONFIG,
  BUILD_CONFIG,
  APPS,
  createNginxHtmlContent,
  createAppHtmlContent,
};
