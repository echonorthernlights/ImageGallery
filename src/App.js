
import React, {useState, useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [term, setTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(()=>{
    const fetchImages = async ()=>{
      const url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`
      try {
        const data = await fetch(url)
        const res = await data.json()
        console.log(res.hits)
        setImages(res.hits)
        setIsLoading(false)
      } catch (error) {
        console.log(error.message)
      }
      
    }
    fetchImages()
  },[term])

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)}/>
      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No images found.</h1>}
      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> :
       <div className="grid grid-cols-3 gap-4">
        {images.map(image => {
          //console.log(image)
          return(
            <ImageCard key={image.id} image={image}/>
          )
        })}
      </div>}
    </div>
   );
}

export default App;
