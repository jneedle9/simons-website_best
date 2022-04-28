import React from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'


function writeArticle() {
  const [bodyContents, setBodyContents] = useState({text:''})
  const [postTitle, setPostTitle] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const [postDate, setPostDate] = useState('')
  const [postSlug, setPostSlug] = useState('')
  const [errMessage, setErrMessage] = useState('')

  const handleBodyChange = (e) => {
    e.preventDefault();
    let updateValue = {}
    setBodyContents({text: e.target.value})
  }

  const handleTitleChange = (e) => {
    e.preventDefault();
    setPostTitle(e.target.value);
  }

const generateSlug = () => {
  let currentSlug = ''
  if (postTitle.length >= 20){
    currentSlug = postTitle.slice(0,20)
  }
  if (currentSlug.includes(" ")){
    currentSlug = currentSlug.replace(" ", "-")
  }

  return currentSlug
}

const makeContentArray = () => {
  let containerArray = []

  let newContents = JSON.stringify(bodyContents.text);
  // first and last  "\" must go!  read only?
  let newContentsBefore = newContents
  newContents = newContents.replace(/\\n/g, " ")
  // newContents = newContents.replaceAll("/\\", '')
  let startNum = 0

  for (let i = 0; i < newContents.length; i++){
    if (newContents[i] === " "){
      containerArray.push(newContents.slice(startNum, i));
      startNum = i + 1;
    }
  }
  return [newContentsBefore, newContents, containerArray]
}




//axios
const handleSubmit =  async (e) => {
  e.preventDefault();

  if (bodyContents.text.length == 0){
    setErrMessage('Please write something ')
  } else {
    //send to our API
    await fetch("/api/writeArticle", {
      method: "POST",
      body: 
        JSON.stringify({
          _type: 'post',
          title: postTitle,
          text: bodyContents.text,
        }),
    })
    generateSlug()
    console.log(makeContentArray())
    setBodyContents({text: ''})
    setPostTitle('')
    setErrMessage('')
    }
  };

  return(
  <form>
    <div className='write-article-div'>
      <label className='write-article-label'>
        <input
        className='write-title-input'
        type = 'text'
        value = {postTitle}
        onChange = {handleTitleChange}>
        </input>
        <textarea
        className='write-article-input'
        value = {bodyContents.text}
        onChange = {handleBodyChange}>
        </textarea>
      </label>
    </div>
    <button
    className='write-article-submit'
    onClick = {handleSubmit}>
      Submit
    </button>
    <p>{errMessage}</p>
  </form>
        )
}

export default writeArticle
//