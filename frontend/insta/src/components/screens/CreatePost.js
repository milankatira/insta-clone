import React, { useState } from "react";
import M from 'materialize-css'
import { useHistory } from "react-router-dom";
const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const history=useHistory();
  
  const postDetail = () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'insta-clone')
    data.append('cloud_name', 'da5rta12e')
    fetch('https://api.cloudinary.com/v1_1/da5rta12e/image/upload', {


      method: 'post',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(error => { console.log(error) })
      
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          body,
          pic:url
        })
  
      })
        .then((res) => res.json())
        .then(data => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darker-3" })
          }
          else {
            M.toast({ html: "created post successsfully", classes: "#43a047 green darker-1" })
            history.push('/home')
          }
        }).catch(err => {
          console.log(err)
        })
  }
  return (
    <div
      className="card input-filed"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input type="text" placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="text" placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}

      />
      <form action="#">
        <div class="file-field input-field">
          <div class="btn  #64b5f6 blue darken-1">
            <span>Upload image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>

        <button className="btn waves-effect waves-light #64b5f6 blue darken-1 "
          onClick={postDetail()}
        >
          submit post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
