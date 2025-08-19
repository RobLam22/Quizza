export function Home(props) {
    return (
        <>
            <h1>Quizza</h1>
            <p>What Do You Know? Do You Know Things? Let's Find Out!</p>
            <button onClick={props.onClick} className="button">
                Find out
            </button>
        </>
    );
}
