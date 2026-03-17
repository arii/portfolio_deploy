/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Award, 
  BookOpen, 
  ExternalLink,
  Terminal,
  ChevronRight,
  Globe,
  Users,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

const Collapsible = ({ children, title, defaultOpen = false }: { children: React.ReactNode, title: string, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className="border border-zinc-100 rounded-xl overflow-hidden mb-4 transition-all duration-300 hover:border-zinc-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-zinc-50/50 hover:bg-zinc-50 transition-colors text-left"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-6 bg-white">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const Section = ({ title, icon: Icon, children, delay = 0, initiallyOpen = true, collapsible = false }: { title: string, icon: any, children: React.ReactNode, delay?: number, initiallyOpen?: boolean, collapsible?: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(initiallyOpen);
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="mb-12 md:mb-16"
    >
      <div 
        className={`flex items-center justify-between mb-6 border-b border-zinc-200 pb-2 ${collapsible ? 'cursor-pointer group' : ''}`}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-zinc-500" />
          <h2 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-900 uppercase text-[10px] md:text-xs letter-spacing-widest">{title}</h2>
        </div>
        {collapsible && (
          <div className="text-zinc-400 group-hover:text-zinc-900 transition-colors">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        )}
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

const ExperienceItem = ({ title, company, period, description, points, link }: { title: string, company: string, period: string, description?: string, points?: string[], link?: string }) => (
  <div className="mb-10 last:mb-0">
    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
      <span className="text-sm font-mono text-zinc-500">{period}</span>
    </div>
    <div className="text-zinc-700 font-medium mb-2">{company}</div>
    {description && <p className="text-zinc-600 mb-4 leading-relaxed text-sm">{description}</p>}
    {points && (
      <ul className="space-y-2">
        {points.map((point, idx) => (
          <li key={idx} className="flex gap-3 text-zinc-600 text-sm leading-relaxed">
            <span className="text-zinc-300 mt-1.5">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const PublicationItem = ({ title, authors, venue, year, link, category }: { title: string, authors: string, venue: string, year: string, link?: string, category?: string }) => (
  <div className="mb-6 group">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        {category && <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1 block">{category}</span>}
        <h4 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              {title} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ) : title}
        </h4>
        <p className="text-xs text-zinc-500 mt-1">{authors}</p>
        <p className="text-xs text-zinc-400 mt-0.5 italic">{venue}, {year}</p>
      </div>
    </div>
  </div>
);

const ProjectItem = ({ title, description, link, imageUrl, tags, contain, noGrayscale }: { title: string, description: string, link?: string, imageUrl?: string, tags?: string[], contain?: boolean, noGrayscale?: boolean }) => (
  <div className="mb-12 last:mb-0 group">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-4">
        <div className="aspect-video bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200 flex items-center justify-center">
          <img 
            src={imageUrl || `https://picsum.photos/seed/${title}/800/450`} 
            alt={title} 
            referrerPolicy="no-referrer"
            className={`w-full h-full ${contain ? 'object-contain p-4' : 'object-cover'} ${noGrayscale ? '' : 'grayscale hover:grayscale-0'} transition-all duration-500`}
          />
        </div>
      </div>
      <div className="md:col-span-8">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors">
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <p className="text-sm text-zinc-600 leading-relaxed mb-4">{description}</p>
        {tags && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-zinc-200">
      {/* Header / Hero */}
      <header className="bg-white border-b border-zinc-100 pt-16 md:pt-24 pb-12 md:pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Ariel Anders <span className="text-zinc-300 font-light">PhD</span></h1>
                <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl leading-relaxed">
                  Roboticist & Senior Software Engineer. Architecting reliable autonomous systems for next-generation robotics.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6 text-[10px] md:text-xs font-mono uppercase tracking-widest">
                <a href="mailto:anders.ariel@gmail.com" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                  <Mail className="w-4 h-4" /> Email
                </a>
                <a href="https://linkedin.com/in/ariel-anders" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="https://github.com/arii" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href="https://scholar.google.com/citations?user=NM6SfiEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                  <Globe className="w-4 h-4" /> Scholar
                </a>
                <a href="https://drive.google.com/file/d/14V6KjfEMO12uwNQAhY1OMy2d-_vkGXK_/view" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                  <FileText className="w-4 h-4" /> Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Main Content */}
          <div className="lg:col-span-8">
            
            <Section title="Professional Experience" icon={Briefcase} collapsible initiallyOpen={true}>
              <ExperienceItem 
                title="Senior Algorithms Developer"
                company="Civ Robotics"
                period="Sept 2025 – Present"
                points={[
                  "Developing core navigation and localization software for autonomous forklifts using C++, Python, and ROS 2.",
                  "Built and optimized IMU drivers and GPS filtering; implemented tilt-compensation logic to refine pose estimation.",
                  "Led root-cause analysis for critical localization drift, increasing fleet uptime significantly.",
                  "Enhanced CI/CD pipeline with python linting and authored AWS IoT certificate tools for containerized robotics software."
                ]}
              />
              <ExperienceItem 
                title="Independent AI Engineering & Research"
                company="Project: Autonomous Fitness Ecosystem & AI DevOps Pipeline"
                period="Jan 2025 – Aug 2025"
                link="https://github.com/arii/hrm"
                description="Dedicated period focused on exploring modern AI tools, RAG systems, and automated DevOps to stay current with emerging technologies and software engineering best practices."
                points={[
                  "Real-time Core: Developed a fitness monitoring dashboard synchronizing live heart rate data from Bluetooth devices to a multi-client web interface via persistent WebSockets; integrated Spotify API and Tabata timers.",
                  "AI Engineering Teammate: Architected a fully automated CI/CD pipeline where Gemini AI performs code reviews, triages GitHub issues, and generates code patches as unified diffs.",
                  "Contextual Intelligence: Engineered a RAG system to inject project documentation, architecture guidelines, and CI logs into AI prompts, ensuring automated reviews align with project-specific standards.",
                  "Technical Debt Management: Implemented proactive extraction of technical debt into actionable GitHub issues orchestrated via GitHub Actions."
                ]}
              />
              <ExperienceItem 
                title="Senior Software Engineer"
                company="Waymo"
                period="Nov 2022 – Dec 2024"
                description="Roboticist in the Planning team, developing onboard motion planning and decision-making software for safe self-driving technology."
                points={[
                  "Focused on improving pullover performance, decreasing user walking distance and congestion.",
                  "Utilized software engineering, robotics, and machine learning to build autonomous driving capabilities."
                ]}
              />
              <ExperienceItem 
                title="Senior Roboticist"
                company="Robust.AI"
                period="May 2021 – Oct 2022"
                link="https://www.robust.ai/"
                description="Joined as the first roboticist hire to help build the world's first industrial-grade cognitive engine."
                points={[
                  "Tech lead for redesigning major architectural components for navigation spanning behavior, perception, and localization.",
                  "Integrated new hardware components into software frameworks and created novel behaviors.",
                  "Wrote production-quality software, tests, and documentation."
                ]}
              />
              <ExperienceItem 
                title="Roboticist"
                company="Robust.AI"
                period="July 2019 – May 2021"
                points={[
                  "Developed robust real-time robot behaviors for indoor navigation in dynamic environments with contextual awareness.",
                  "Lead social navigation work pivotal in raising Series A funding.",
                  "Established and executed testing procedures for robot navigation."
                ]}
              />

              <Collapsible title="Legacy Roles & Internships">
                <div className="space-y-8">
                  <ExperienceItem 
                    title="Researcher"
                    company="Learning and Intelligent Systems, CSAIL MIT"
                    period="2012 – 2019"
                    description="Advised by Leslie P. Kaelbling and Tomas Lozano-Perez."
                    points={[
                      "Research focus: Robot manipulation for household helpers under considerable uncertainty due to inaccurate sensing and imperfect actuation.",
                      "Programmed Willow Garage PR2 robot using ROS, Python, and C++.",
                      "Developed scalable methods for solving complex planar manipulation problems."
                    ]}
                  />
                  <ExperienceItem 
                    title="Graduate Software Engineer Intern"
                    company="Intel Corporation"
                    period="Summer 2014"
                    points={[
                      "Designed and documented design automation software using machine learning techniques.",
                      "Determined proper and efficient simulation points for future Intel Architecture based products."
                    ]}
                  />
                  <ExperienceItem 
                    title="Researcher"
                    company="Bionics Lab, UC Santa Cruz"
                    period="2010 – 2012"
                    description="Advised by Jacob Rosen."
                    points={[
                      "Research focus: CAD/CAM applications in dentistry and autonomous control with mechanical systems.",
                      "Developed UI for robotic programs and a workflow for dental crowning procedures verified experimentally."
                    ]}
                  />
                </div>
              </Collapsible>
            </Section>

            <Section title="Education" icon={GraduationCap} delay={0.1} collapsible initiallyOpen={true}>
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-bold text-zinc-900">PhD & SM in Computer Science and Electrical Engineering</h3>
                    <span className="text-sm font-mono text-zinc-500">2012 – 2019</span>
                  </div>
                  <p className="text-zinc-700 font-medium">Massachusetts Institute of Technology (CSAIL)</p>
                  <p className="text-xs text-zinc-500 mt-1">Minor in feedback and control systems with courses from Mechanical and AeroAstro.</p>
                  <div className="mt-4 p-5 bg-zinc-50 rounded-xl border border-zinc-100">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Research Focus</h4>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      Focused on <span className="text-zinc-900 font-medium">reliable robotic manipulation under uncertainty</span>. Aimed to bridge the gap between theoretical AI and practical challenges of deploying helpful robots in complex household environments. GPA: 4.9/5.0
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-bold text-zinc-900">BS in Computer Engineering</h3>
                    <span className="text-sm font-mono text-zinc-500">2008 – 2012</span>
                  </div>
                  <p className="text-zinc-700 font-medium">University of California, Santa Cruz</p>
                  <p className="text-sm text-zinc-500 mt-2 italic">Regents Scholar. Capstone: improving performance of arithmetic functions for Oracle Database using C and vectorized hardware instructions (SSE). GPA: 3.96/4.0</p>
                </div>
              </div>
            </Section>

            <Section title="PhD Research & Thesis" icon={BookOpen} delay={0.15} collapsible initiallyOpen={true}>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">
                  Reliably arranging objects: a conformant planning approach to robot manipulation
                </h3>
                <p className="text-zinc-600 leading-relaxed mb-6">
                  This work focuses on arranging objects into desired configurations using a robot under substantial uncertainty due to inaccurate sensing, control, and imperfect knowledge of physical properties (e.g., friction, mass). By using uncertainty-reducing actions like pushing and a conformant planner, I enabled robust assembly in both simulation and real-world experiments on a PR2 robot.
                </p>
              </div>

              <Collapsible title="Thesis Abstract & Detailed Research">
                <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-100 mb-8">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">Thesis Abstract</h4>
                  <div className="space-y-4 text-sm text-zinc-600 leading-relaxed">
                    <p>
                      We explore the conformant planning approach to reliable robot manipulation, specifically tackling the problem of pushing multiple planar objects simultaneously to achieve a specified arrangement without external sensing.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <span className="font-bold text-zinc-900 block mb-1">1. Plan Improvement</span>
                        <p>Augments deterministic plans by adding fixtures (movable obstacles) to push parts against, using optimization for ideal placement.</p>
                      </div>
                      <div>
                        <span className="font-bold text-zinc-900 block mb-1">2. Planning by Construction</span>
                        <p>Reformulates conformant planning as a belief-state problem, using physics-based simulations and supervised learning for transitions.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <ProjectItem 
                    title="PR2 reliably arranging six blocks"
                    link="https://arii.github.io/phd/sixblock.mp4"
                    imageUrl="https://arii.github.io/phd/sixblock.png"
                    description="The robot assembles 1-inch blocks using a mixture of placing and pushing actions. This execution of a conformant plan uses machine learning to characterize action uncertainty."
                    tags={["PR2", "Conformant Planning", "Manipulation"]}
                  />
                  
                  <ProjectItem 
                    title="Arranging objects with belief overlay"
                    link="https://arii.github.io/phd/beliefoverlay.avi"
                    imageUrl="https://arii.github.io/phd/beliefoverlay.png"
                    description="A visualization of the robot's belief state during execution. The robot does not use real-time perception; the overlay demonstrates the algorithm's internal state tracking."
                    tags={["Belief State", "Visualization", "Robotics"]}
                  />

                  <ProjectItem 
                    title="PR2 placing blocks"
                    link="https://arii.github.io/phd/placing.mp4"
                    imageUrl="https://arii.github.io/phd/placing.png"
                    description="Experiments characterizing the noise of 'place' actions. Noise arises from blocks sticking to fingers, estimated at ±0.15 inch and up to 15 degrees rotational offset."
                    tags={["Uncertainty", "Characterization", "Experiments"]}
                  />

                  <div className="mb-12 last:mb-0 group">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      <div className="md:col-span-4">
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-square bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
                              <img 
                                src={`https://arii.github.io/phd/tetris${i}.png`} 
                                alt={`Tetris ${i}`} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 text-[10px] font-mono text-zinc-400 text-center">Original vs. Improved Plans</div>
                      </div>
                      <div className="md:col-span-8">
                        <h3 className="text-lg font-bold text-zinc-900 mb-2">Plan improvement with fixture placement</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                          Improving initial plans by adding fixtures to increase reliability. In Tetris-shape merging, the original plan had a 1.9% reliability score under noise, while the fixture-improved plan reached 80.7%.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["Optimization", "Fixtures", "Reliability"].map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <ProjectItem 
                    title="Eric the red robot"
                    imageUrl="https://arii.github.io/phd/eric.png"
                    contain
                    noGrayscale
                    description="Eric is the cartoon robot mascot prevalent in my thesis defense, based on Leslie P. Kaelbling's stick figure drawings. Includes versions like 'Eric with a picketing sign' and 'Blindfolded Eric'."
                    tags={["Mascot", "Thesis Defense", "Illustration"]}
                  />
                </div>
              </Collapsible>
            </Section>

            <Section title="Academic & Impact Projects" icon={Terminal} delay={0.25} collapsible initiallyOpen={true}>
              <div className="mb-8 p-5 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-sm text-zinc-600 leading-relaxed italic">
                  As a graduate and undergraduate student studying engineering, I participated in many hands-on projects. Some of these were created from coursework and research. Other projects are motivated by my interest in mental wellness and sustainability.
                </p>
              </div>
              
              <ProjectItem 
                title="Boop Light Detector"
                link="http://arii.github.io/boop/"
                imageUrl="https://arii.github.io/img/app_testing.jpg"
                description="An iOS app developed to detect levels of light and interpret this information with sound. It allows blind and visually impaired users to detect whether lights are on or off, covering a range from sensing daylight to checking router indicator lights. Downloaded over 6,000 times."
                tags={["iOS", "Accessibility", "Signal Processing"]}
              />
              
              <Collapsible title="More Academic Projects">
                <div className="space-y-12">
                  <ProjectItem 
                    title="Light Therapy at MIT"
                    link="http://news.mit.edu/2016/stata-center-phone-booths-light-therapy-aims-to-brighten-moods-0729"
                    imageUrl="https://arii.github.io/img/light.jpg"
                    description="Placed public artificial lightboxes around MIT's campus for people with Seasonal Affective Disorder (SAD). Funded by the MindHandHeart Innovation Fund to ameliorate the effects of the northeastern winter."
                    tags={["Wellness", "Community", "MIT"]}
                  />
                  
                  <ProjectItem 
                    title="BeaverWorks Summer Institute"
                    link="https://beaverworks.ll.mit.edu/CMS/bw/bwsi"
                    imageUrl="https://arii.github.io/img/bw.jpg"
                    description="Lead associate and technical instructor for the RACECAR course. Students programmed small robotic cars to autonomously navigate a racetrack. Lectures on planning and visual servoing are available on YouTube."
                    tags={["Teaching", "Robotics", "Autonomy"]}
                  />
                  
                  <ProjectItem 
                    title="Delivery Bots"
                    link="http://news.mit.edu/2015/csail-delivery-robots-collaborate-0810"
                    imageUrl="https://arii.github.io/img/beer.png"
                    description="Multi-robot project for unpredictable environments. Best paper finalist at RSS 2015 and extended for the International Journal of Robotics Research (IJRR)."
                    tags={["Research", "Multi-Agent", "RSS"]}
                  />
                  
                  <ProjectItem 
                    title="RoboCon 2016 Webdesigner"
                    link="http://robocon.mit.edu"
                    imageUrl="https://arii.github.io/img/robocon.jpg"
                    description="Committee chairperson and website creator for RoboCon, a student workshop for robotics across any department or lab at MIT."
                    tags={["Leadership", "Web Dev", "Community"]}
                  />
                  
                  <ProjectItem 
                    title="Drone Line Following Project"
                    link="https://www.youtube.com/watch?v=f5l8GA1PHm8&t=1s"
                    imageUrl="https://arii.github.io/img/drone.jpg"
                    description="Final project for 16.31 Feedback and Control Systems. Programmed a Rolling Spider Parrot drone to use its onboard camera to follow a line on the ground."
                    tags={["Control Systems", "Computer Vision", "Drones"]}
                  />
                  
                  <ProjectItem 
                    title="Learning SWAG"
                    link="http://dspace.mit.edu/handle/1721.1/91034"
                    imageUrl="https://arii.github.io/img/thesis_wordle.png"
                    description="Master's thesis: 'Learning a Strategy for Whole Arm Grasping'. Used reinforcement learning for dynamic whole-arm grasps using single and bimanual manipulation."
                    tags={["Reinforcement Learning", "Manipulation", "Thesis"]}
                  />
                  
                  <ProjectItem 
                    title="Lab Energy Assessment Center"
                    link="http://leac.mit.edu"
                    imageUrl="https://arii.github.io/img/leac.jpg"
                    description="Lead Technology Developer for LEAC. Created network monitoring software to analyze lab energy consumption and promote resourceful energy usage on campus."
                    tags={["Sustainability", "Software", "Energy"]}
                  />
                </div>
              </Collapsible>
            </Section>

            <Section title="Publications" icon={BookOpen} delay={0.3} collapsible initiallyOpen={true}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">Theses & Major Works</h3>
                  <PublicationItem 
                    category="Ph.D. Dissertation"
                    title="Reliably Arranging Objects: A Conformant Planning Approach to Robot Manipulation"
                    authors="Ariel S. Anders"
                    venue="MIT DSpace"
                    year="2019"
                    link="https://dspace.mit.edu/bitstream/handle/1721.1/121649/1102048229-MIT.pdf?sequence=1&isAllowed=y"
                  />
                  <PublicationItem 
                    category="Master's Thesis"
                    title="Learning a Strategy for Whole-Arm Grasping"
                    authors="Ariel S. Anders"
                    venue="MIT"
                    year="2014"
                  />
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">Conference & Journal Papers</h3>
                  <PublicationItem 
                    title="Reliably Arranging Objects in Uncertain Domains"
                    authors="Anders, Ariel S., Leslie P. Kaelbling, and Tomas Lozano-Perez"
                    venue="IEEE International Conference on Robotics and Automation (ICRA)"
                    year="2018"
                    link="https://scholar.google.com/citations?user=NM6SfiEAAAAJ&hl=en"
                  />
                  <PublicationItem 
                    title="Policy Search for Multi-Robot Coordination under Uncertainty"
                    authors="Amato, C., G.D. Konidaris, A. Anders, G. Cruz, J.P. How, and L.P. Kaelbling"
                    venue="The International Journal of Robotics Research (IJRR)"
                    year="2016"
                    link="https://scholar.google.com/citations?user=NM6SfiEAAAAJ&hl=en"
                  />
                  <PublicationItem 
                    title="Electrowetting-on-dielectric Actuation of a Vertical Translation and Angular Manipulation Stage"
                    authors="Preston, Daniel J., Ariel Anders, et al."
                    venue="Applied Physics Letters"
                    year="2016"
                  />
                  <PublicationItem 
                    title="Active Fume Hood Sash Height Monitoring with Audible Feedback"
                    authors="Ariel Anders, et al."
                    venue="Energy Reports"
                    year="2018"
                  />
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">Education & Outreach</h3>
                  <PublicationItem 
                    title="Programming Self-Driving Race Cars at MIT: Project-Based, Collaborative, Algorithmic Robotics for High School Students"
                    authors="Ariel Anders, and Sertac Karaman"
                    venue="Integrated STEM Education Conference (ISEC)"
                    year="2017"
                    link="https://dspace.mit.edu/bitstream/handle/1721.1/114816/anders-isec-17.pdf?sequence=1"
                  />
                </div>

                <div className="pt-4">
                  <a 
                    href="https://scholar.google.com/citations?user=NM6SfiEAAAAJ&hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
                  >
                    View complete list on Google Scholar <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Section>

          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4">
            
            <div className="sticky top-8 space-y-16">
              
              <Section title="Honors & Recognition" icon={Award} collapsible initiallyOpen={true}>
                <div className="space-y-8">
                  <div className="group">
                    <a href="https://robohub.org/30-women-in-robotics-you-need-to-know-about-2020/" target="_blank" rel="noopener noreferrer" className="block">
                      <h4 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors flex items-center gap-1">
                        Robohub's 30 Women in Robotics <ExternalLink className="w-3 h-3" />
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Named one of the global leaders in robotics to know about (2020).</p>
                    </a>
                  </div>
                  <div className="group">
                    <a href="https://oge.mit.edu/community-belonging/awards-recognition/celebration-of-graduate-women/" target="_blank" rel="noopener noreferrer" className="block">
                      <h4 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors flex items-center gap-1">
                        MIT Graduate Women of Excellence <ExternalLink className="w-3 h-3" />
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Recognized for exceptional leadership and drive to improve student experience (2017).</p>
                    </a>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">MIT Green Labs Innovation Award</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">$5000 award for developing innovative technology to improve sustainability at MIT (2017).</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">UC Santa Cruz Regents Scholarship</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Most distinguished scholarship at UCSC, awarded for academic excellence.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">UCEM at MIT Scholar</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">University Center of Exemplary Mentoring, Inaugural class of 2015.</p>
                  </div>
                </div>
              </Section>

              <Section title="Technical Skills" icon={Code2} collapsible initiallyOpen={true}>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Autonomy</h4>
                    <p className="text-xs text-zinc-700">Motion Planning, TAMP, Social Navigation, Behavior Trees, Mobile Manipulation</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Languages</h4>
                    <p className="text-xs text-zinc-700">Python, C++, TypeScript, Matlab, SQL, Shell (Bash/Zsh)</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Tools & OS</h4>
                    <p className="text-xs text-zinc-700">ROS 1/2, Linux, GitHub Actions, Gemini API, Docker, AWS IoT, Unix, Mac, Windows</p>
                  </div>
                </div>
              </Section>

              <Section title="Teaching & Leadership" icon={Users} collapsible initiallyOpen={true}>
                <div className="space-y-8">
                  <div className="group">
                    <a href="https://www.eecs.mit.edu/2022-eecs-awards/" target="_blank" rel="noopener noreferrer" className="block">
                      <h4 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors flex items-center gap-1">
                        MIT EECS Teaching Award <ExternalLink className="w-3 h-3" />
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Frederick C. Hennie III Award for extraordinary dedication to instruction (2017).</p>
                    </a>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Educational Outreach</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Instructor for MIT Beaver Works Summer Institute and undergraduate robotics labs.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Beer Bots</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">2nd place at CSAIL Research Highlights, Spring 2015.</p>
                  </div>
                </div>
              </Section>

              <Section title="Impact Projects" icon={Lightbulb} collapsible initiallyOpen={true}>
                <div className="space-y-8">
                  <div className="group">
                    <h4 className="text-sm font-bold text-zinc-900">Accessible Tech</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Developed "Boop Light Detector" iOS app to assist people with vision impairment. Over 6000 downloads.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Campus Wellness</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Secured grants to install therapy lamps across MIT campus to combat SAD.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">Lab Sustainability</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Research on improving laboratory fume hood efficiency and safety feedback.</p>
                  </div>
                </div>
              </Section>


            </div>
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-zinc-100 py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest mb-2">© {new Date().getFullYear()} Ariel Anders, PhD</p>
            <p className="text-[10px] font-mono text-zinc-400 italic">
              "Try to be a rainbow in someone's cloud." – Maya Angelou
            </p>
          </div>
          <div className="flex gap-8">
            <a href="https://linkedin.com/in/ariel-anders" className="text-zinc-300 hover:text-zinc-900 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="https://github.com/arii" className="text-zinc-300 hover:text-zinc-900 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="mailto:anders.ariel@gmail.com" className="text-zinc-300 hover:text-zinc-900 transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
