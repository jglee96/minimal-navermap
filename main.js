const NAVER_MAP_API =
  `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_OAPI_KEY}&submodules=geocoder,drawing`;

let script = document.querySelector(`script[src="${NAVER_MAP_API}"]`);

if (script === null) {
  script = document.createElement("script");
  script.src = NAVER_MAP_API;
  document.head.appendChild(script);
}


script.onload = () => {
  var map = new naver.maps.Map("map");

  const mapCenter = map.getCenter();

  const marker = new naver.maps.Marker({
    map: map,
    position: mapCenter,
    icon: {
      content: /*html*/ `
      <input type="number" />
      `,
    },
  });
};
