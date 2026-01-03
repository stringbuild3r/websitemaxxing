import { useState, useEffect, useRef } from 'react'
import './App.css'

interface Project {
  name: string
  description: string
  tech: string[]
  link?: string
  status: 'active' | 'completed' | 'wip'
}

interface BlogPost {
  title: string
  date: string
  slug: string
  preview: string
  tags: string[]
}

const projects: Project[] = [
  {
    name: 'rsh',
    description: 'A shell that aims to make zsh usable with reproducible shell scripts',
    tech: ['Rust', 'Systems Programming'],
    status: 'wip',
  },
  {
    name: 'gpt-2-repro',
    description: 'A reproduction of GPT-2 from scratch for learning purposes',
    tech: ['Python', 'PyTorch', 'ML'],
    status: 'wip',
  },
]

const blogPosts: BlogPost[] = [
  {
    title: 'Coming Soon: Building a Shell in Rust',
    date: '2025-01-15',
    slug: 'building-shell-rust',
    preview: 'A deep dive into systems programming and what I learned building rsh...',
    tags: ['rust', 'systems', 'shell'],
  },
  {
    title: 'Coming Soon: Understanding Transformers',
    date: '2025-01-10',
    slug: 'understanding-transformers',
    preview: 'Breaking down the transformer architecture while reproducing GPT-2...',
    tags: ['ml', 'python', 'transformers'],
  },
]

function App() {
  const [activeSection, setActiveSection] = useState<string>('about')
  const [currentCommand, setCurrentCommand] = useState('')
  const [displayedName, setDisplayedName] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const names = ['Aryan', 'Aryaman']
    let currentNameIndex = 0
    let currentCharIndex = 0
    let isDeleting = false
    let timeoutId: number

    const typeText = () => {
      const currentName = names[currentNameIndex]

      if (isDeleting) {
        setDisplayedName(currentName.substring(0, currentCharIndex - 1))
        currentCharIndex--
      } else {
        setDisplayedName(currentName.substring(0, currentCharIndex + 1))
        currentCharIndex++
      }

      let typeSpeed = isDeleting ? 80 : 120

      if (!isDeleting && currentCharIndex === currentName.length) {
        typeSpeed = 2000
        timeoutId = setTimeout(() => {
          isDeleting = true
          typeText()
        }, typeSpeed)
        return
      }

      if (isDeleting && currentCharIndex === 0) {
        isDeleting = false
        currentNameIndex = (currentNameIndex + 1) % names.length
        typeSpeed = 400
      }

      timeoutId = setTimeout(typeText, typeSpeed)
    }

    typeText()
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()

    if (command === 'cat about.txt' || command === 'about') {
      setActiveSection('about')
    } else if (command === 'ls projects/' || command === 'projects') {
      setActiveSection('projects')
    } else if (command === 'ls blog/' || command === 'blog') {
      setActiveSection('blog')
    } else if (command === 'cat contact.txt' || command === 'contact') {
      setActiveSection('contact')
    } else if (command === 'help') {
      setActiveSection('help')
    } else if (command === 'clear') {
      setActiveSection('about')
    }
    setCurrentCommand('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand)
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="terminal-output">
            <div className="output-header">
              <span className="comment"># ~/about.txt</span>
            </div>
            <div className="about-content">
              <pre className="ascii-art">{`
  ╭──────────────────────────────────╮
  │  ${displayedName}${showCursor ? '█' : ' '}                        │
  ╰──────────────────────────────────╯`}</pre>
              <div className="info-block">
                <p><span className="keyword">location</span> <span className="operator">=</span> <span className="string">"San Ramon"</span> <span className="operator">|</span> <span className="string">"College Park"</span></p>
                <p><span className="keyword">education</span> <span className="operator">=</span> <span className="string">"University of Maryland"</span> <span className="comment">// CS @ UMD</span></p>
              </div>

              <div className="section-block">
                <p className="block-header"><span className="function">currently</span><span className="punctuation">()</span> <span className="punctuation">{'{'}</span></p>
                <div className="block-content">
                  <p><span className="bullet">-&gt;</span> studying computer science at UMD</p>
                  <p><span className="bullet">-&gt;</span> interested in <span className="highlight">systems programming</span></p>
                  <p><span className="bullet">-&gt;</span> exploring <span className="highlight">compiler development</span> and <span className="highlight">machine learning</span></p>
                </div>
                <p className="punctuation">{'}'}</p>
              </div>

              <div className="section-block">
                <p className="block-header"><span className="function">previously</span><span className="punctuation">()</span> <span className="punctuation">{'{'}</span></p>
                <div className="block-content">
                  <p><span className="bullet">-&gt;</span> student at Quarry Lane School</p>
                  <p><span className="bullet">-&gt;</span> McDonald's line cook reject <span className="comment">// true story</span></p>
                </div>
                <p className="punctuation">{'}'}</p>
              </div>
            </div>
          </div>
        )

      case 'projects':
        return (
          <div className="terminal-output">
            <div className="output-header">
              <span className="comment"># ls -la ~/projects/</span>
            </div>
            <div className="projects-list">
              <div className="ls-header">
                <span>total {projects.length}</span>
              </div>
              {projects.map((project, index) => (
                <div key={index} className="project-entry">
                  <div className="project-header">
                    <span className="file-permissions">drwxr-xr-x</span>
                    <span className="file-name">
                      <span className="folder-icon">/</span>
                      {project.name}
                    </span>
                    <span className={`status status-${project.status}`}>
                      [{project.status}]
                    </span>
                  </div>
                  <div className="project-details">
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'blog':
        return (
          <div className="terminal-output">
            <div className="output-header">
              <span className="comment"># ls -la ~/blog/</span>
            </div>
            <div className="blog-list">
              <div className="ls-header">
                <span>total {blogPosts.length}</span>
              </div>
              {blogPosts.map((post, index) => (
                <div key={index} className="blog-entry">
                  <div className="blog-header">
                    <span className="file-permissions">-rw-r--r--</span>
                    <span className="blog-date">{post.date}</span>
                    <span className="file-name">{post.slug}.md</span>
                  </div>
                  <div className="blog-details">
                    <p className="blog-title">{post.title}</p>
                    <p className="blog-preview">{post.preview}</p>
                    <div className="blog-tags">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="terminal-output">
            <div className="output-header">
              <span className="comment"># cat ~/contact.txt</span>
            </div>
            <div className="contact-content">
              <pre className="contact-ascii">{`
  ╭─────────────────────────────────────╮
  │         Let's connect!              │
  ╰─────────────────────────────────────╯`}</pre>
              <div className="contact-links">
                <p>
                  <span className="contact-icon">@</span>
                  <span className="contact-label">email</span>
                  <span className="operator">:</span>
                  <a href="mailto:aryamangupta52@gmail.com">aryamangupta52@gmail.com</a>
                </p>
                <p>
                  <span className="contact-icon">@</span>
                  <span className="contact-label">edu</span>
                  <span className="operator">:</span>
                  <a href="mailto:agupta62@umd.edu">agupta62@umd.edu</a>
                </p>
                <p>
                  <span className="contact-icon">#</span>
                  <span className="contact-label">linkedin</span>
                  <span className="operator">:</span>
                  <a href="https://www.linkedin.com/in/aryaman-gupta-541b61341/" target="_blank" rel="noopener noreferrer">in/aryaman-gupta</a>
                </p>
                <p>
                  <span className="contact-icon">$</span>
                  <span className="contact-label">github</span>
                  <span className="operator">:</span>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com/aryan</a>
                </p>
              </div>
            </div>
          </div>
        )

      case 'help':
        return (
          <div className="terminal-output">
            <div className="output-header">
              <span className="comment"># Available commands</span>
            </div>
            <div className="help-content">
              <p><span className="cmd">cat about.txt</span> <span className="comment">- display about info</span></p>
              <p><span className="cmd">ls projects/</span> <span className="comment">- list projects</span></p>
              <p><span className="cmd">ls blog/</span> <span className="comment">- list blog posts</span></p>
              <p><span className="cmd">cat contact.txt</span> <span className="comment">- show contact info</span></p>
              <p><span className="cmd">clear</span> <span className="comment">- clear terminal</span></p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="terminal-container" onClick={focusInput}>
      <div className="terminal-window">
        <div className="terminal-titlebar">
          <div className="titlebar-buttons">
            <span className="btn-close"></span>
            <span className="btn-minimize"></span>
            <span className="btn-maximize"></span>
          </div>
          <div className="titlebar-title">aryan@portfolio:~</div>
          <div className="titlebar-spacer"></div>
        </div>

        <div className="terminal-nav">
          <button
            className={`nav-btn ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleCommand('cat about.txt')}
          >
            <span className="nav-prompt">$</span> about
          </button>
          <button
            className={`nav-btn ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => handleCommand('ls projects/')}
          >
            <span className="nav-prompt">$</span> projects
          </button>
          <button
            className={`nav-btn ${activeSection === 'blog' ? 'active' : ''}`}
            onClick={() => handleCommand('ls blog/')}
          >
            <span className="nav-prompt">$</span> blog
          </button>
          <button
            className={`nav-btn ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleCommand('cat contact.txt')}
          >
            <span className="nav-prompt">$</span> contact
          </button>
        </div>

        <div className="terminal-body">
          <div className="terminal-welcome">
            <pre className="welcome-art">{`
 ╔═══════════════════════════════════════════════════════════════╗
 ║                                                               ║
 ║   Welcome to my corner of the internet.                       ║
 ║   Type 'help' for available commands.                         ║
 ║                                                               ║
 ╚═══════════════════════════════════════════════════════════════╝
            `}</pre>
          </div>

          {renderSection()}

          <div className="terminal-input-line">
            <span className="prompt">
              <span className="prompt-user">aryan</span>
              <span className="prompt-at">@</span>
              <span className="prompt-host">portfolio</span>
              <span className="prompt-colon">:</span>
              <span className="prompt-path">~</span>
              <span className="prompt-dollar">$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
            />
            <span className={`input-cursor ${showCursor ? 'visible' : ''}`}>█</span>
          </div>
        </div>

        <div className="terminal-statusbar">
          <span className="status-item">
            <span className="status-dot"></span>
            online
          </span>
          <span className="status-item">utf-8</span>
          <span className="status-item">ln 1, col 1</span>
        </div>
      </div>
    </div>
  )
}

export default App
