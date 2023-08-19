import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {getAuth ,signOut,  onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";  
import { getDatabase, ref, set, push, onValue, remove, update} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBWK-L5_9S2I-ODntPeouMVFbi__tDSV6g",
    authDomain: "raininkarachi-7c129.firebaseapp.com",
    projectId: "raininkarachi-7c129",
    storageBucket: "raininkarachi-7c129.appspot.com",
    messagingSenderId: "403921534961",
    appId: "1:403921534961:web:4c8b4578c2daf230660e50",
    measurementId: "G-WBKY7R43B4"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getDatabase(app);
  console.log(db);
  console.log(auth);

  document.getElementById('Fpost').addEventListener('click', function(){
    document.getElementById('nav').style.display="none";
    document.getElementById('container_of_getallpost').style.display="inline";
    document.getElementById('myBlogs').style.display="none";
    document.getElementById('container_of_Dashbord').style.display="none";
  });

  document.getElementById('gpost').addEventListener('click', function(){
    document.getElementById('nav').style.display="inline";
    document.getElementById('container_of_getallpost').style.display="none";
    document.getElementById('myBlogs').style.display="inline";
    document.getElementById('container_of_Dashbord').style.display="inline";
  });

  sendblog.addEventListener('click',publishpost);
  function publishpost(){
    const title = document.getElementById('post_detail1').value;
    const description = document.getElementById('post_detail').value;
    if(!title) return alert("Enter the post title");
    const postRef = ref(db,`post/${auth.currentUser.uid}`);
    const postObj = {
        title,
        description,
        PostAt: new Date().toLocaleDateString()
    }
    console.log("Data1",postObj);
    console.log("PostRef-->",postRef);
    const newPostRef = push(postRef)
    console.log("newListRef-->",newPostRef);
    set(newPostRef,postObj);
    document.getElementById('post_detail1').value = ' ';
    document.getElementById('post_detail').value = ' ';
  }
   
  function getPost(){
    event.preventDefault();
    const postRef = ref(db,`post/${auth.currentUser.uid}`);
    console.log(postRef);
    onValue(postRef, (snapshot)=>{
        const IsdataExist = snapshot.exists();
        console.log(IsdataExist);
        if(IsdataExist){
            document.getElementById("PersonalBlogs").innerHTML = ' ';
            snapshot.forEach(childSnapshot =>{
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                console.log("child",childData);
                console.log('childkey=>',childKey);
                console.log('childData=>', childData);
                const cards = `<div id= ${childKey} class="PostCard">
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" class="avatar">
                <h1> ${childData.title}</h1>
                <h6>${childData.PostAt}</h6>
                <p>${childData.description}</p>
                <button  class="editBtn" id =${childKey +'-edit'}>Edit</button>
                <button class="delBtn" id =${childKey +'-del'}>Delete</button>
                    </div>`
                    document.getElementById("PersonalBlogs").innerHTML += cards
                    setTimeout(() => {
                   const editbtn = document.getElementById(childKey + '-edit')
                   editbtn.addEventListener('click', editFunc)
                   const deleteBtn = document.getElementById(childKey + '-del')
                   deleteBtn.addEventListener('click', deleteFunc)
        
        }, 1000)
      });
    }
            })

        }
   function deleteFunc(){
            const elementId = this.id.slice(0,this.id.length - 4);
            console.log(elementId);
            const postRef = ref(db,`post/${auth.currentUser.uid}/${elementId}`);
            remove(postRef)
    }
    function editFunc(){
            const elementId = this.id.slice(0,this.id.length -5)
            console.log(elementId);
            const postRef = ref(db,`post/${auth.currentUser.uid}/${elementId}`);
            let newPostTitle = prompt('Edit your title', this.parentNode.firstChild.innerText);
            let newPostDescription =  prompt('Edit your Description', this.parentNode.firstChild.innerText);
          
            update(postRef, { title: newPostTitle, description: newPostDescription })
    }
    const blogContainer = document.getElementById('blog_container')
    function getAllPosts(){
        let AllPostContainer = document.getElementById('blog_container');
        console.log(AllPostContainer);
        const postRef = ref(db, 'post');
        onValue(postRef, (snapshot)=>{
            console.log('snapshot-->', snapshot.val());
            const data = snapshot.val();
            console.log("data-->",data);
            Object.values(data).forEach((post)=>{
                console.log("post-->",post);
                Object.values(post).forEach((data)=>{
                    const card = `<div class= 'PostCard'>
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" class="avatar">
                    <h3>${data.title}</h3>
                    <h6>${data.PostAt}</h6>
                    <p>${data.description}</p>
                    </div>`
                    AllPostContainer.innerHTML +=card
                }) 
                })
            })
            }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      document.getElementById('container_of_Dashbord').style.display="inline";
      console.log("ap abhi ho");
      getPost();
      getAllPosts();
    } else {
        document.getElementById('login_container').style.display="inline";
    }
  });

  document.getElementById('signout').addEventListener('click',function(){
    signOut(auth).then(() => {
    window.location.replace('index.html');
    })
    .catch((error) => {
    //     document.getElementById('container_of_Dashbord').style.display="inline"; 
    //   alert(errorMessage);
    });
  });