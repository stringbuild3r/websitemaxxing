import { useState } from 'react'
import './App.css'

function App() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  return (
    <div className="app">
      <header className="header">
        <div className="profile-img">👤</div>
        <nav className="nav">
          <a href="#">agupta62 [at] umd [dot] terpmail [dot] edu </a>
        </nav>
      </header>

      <main className="main">
        <h1 className="title">Hey, I'm Aryan</h1>
        
        <p>I'm based in <a href="#">San Ramon</a> and <a href="#">College Park</a>.</p>
        
        <div className="current-section">
          <p>I'm currently...</p>
          <div className="activity">
            <span>&gt; studying computer science at the University of Maryland 🐢 </span>
          </div>
          <div className="activity">
            <span>&gt; interested in systems programming and would like to dip my toes into compiler development and machine learning</span>
          </div>
        </div>

        <div className="previous-section">
          <p>Previously I...</p>
          <div className="activity">
            <span>&gt; was a student at Quarry Lane School</span>
            <span>&gt; a McDonald's line cook reject</span>
          </div>
        </div>

        <div className="projects-section">
          <p>A few projects I'm working on...</p>
          <div className="project-list">
            <div className="project-item" >
              <span>&gt; a shell that aims to make zsh usable with reproducible shell scripts in rust</span>
            </div>
            <div className="project-item" >
              <span>&gt; a reproduction of GPT-2 in python</span>
            </div>
          </div>
        </div>


        <footer className="footer">
          <p>I'd love to hear from you! want to hire me? or simply wanna chat? feel free to reach out by</p>
          <p>📧 <a href="mailto:aryamangupta52@gmail.com">email</a>, or connect with me on 💼 <a href="https://www.linkedin.com/in/aryaman-gupta-541b61341/">linkedin</a>.</p>
          <p>want to read my thoughts → 📝 <a href="#">blogs </a> (working on the structure of page) </p>
        </footer>
      </main>
    </div>
  )
}

export default App
