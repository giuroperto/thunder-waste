// console.log('We are connected! =)');

// const mapDiv2 = document.getElementById('map2');

// const bounds2 = new google.maps.LatLngBounds();

// const cooperativesAPI = axios.create({
//   baseURL: 'http://localhost:3000/api/cooperatives',
// });

// window.onload = () => {
//   getCooperatives();
// };

// function getCooperatives() {
//   cooperativesAPI.get()
//     .then(response => {
//       // response.send(response);
//       pinCooperatives(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     })
// }

// function pinCooperatives(places) {

//   if (mapDiv2) {
//     const saoPaulo = {
//       lat: -23.6345838,
//       lng: -46.7227298
//     };

//     const markers = [];

//     const map = new google.maps.Map(mapDiv2, {
//       zoom: 10,
//       center: saoPaulo,
//     });

    
//     places.forEach(place => {
//       if (place.location) {
//         const center = {
//           lat: place.location.coordinates[1],
//           lng: place.location.coordinates[0]
//         };
//         const pin = new google.maps.Marker({
//           position: center,
//           map: map,
//           title: place.name,
//         });
//         markers.push(pin);
//         const loc = new google.maps.LatLng(pin.position.lat(), pin.position.lng());
//         bounds2.extend(loc);
//       }
//     });
    
    
//     map.fitBounds(bounds2);
//   }
// }