import './App.css';
import Nav from './component/nav';
import Container from './component/container';
import Pagination from './component/pagination';
import Footer from './component/footer';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {

  let [incomingData, setIncomingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(8)

  useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(data => setIncomingData(data.data.memes));
  }, []);
  

  let card = {
    width: "310px",
    height: "369px",
    backgroundColor: "white"
  }

  let image = {
    objectFit: "cover",
    width: "310px",
    height: "310px",
    marginBottom: "-2.7px"
  }

  let text = {
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    cursor: "pointer"
  }

  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage

  const currentPosts = incomingData.slice(indexOfFirstPost, indexOfLastPost)

  const display = currentPosts.map((item) => {
    return (
      <div style={card} key={item.id}>
        <img style={image} src={item.url} alt="meme" /><hr />
        <h3>Title: <span style={text}>{item.name}</span></h3>
      </div>
    )
  })

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="App">
      <Nav />
      <Container display={display} />
      <Pagination postPerPage={postPerPage} totalPosts={incomingData.length} paginate={paginate} />
      <Footer />
    </div>
  );
}

export default App;
