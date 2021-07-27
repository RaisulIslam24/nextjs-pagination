export const getStaticPaths = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    const paths = data.map(post => {
        return {
            params: { id: post.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async(cxt) => {
    const id = cxt.params.id;
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
    const data = await res.json();

    return {
        props: { post: data}
    }
}

const Details = ({ post }) => {
    return (
        <div>
            <h1>Post Id: {post.id}</h1>
            <h1>Title: {post.title}</h1>
            <p><span style={{fontWeight: 'bold'}}>Description: </span>{post.body}</p>
        </div>
    )
}

export default Details;