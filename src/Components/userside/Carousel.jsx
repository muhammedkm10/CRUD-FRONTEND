import Carousel from 'react-bootstrap/Carousel';
import messi1 from './images/messi1.jpeg'
import messi2 from './images/meesi2.jpeg'
import messi3 from './images/messi3.jpeg'



function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={messi1} alt=""  className="d-block w-100" style={{ height: '80vh' }} />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={messi2} alt=""  className="d-block w-100" style={{ height: '80vh' }} />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={messi3} alt=""  className="d-block w-100" style={{ height: '80vh' }} />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;