import './posts.css';
import Post from './Post.js';

const Posts = ({ posts, adminSesh, onClick }) => {
    console.log(posts);
    return (
        <>
            {posts.filter(post => {
                return !post.private || adminSesh;
            }).map(post => {
                return (<Post post={post} synopsis={true} key={post.id} onClick={onClick}/>)
            })}
        </>
    )
}

export default Posts
