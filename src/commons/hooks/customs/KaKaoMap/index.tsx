import { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function KaKaoMap() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f3e19a9d14ef6f578a2ef9d36fa3f9c7&libraries=services,clusterer";
    document.head.appendChild(script);
  });

  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "300px", height: "360px" }}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{ color: "#000" }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
}
