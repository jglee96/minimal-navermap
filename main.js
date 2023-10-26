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
    zoom: 19,
  });
  const projection = map.getProjection();

  naver.maps.Event.once(map, "init", () => {
    const sideLength = Math.sqrt(5000);

    const mapCenter = map.getCenter();
    const c = naver.maps.TransCoord.fromLatLngToUTMK(mapCenter);
    const lt = naver.maps.TransCoord.fromUTMKToLatLng(
      c.clone().add(sideLength / 2, sideLength / 2)
    );
    const rb = naver.maps.TransCoord.fromUTMKToLatLng(
      c.clone().sub(sideLength / 2, sideLength / 2)
    );

    const off1 = projection.fromCoordToOffset(lt);
    const off2 = projection.fromCoordToOffset(rb);

    console.log(off1, off2);

    const bounds = new naver.maps.LatLngBounds(lt, rb);

    const rect = new naver.maps.Rectangle({
      map,
      bounds,
      fillColor: "#6741D9",
      fillOpacity: 0.3,
      strokeWeight: 2,
      strokeColor: "#6741D9",
    });

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
      const nbounds = new naver.maps.LatLngBounds(
        projection.fromPageXYToCoord(off1),
        projection.fromPageXYToCoord(off2)
      );
      rect.setBounds(nbounds);
    };

    const throttleFun = throttle(100, func);

    naver.maps.Event.addListener(map, "bounds_changed", func);
  });
};
