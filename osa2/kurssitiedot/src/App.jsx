import Course from './components/Course'

const MainHeader = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const CourseList = (props) => {
  console.log(props)
  return (
    props.courses.map(course =>
      <Course key={course.id} name={course.name} parts={course.parts} />)
  )
}

const App = () => {
  const courses = [{
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
  ]
  return (
    <div>
      <div>
        <MainHeader header='Main Header' />
        <CourseList courses={courses} />
      </div>
    </div>
  )

}

export default App