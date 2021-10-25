import React, { useState, useEffect } from "react";
import M from 'materialize-css'
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const history = useHistory();
  useEffect(() => {
    if (url) {

      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        })

      })
        .then((res) => res.json())
        .then(data => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darker-3" })
            console.log(data)
          }
          else {
            M.toast({ html: "created post successsfully", classes: "#43a047 green darker-1" })
            history.push('/home')
          }
        }).catch(err => {
          console.log(err.message)
        })
    }
  }, [url])
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
        // console.log(data.url)
        setUrl(data.url)
      })
      .catch(error => { console.log(error.message) })

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
        <div className="file-field input-field">
          <div className="btn  #64b5f6 blue darken-1">
            <span>Upload image</span>
            <input type="file"
              onChange={(e) => setImage(e.target.files[0])}

            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="upload image" />
          </div>
        </div>

        <button className="btn waves-effect waves-light #64b5f6 blue darken-1 "
          onClick={() => postDetail()}
        >
          submit post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
