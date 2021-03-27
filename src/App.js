import Posts from './components/blog/Posts'
import Post from './components/blog/Post'
import Projects from './components/portfolio/Projects'
import Header from './components/Header.js';
import Auth from './components/Auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Redirect} from 'react-router-dom';
import AddPost from './components/blog/AddPost'
import DeletePost from './components/blog/DeletePost'
import LookupPost from './components/blog/LookupPost'
import AddProject from './components/portfolio/AddProject'
import LookupProject from './components/portfolio/LookupProject'
import DeleteProject from './components/portfolio/DeleteProject'
import Options from './components/Options'
import {useState, useEffect} from 'react';
import "./components/common.css";
import "./components/banner.css";


const getToken = () => {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

const setToken = (userToken) => {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

const App = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({title: "", date: "2021-03-23T00:00:00.000Z", desc: "", private: false});
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [projectDefined, setProjDefined] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const postsFromServer = await fetchPosts();
      await setPosts(postsFromServer.sort((a, b) => new Date(b.date) - new Date(a.date)).map(p => p));
    }
    const getProjects = async () => {
      const projectsFromServer = await fetchProjects();
      await setProjects(projectsFromServer);
    }
    getPosts();
    getProjects();
  }, []);

  const resetPost = async () => {
    await setPost({title: "", date: "2021-03-23T00:00:00.000Z", desc: "", private: false});
  }

  const resetProject = async () => {
    await setProjDefined(false);
    await setProject({title: "", img: "", lang: "", description: "", code: "", download: ""});
  }

  const getPosts = async () => {
    const postsFromServer = await fetchPosts();
    await setPosts(postsFromServer.sort((a, b) => new Date(b.date) - new Date(a.date)).map(p => p));
  }

  const getProjects = async () => {
    const projectsFromServer = await fetchProjects();
    await setProjects(projectsFromServer);
  }

  const assignProject = async (p) => {
    await setProject(p);
    setProjDefined(true);
  }

  const fetchPosts = async () => {
    const res = await fetch('http://josephs-projects.com:5000/posts', {
      method: 'GET'
    });
    const data = res.json();
    return data;
  }

  const fetchProjects = async () => {
    const res = await fetch('http://josephs-projects.com:5000/projects', {
      method: 'GET'
    });
    const data = res.json();
    return data;
  }
  
  const addPost = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify([post, getToken()]));
    
    await fetch('http://josephs-projects.com:5000/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify([post, getToken()])
    });
    await resetPost();

    getPosts();
  }

  const editPost = async (e) => {
    e.preventDefault();
    
    await fetch(`http://josephs-projects.com:5000/posts/${post._id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify([post, getToken()])
    });
    await resetPost();

    getPosts();
  }

  const deletePost = async (e) => {
      e.preventDefault();
  
      await fetch(`http://josephs-projects.com:5000/posts/${post._id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({token: getToken()})
      });
      await resetPost();
  
      getPosts();
  }
 
  const addProject = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify([project, getToken()]));
    
    await fetch('http://josephs-projects.com:5000/projects', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify([project, getToken()])
    });
    await resetProject();

    getProjects();
  }
 
  const editProject = async (e) => {
    e.preventDefault();
    
    await fetch(`http://josephs-projects.com:5000/projects/${project._id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    });
    await resetProject();

    getProjects();
  }

  const deleteProject = async (e) => {
      e.preventDefault();
  
      await fetch(`http://josephs-projects.com:5000/projects/${project._id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({token: getToken()})
      });
      await resetProject();
  
      getProjects();
  }

  return (
    <Router>
      <div className="orange"></div>
      
      <div className="content">
        <Header />
        <main className="posts"> 
          <Switch>
            <Route path="/" exact>
              <Redirect to="/portfolio" />
            </Route>
            <Route path="/portfolio" exact>
              <Projects projects={projects}/>
            </Route>
            <Route path="/posts/:id" exact render = {(props) => {
              return (
                <Post post={posts.filter(p => p._id === props.match.params.id)[0]} synopsis={false}/> 
              )
            }}/>
            <Route path="/posts" exact>
                <h1>Blog</h1>
                <Posts posts={posts} adminSesh={getToken()}/>
            </Route>
            <Route path="/dashboard/add-post" exact>
              { getToken() ? 
                  <AddPost post={post} onPost={addPost} setPost={setPost}/>
                  :
                  <Auth setToken={setToken}/>
                }
            </Route>
            <Route path="/dashboard/edit-post" exact>
                { getToken() ? (
                    !post?.content ?
                      <LookupPost adminSesh={getToken()} setPost={setPost} posts={posts}/>
                      :
                      <AddPost post={post} onPost={editPost} setPost={setPost}/>
                  ) :
                  <Auth setToken={setToken}/>
                }
            </Route>
            <Route path="/dashboard/delete-post" exact>
                { getToken() ? (
                  !post?.content ?
                      <LookupPost adminSesh={getToken()} setPost={setPost} posts={posts}/>
                      :
                      <DeletePost post={post} onDelete={deletePost}/>
                  ) :
                  <Auth setToken={setToken}/>
              }
            </Route>
            <Route path="/dashboard/add-project" exact>
              { getToken() ? 
                  <AddProject project={project} onPost={addProject} setProject={setProject}/>
                  :
                  <Auth setToken={setToken}/>
                }
            </Route>
            <Route path="/dashboard/edit-project" exact>
                { getToken() ? (
                    !projectDefined ?
                      <LookupProject setProject={assignProject} projects={projects}/>
                      :
                      <AddProject project={project} onPost={editProject} setProject={setProject}/>
                  ) :
                  <Auth setToken={setToken}/>
                }
            </Route>
            <Route path="/dashboard/delete-project" exact>
                { getToken() ? (
                    !projectDefined ?
                      <LookupProject setProject={assignProject} projects={projects}/>
                      :
                      <DeleteProject project={project} onDelete={deleteProject}/>
                  ) :
                  <Auth setToken={setToken}/>
              }
            </Route>
            <Route path="/dashboard" render = {(props) => {
              return (
                getToken() ? <Options/>: <Auth setToken={setToken}/>
              )
            }}/>
          </Switch>
        </main>
        <footer className="copyright">
          <Link to="/dashboard" onClick={async () => await resetPost()}>Copyright © 2021 Joseph Shimel</Link>
        </footer>
      </div>
    </Router>
  )
}

export default App