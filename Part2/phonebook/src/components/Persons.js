
function Persons({ handleDelete, name, number }) {

    return (
        <div>
            {name} {number}
            <button onClick={handleDelete}>Delete</button>
        </div>);
}

export default Persons;