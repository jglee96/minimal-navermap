import "./main.css";
import { debounce, throttle } from "throttle-debounce";

const NAVER_MAP_API = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
  import.meta.env.VITE_OAPI_KEY
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

  naver.maps.Event.once(map, "init", () => {
    const halfSide = Math.sqrt(5000) / 2;

    const mapCenter = map.getCenter();
    const c = naver.maps.TransCoord.fromLatLngToUTMK(mapCenter);

    const lt = mapCenter.clone().destinationPoint(315, 50);
    const rb = mapCenter.clone().destinationPoint(135, 50);

    const bounds = new naver.maps.LatLngBounds(lt, rb);

    const rect = new naver.maps.Rectangle({
      map,
      bounds,
      fillColor: "#6741D9",
      fillOpacity: 0.3,
      strokeWeight: 2,
      strokeColor: "#6741D9",
    });

    console.log(halfSide, rect.getAreaSize());

    /**
     * fromPageXYToCoord 참고
     */
    //   _extendProj: function() {
    //     var t = this.get("mapSystemProjection");
    //     if (t && !t.fromPageXYToOffset) {
    //         var e = this._mapView;
    //         t.fromPageXYToOffset = function(t) {
    //             var i = e.getMapOffset();
    //             return t.clone().sub(i).sub(this.get("containerTopLeft"))
    //         }
    //         ,
    //         t.fromPageXYToPoint = function(t) {
    //             var e = this.fromPageXYToOffset(t);
    //             return this.fromOffsetToPoint(e)
    //         }
    //         ,
    //         t.fromPageXYToCoord = function(t) {
    //             var e = this.fromPageXYToOffset(t);
    //             return this.fromOffsetToCoord(e)
    //         }
    //     }
    // },

    const func = () => {

      const mc = map.getCenter();
      const zoom = map.getZoom();
      const side = 25 * Math.pow(2, 21 - zoom);
  
      const lt = mc.clone().destinationPoint(315, side);
      const rb = mc.clone().destinationPoint(135, side);
  
  
      const nbounds = new naver.maps.LatLngBounds(lt, rb);

      rect.setBounds(nbounds);
      console.log(map.getZoom(), rect.getAreaSize());
    };

    const throttleFun = throttle(100, func);

    naver.maps.Event.addListener(map, "bounds_changed", func);
  });
};
