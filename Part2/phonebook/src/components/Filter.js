
function Filter({filterData}) {
    return (
        <div>
            Filter shown with: <input onChange={(e) => {
                filterData(e.target.value)
            }} />
        </div>
    );
}

export default Filter;