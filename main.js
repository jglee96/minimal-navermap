import "./main.css";

const NAVER_MAP_API = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_OAPI_KEY
  }&submodules=geocoder,drawing`;

let script = document.querySelector(`script[src="${NAVER_MAP_API}"]`);

if (script === null) {
  script = document.createElement("script");
  script.src = NAVER_MAP_API;
  document.head.appendChild(script);
}

script.onload = () => {
  const map = new naver.maps.Map("map", {
    zoom: 20,
  });

  const mapDiv = document.getElementById("map");

  const seoul = document.createElement("button");
  seoul.innerText = "서울";
  const sBound = new naver.maps.LatLngBounds(new naver.maps.LatLng(37.56616248354732, 126.97739175284833), new naver.maps.LatLng(37.5670097059157, 126.97906914034981));
  seoul.onclick = () => map.panToBounds(sBound);

  const ulleungdo = document.createElement("button");
  ulleungdo.innerText = "울릉도";
  const uBound = new naver.maps.LatLngBounds(new naver.maps.LatLng(37.51984012652829, 130.8634008769862), new naver.maps.LatLng(37.52105690820206, 130.86543652438712));
  ulleungdo.onclick = () => map.panToBounds(uBound);

  document.body.insertBefore(seoul, mapDiv);
  document.body.insertBefore(ulleungdo, mapDiv);

};
