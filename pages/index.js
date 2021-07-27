import { useRouter } from 'next/router';
import Link from 'next/link';

const Home = ({ posts, page }) => {
  const router = useRouter()
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {
          posts.map(post => (
            <Link href={'/posts/' + post.id} key={post.id}>
              <h3 style={{border: '2px solid darkblue', borderRadius: '10px', margin: '18px', padding: '5px', backgroundColor: 'whiteSmoke', cursor: 'pointer'}}>{post.title}</h3>
            </Link>
          ))
        }
      </ul>
      <button onClick={() => router.push(page > 1 ? `?_page=${page - 1}&_limit=10` : `?_page=${page}&_limit=10`)}>Previous</button>
      <button onClick={() => router.push(`?_page=${page + 1}&_limit=10`)}>Next</button>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const { query: { _page = null } } = ctx;
  let pageNumber = _page
  const API_URL = 'https://jsonplaceholder.typicode.com/posts';
  if(pageNumber == null ){
    pageNumber = 1;
  }
  const res = await fetch(`${API_URL}?_page=${pageNumber}&_limit=10`);
  const data = await res.json();
  return {
    posts: data,
    page: +pageNumber
  };
}

export default Home;