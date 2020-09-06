import { auth, db, servertime } from "../firebase.js";

// ----- " GET REQUEST " ------
export const getPost = () => {
  // this is how to retrieve data so that only happened once
  this.unsubscribe = db.collection("posts").where("uid", "==", this.props.uid).orderBy("createdAt", "desc").onSnapshot(querySnapshot => {
    let bucket = []
    querySnapshot.docs.forEach(doc => {
      bucket.push(doc.data());
    });
    this.setState({ data: bucket, id: bucket.length });
  })
}

// ----- " POST REQUEST || UPDATE POST " -----
export const addPost = (e) => {
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
  else if (this.state.buttonsubmit === "Update") {
    db.collection('posts').where('uid', '==', this.state.uid).where('id', '==', this.state.id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.update({
          title: this.state.title,
          body: this.state.body,
          createdAt: servertime
        })
        this.reset();
      })
    });
  }
  else { alert("WE DON'T KNOW WHAT HAPPENED, CAN'T DO SHIT") }
}

// ----- " DELETE POST " ------
export const deletePost = (id) => {
  let confirmdelete = window.confirm("CONFIRM DELETE?"); if (!confirmdelete) { return }

  let deletequery = db.collection("posts").where("uid", "==", this.state.uid);
  deletequery.where("id", "==", id).get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      doc.ref.delete();
      console.log("the data deleted");
    });
    this.reset();
  }).catch((err) => {
    console.log("DELETE ERROR: " + err.message);
  })
}


export const signout = () => {
  auth.signOut().then(() => {
    console.log("the user is signed out");
  });
};
