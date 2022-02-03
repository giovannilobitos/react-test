const Error = ({ error }) => {
    return (
        <div>
            { error?.message || error }
        </div>
    )
}

export default Error;
