import React from "react";
import "./Blog.css";
import { auth, db, servertime} from "../firebase.js";

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      uid: this.props.uid,
      id: null,
      title: "",
      body: "",
      data: [],
      buttonsubmit: "Post",
      expandpost: false
    };
  }

  componentDidMount(){
    if(this.state.uid){
      document.getElementById('loading').outerHTML =""
    }
    else{
      document.getElementById('loading').outerHTML ="Error 404, Page not Found"
    }
    // call get request when program start
    this.getPost();
  }

  componentWillUnmount() {
    // we have to unsubscribe when component unmounts, because we don't need to check for updates
    this.unsubscribe()
  }

  // ----- " GET REQUEST " ------
  getPost = () => {
    // this is how to retrieve data so that only happened once
    this.unsubscribe = db.collection("posts").where("uid", "==", this.props.uid).orderBy("createdAt", "desc").onSnapshot(querySnapshot => {
      let bucket = []
      querySnapshot.docs.forEach(doc => {
        bucket.push(doc.data());
      });
      this.setState({data: bucket, id: bucket.length});
    }) } 
  
  // ----- " POST REQUEST || UPDATE POST " -----
  addPost = (e) => {
    e.preventDefault();
    // ----- " POST " -----
    if (this.state.buttonsubmit === "Post") {
      if (this.state.body === "" || this.state.title === "") {
        // checker dont leave input blank
        alert("Fill the field if you want to post");
        return;
      }
      db.collection("posts")
        .add({
          uid: this.state.uid,
          id: this.state.data.length,
          title: this.state.title,
          body: this.state.body,
          createdAt: servertime,
        })
        .then(() => {
          console.log("the post is posted successfully");
          this.setState({ title: "", body: "" });
        })
        .catch((err) => console.log("we got error: " + err.message));
    } 

    // ----- " UPDATE " -----
    else if(this.state.buttonsubmit === "Update") {
      db.collection('posts').where('uid', '==', this.state.uid).where('id', '==', this.state.id).get().then(querySnapshot => { 
        querySnapshot.forEach(doc=> {
          doc.ref.update({
            title: this.state.title,
            body: this.state.body, 
            createdAt: servertime
          })
          this.reset();
        })
      });
    }
    else{ alert("WE DON'T KNOW WHAT HAPPENED, CAN'T DO SHIT") }
  }

  // ----- " DELETE POST " ------
  deletePost = (id) => {
    let confirmdelete = window.confirm("CONFIRM DELETE?"); if(!confirmdelete){return}

		let deletequery = db.collection("posts").where("uid", "==", this.state.uid);
    deletequery.where("id", "==", id).get().then((querySnapshot)=> {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
        console.log("the data deleted");
      });
      this.reset();
    }).catch((err)=>{
      console.log("DELETE ERROR: "+ err.message);
    })
  }

  // ----- " Change the text of button to update " -----
  updatePost = (id, title, body) => {
    if(this.state.buttonsubmit !== "Update"){this.setState({id, title, body, buttonsubmit: "Update"});} 
  }

  reset = () => {
    this.setState({ id: this.state.data.length, title: "", body: "", buttonsubmit: "Post" });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signout = () => {
    auth.signOut().then(() => {
      console.log("the user is signed out");
    });
  };

  render() {
    return (
      <div className="ArticleContainer">
        <h1>GOBLOG</h1>
        <h3>User: {this.props.email}</h3> 
        <button type="button"  onClick={this.signout}>Sign Out</button>
        <br /><br />

        {/* ARTICLE HEADER TO ADD NEW ARTICLE */}
        <div className="AddArticle">
          <b>id of article: </b>
          <input readOnly name="id" value={this.state.id} />
          <form>
            <input name="title" onChange={this.onChange} type="text" placeholder="Title" value={this.state.title} />
            <textarea name="body" onChange={this.onChange} placeholder="Enter Body" value={this.state.body} />
            <div className="btn-group">
              <input onClick={this.addPost} type="submit" value={this.state.buttonsubmit} />
              <input onClick={this.reset} type="button" value={"Reset/Cancel"} />
            </div>
          </form>
        </div>

        {/* ARTICLE MADE BY USER */}
        <div className="article">
          { this.state.data.length === 0 ? ( <p>No post...</p>) : (
            this.state.data.map((post, counter) => (
              <article key={counter}>
                <h2>{this.state.data.length - counter}. {post.title}</h2>
        {/* IMPORTANT FUCKING NOTES BELOW ON HOW TO HANDLE TRIVIAL ERROR ON TIMESTAMP || chck value using only the name and put ternary op there */}
                <div className="second-header">
                <p><i>{(post.createdAt) && post.createdAt.toDate().toString().slice(0,24)}</i></p>
                <p><b>id: {post.id}</b></p>
                </div>
                <p>{(post.body.length > 500 && this.state.expandpost === false) ? <div>{post.body.substr(0, 300) + "..."} (<b onClick={()=>this.setState({expandpost: true})}>expandpost</b>) </div> : post.body}</p>
                <button onClick={() => this.deletePost(post.id) } className="delete">Delete</button>
                <button onClick={() => this.updatePost(post.id, post.title, post.body)} className="edit">Edit</button>
              </article>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Blog;
