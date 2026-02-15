import { Component } from 'react'
import * as faceapi from '@vladmandic/face-api'
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  modelsLoaded: false,
  route: 'signin',
  isSignedIn: false,
  isDetecting: false,
  detectionMessage: '',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super()
    this.state = { ...initialState };
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  async componentDidMount() {
    fetch(`${API_URL}/`)
      .then(response => response.json())
      .catch(err => console.error('Backend connection failed:', err));

    try {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      this.setState({ modelsLoaded: true });
    } catch (err) {
      console.error('Error loading face detection models:', err);
    }
  }

  calculateFaceLocation = (detection) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    const faceBox = detection.box;
    const imgWidth = detection.imageDims.width;
    const imgHeight = detection.imageDims.height;
    
    return {
      leftCol: (faceBox.x / imgWidth) * width,
      topRow: (faceBox.y / imgHeight) * height,
      width: (faceBox.width / imgWidth) * width,
      height: (faceBox.height / imgHeight) * height
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = async () => {
    if (!this.state.modelsLoaded) {
      return;
    }
    
    this.setState({
      imageUrl: this.state.input, 
      box: {}, 
      apiData: null,
      imageLoaded: false,
      isDetecting: true,
      detectionMessage: ''
    });
    
    try {
      const img = await faceapi.fetchImage(this.state.input);
      const detection = await faceapi.detectSingleFace(img);
      
      if (detection) {
        fetch(`${API_URL}/image`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(prevState => ({
            user: { ...prevState.user, entries: count }
          }));
        })
        .catch(err => console.error('Error updating entries:', err));
        
        this.setState({ apiData: detection, isDetecting: false }, () => {
          this.calculateBoxIfReady();
        });
      } else {
        this.setState({ 
          isDetecting: false, 
          detectionMessage: 'No face detected in this image. Try another photo.' 
        });
      }
    } catch (err) {
      console.error('Error detecting face:', err);
      this.setState({ 
        isDetecting: false, 
        detectionMessage: 'Could not load this image. Please check the URL and try again.' 
      });
    }
  }

  handleImageLoaded = () => {
    this.setState({ imageLoaded: true }, () => {
      this.calculateBoxIfReady();
    });
  }

  calculateBoxIfReady = () => {
    const { apiData, imageLoaded } = this.state;
    if (apiData && imageLoaded) {
      const box = this.calculateFaceLocation(apiData);
      this.displayFaceBox(box);
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ ...initialState });
    } else if (route === 'home') {
      this.setState({isSignedIn: true, route: 'home'});
    } else {
      this.setState({route: route});
    }
  }

  render() {
    const { isSignedIn, imageUrl, box, route, modelsLoaded, isDetecting, detectionMessage } = this.state;
    return (
        <div className='App'>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
        ? <div>
          <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            disabled={!modelsLoaded}
            />
            {!modelsLoaded && <p className="status-message">Loading face detection models...</p>}
            {isDetecting && <p className="status-message">Detecting faces...</p>}
            {detectionMessage && <p className="status-message warning">{detectionMessage}</p>}
            <FaceRecognition box={box} imageUrl={imageUrl} onImageLoaded={this.handleImageLoaded} />
        </div>
        : (
          route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
        }
        </div>
    );
  }
}

export default App
