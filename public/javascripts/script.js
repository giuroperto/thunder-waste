// console.log('We are connected! =)');

const geocoder = new google.maps.Geocoder();
const mapDiv = document.getElementById('map');
const addressInput = document.getElementById('address');

// const bounds = new google.maps.LatLngBounds();

const clientsAPI = axios.create({
  baseURL: 'http://localhost:3000/api',
});

window.onload = () => {
  getUsers();
};

function getUsers() {
  clientsAPI.get()
    .then(response => {
      // response.send(response);
      pinUsers(response.data);
    })
    .catch(error => {
      console.log(error);
    })
}

function pinUsers(places) {

  if (mapDiv) {
    const saoPaulo = {
      lat: -23.6345838,
      lng: -46.7227298
    };
    
    const markers = [];

    const map = new google.maps.Map(mapDiv, {
      zoom: 13,
      center: saoPaulo,
    });
    
    // map.fitBounds(bounds);

    places.forEach(place => {
      if (place.location) {
        const center = {
          lat: place.location.coordinates[1],
          lng: place.location.coordinates[0]
        };
        const pin = new google.maps.Marker({
          position: center,
          map: map,
          title: place.name,
        });
        markers.push(pin);
      }
    });

  }
}

const geocodeAddress = () => {
  let address = document.getElementById('address').value;

  geocoder.geocode({
    address
  }, (results, status) => {

    if (status === 'OK') {
      const latitude = results[0].geometry.location.lat();
      const longitude = results[0].geometry.location.lng();

      document.getElementById('latitude').value = latitude;
      document.getElementById('longitude').value = longitude;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

if (addressInput) {
  addressInput.addEventListener('focusout', () => {
    geocodeAddress();
  });

}
