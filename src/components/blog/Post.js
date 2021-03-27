import './posts.css';
import {Link} from "react-router-dom";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const Post = ({ post, synopsis, key, onClick }) => {
    if(!post) return '';

    return (
        <article key={key} className="post">
            { synopsis ? 
                <LinkTitle post={post} onClick={onClick}/>
                 : 
                <h1>{post.title}</h1>}
            <div className="date">{monthNames[new Date(post.date).getMonth()]} {new Date(post.date).getDate()}, {new Date(post.date).getFullYear()}</div>
            { synopsis ? <div dangerouslySetInnerHTML={{__html: post.description}}></div> : <div dangerouslySetInnerHTML={{__html: post.content}}></div>}
        </article>
    )
}

const LinkTitle = ({ post, onClick }) => {
    return (
        <>
            { onClick === undefined ?
                <Link to={"/posts/" + post._id} className="posts-title"><h3><span className={post.private ? "private" : ''} >{post.title}</span></h3></Link>
                :
                <h3 onClick={() => onClick(post)} className="hover"><span className={post.private ? "private" : ''} >{post.title}</span></h3>
            }
        </>
    )
}

export default Post
