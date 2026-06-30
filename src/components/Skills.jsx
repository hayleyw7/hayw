import { skills } from '../data/skills.js'

export default function Skills() {
  return (
    <section id="skills" className="main style1 special techspace" aria-label="Technical skills">
      <div className="container">
        <ul className="skill-col">
          {skills.map((skill) => (
            <li className="skill" key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
