// import {Text, View} from 'react-native';
// import React from 'react';
// import MapView from 'react-native-maps';

// export const MapScreen = () => {
//   return (
//   //     <MapView
//   //       initialRegion={{
//   //         latitude: LATITUDE,
//   //         longitude: LONGITUDE,
//   //         latitudeDelta: LATITUDE_DELTA,
//   //         longitudeDelta: LONGITUDE_DELTA,
//   //       }}
//   //       style={StyleSheet.absoluteFill}
//   //       ref={c => this.mapView = c}
//   //       onPress={this.onMapPress}
//   //     >
//   //       {this.state.coordinates.map((coordinate, index) =>
//   //         <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
//   //       )}
//   //       {(this.state.coordinates.length >= 2) && (
//   //         <MapViewDirections
//   //           origin={this.state.coordinates[0]}
//   //           waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): undefined}
//   //           destination={this.state.coordinates[this.state.coordinates.length-1]}
//   //           apikey={GOOGLE_MAPS_APIKEY}
//   //           strokeWidth={3}
//   //           strokeColor="hotpink"
//   //           optimizeWaypoints={true}
//   //           onStart={(params) => {
//   //             console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
//   //           }}
//   //           onReady={result => {
//   //             console.log(`Distance: ${result.distance} km`)
//   //             console.log(`Duration: ${result.duration} min.`)

//   //             this.mapView.fitToCoordinates(result.coordinates, {
//   //               edgePadding: {
//   //                 right: (width / 20),
//   //                 bottom: (height / 20),
//   //                 left: (width / 20),
//   //                 top: (height / 20),
//   //               }
//   //             });
//   //           }}
//   //           onError={(errorMessage) => {
//   //             // console.log('GOT AN ERROR');
//   //           }}
//   //         />
//   //       )}
//   //     </MapView>
//   //   );
//   // );
// };
