import React from 'react'
import _ from 'lodash';
import Modal from 'react-modal';
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import {Buttons, Grid, Row, Col,ListGroup,ListGroupItem, FormGroup, InputGroup, FormControl, Glyphicon} from 'react-bootstrap';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoia2FsaWJveSIsImEiOiJjajdnN2tpYjIxMWlvMnF1d3hkaDQ2OXZnIn0.QdbzJWfOrCH7ZtL0At28wA"
});

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
const styles = {
  popup: {
    background: "#fff",
    padding: "5px",
    borderRadius: "2px"
  }
}
export default class Hitta extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
      center: [-0.109970527, 51.52916347],
      zoom: [11],
      newPlace: new Map(),
      modalIsOpen: false,
      tempMarker:{},
      tempPlaceArray:[{lng:-0.04594083341200417,lat:51.52799206565052,name:'Default1'}, {lng:-0.11356212307828173,lat:51.50469294415791,name:"Default2"}],
      place:[{lng:-0.04594083341200417,lat:51.52799206565052,name:'Default1'}, {lng:-0.11356212307828173,lat:51.50469294415791,name:"Default2"}],
      popupShowLabel: true,
    }
  }
  //add marker pos to temp array on map click
  addMarker(coordinates, pos){
    let obj={lng:pos.lngLat.lng,lat:pos.lngLat.lat};
    this.setState({modalIsOpen:true,tempMarker:obj});
  }
  //close modal
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  //add place name in marker click
  addPlace(e){
    let pos=this.state.tempMarker;
    let obj={lng:pos.lng,lat:pos.lat,name:e.target.value};
    let placeArray = this.state.place;
    placeArray.push(obj)
    this.setState({place:placeArray,tempPlaceArray:placeArray,tempMarker:{}});
  }
  //remove place from list
  removePlace(place){
    let placeArray = _.remove(this.state.place, function(n) {
        return n.name != place.name;
      });
    this.setState({place:placeArray,newPlace:{}});
  }
  //search place from list
  searchPlace(e){
   let placeArray = _.filter( this.state.tempPlaceArray,function( s ) { return s.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1; });
    this.setState({place:placeArray,newPlace:{}});
  }
  //show label on map
  showLabel (newPlace){
    this.setState({
      newPlace
    });
  };
  render() {
    const {newPlace,popupShowLabel, end} = this.state;
    return (
       <div style={{
        position: 'relative'
      }}>
        <div >
		 <Grid>
    <Row className="show-grid">
      <Col xs={12} md={8}>
		<Map
            center={this.state.center}
            zoom={this.state.zoom}
            style="mapbox://styles/mapbox/streets-v10"
            containerStyle={{
              height: "50vh",
              width: "50vw"
            }}
            onClick={(coordinates, pos) => this.addMarker(coordinates, pos)}
            >
              <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "harbor-15" }}>
                 {
                  this.state.place
                    .map((pos, index) => (
                    <Feature
                      key={index}
                      coordinates={[pos.lng,pos.lat]}/>
                  ))
                }
              </Layer>
              {
                newPlace && newPlace.lng && newPlace.lat && (
                  <Popup  coordinates={[ newPlace.lng, newPlace.lat]} closeButton={true}>
                    <div>
                      <span style={{color:'#fff',fontWeight:'bold', background: '#000',padding: '15px',borderRadius: '2px'}}>
                        {this.state.newPlace.name}
                      </span>
                    </div>
                  </Popup>
                )
              }
          </Map>
		
		</Col>
      <Col xs={6} md={4}>
		  
		  <div>
            <form>

<FormGroup>
      <InputGroup>
        <InputGroup.Addon>
<Glyphicon glyph="align-left" />
</InputGroup.Addon>
        <FormControl type="text" placeholder="Search Place to go..." onChange={e =>this.searchPlace(e)}  />
      </InputGroup>
    </FormGroup>

          </form>
 </div>

          <table>
            <tr>
              <th> Place Name</th>
              <th>#</th>
            </tr>
            {
              this.state.place.map((pos, index) =>
                <tr key={index}>
                  <td className="table table-striped custab"> <a href="#" onClick={() => this.showLabel(pos)} >{pos.name}</a> </td>
                  <td> <a href="#" onClick={() => this.removePlace(pos)}  className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-remove" /> Delete </a>  </td>
                </tr>
              )
            }
          </table>


		  
		  </Col>
    </Row>
  </Grid>
          
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div>
          <h4>Place Name</h4>
          <form>
            <input onBlur={e =>this.addPlace(e)} />
          </form>
          <button onClick={ e => this.closeModal(e)}>Add</button>
        </div>
        </Modal>
      </div>
    </div>
    )
  }
}
