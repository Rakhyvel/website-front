import Posts from './Posts';

const LookupPost = ( {setPost, adminSesh, posts} ) => {
    return (
        <>
            <p>Click on the post you want:</p>
            <Posts posts={posts} adminSesh={adminSesh} onClick={setPost}/>
        </>
    )
}

export default LookupPost
