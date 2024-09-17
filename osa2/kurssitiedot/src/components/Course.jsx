const CourseHeader = (props) => {
    return (
        <div>
            <h2>{props.course}</h2>
        </div>
    )
}

const Content = (props) => {
    return (
        props.parts.map(part =>
            <Part key={part.id} part={part.name} exercises={part.exercises} />)
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
    )
}

const Total = (props) => {
    const sumOfExercises = props.parts.reduce(
        (sum, part) => sum + part.exercises, 0);
    return (
        <div>
            <p><b>Number of exercises {sumOfExercises}</b></p>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <CourseHeader course={props.name} />
            <Content parts={props.parts} />
            <Total parts={props.parts} />
        </div>
    )
}

export default Course
