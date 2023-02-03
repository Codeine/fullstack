const Header = ({ text }) => <h1>{text}</h1>

const Total = ({ parts }) => {
    const calcTotal = () => {
        const initialValue = 0
        return parts.reduce(
            (accumulator, currentValue) => accumulator + currentValue.exercises,
            initialValue
        )
    }

    return (
        <p><b>Total of {calcTotal()} exercises</b></p>
    )
}

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)


const Course = ({ course }) => {
    return (
        <div>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course