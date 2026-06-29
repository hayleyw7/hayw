import { skills } from '../data.js'

export default function Skills() {
  return (
    <section id="two-b" className="main style1 special techspace" aria-label="Technical skills">
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
