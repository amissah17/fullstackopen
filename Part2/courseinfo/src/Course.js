const Header = ({ course }) => {

    return <h1>{course}</h1>
}

const Part = ({ name, number }) => {
    return (
        <p>
            {name} {number}
        </p>
    )
}

const Total = ({ parts }) => {
    let newTotal = parts.reduce((total, value) => {
        return total += value.exercises
    }, 0)
    return <b>Number of exercises {newTotal}</b>
}

const Content = ({ parts }) => {
    if(parts.length === 2) {
        return (
        <>
          <Part name={parts[0].name} number={parts[0].exercises} />
          <Part name={parts[1].name} number={parts[1].exercises} />
        </>)
    }
    return (
        <div>
            <Part name={parts[0].name} number={parts[0].exercises} />
            <Part name={parts[1].name} number={parts[1].exercises} />
            <Part name={parts[2].name} number={parts[2].exercises} />
            <Part name={parts[3].name} number={parts[3].exercises} />
        </div>
    )
}

const Course = ({ course }) => {

    return (course.map(({ name, parts }) => {

        return (
            <div key={name}>
                <Header course={name} />
                <Content parts={parts}/>
                <Total parts={parts} />
            </div>
        )
    }))
    

}

export default Course;