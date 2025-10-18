<template>
  <div class="map-page">
    <!-- top control panel -->
    <div class="control-box">
      <h3>Find Address & Route (Australia)</h3>

      <!-- start -->
      <input
        v-model="fromTxt"
        placeholder="Start address"
        @keyup.enter="findStart"
      />
      <button @click="findStart">Search Start</button>

      <ul v-if="fromList.length">
        <li v-for="(p, i) in fromList" :key="i" @click="pickStart(p)">
          {{ p.place_name }}
        </li>
      </ul>

      <!-- end -->
      <input
        v-model="toTxt"
        placeholder="Destination address"
        @keyup.enter="findEnd"
      />
      <button @click="findEnd">Search End</button>

      <ul v-if="toList.length">
        <li v-for="(p, i) in toList" :key="i" @click="pickEnd(p)">
          {{ p.place_name }}
        </li>
      </ul>

      <button class="go-btn" @click="makeRoute">Show Route</button>

      <p v-if="msg" class="msg">{{ msg }}</p>
    </div>

    <!-- map -->
    <div ref="mapDiv" class="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiNzk0NDQ3Njc5IiwiYSI6ImNtZ3VqamwzNDBmcnUybW9udjB5Zm5iaGUifQ._38o2XaFmebZJPe_NsCAKw";

export default {
  name: "BasicMapRoute",
  data() {
    return {
      map: null,
      fromTxt: "",
      toTxt: "",
      fromList: [],
      toList: [],
      fromPos: null,
      toPos: null,
      fromMark: null,
      toMark: null,
      msg: "",
    };
  },

  mounted() {
    // initialize map
    this.map = new mapboxgl.Map({
      container: this.$refs.mapDiv,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [144.9631, -37.8136], // Melbourne center
      zoom: 11,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  },

  methods: {
    // simple function to search address
    async searchAddr(txt) {
      if (!txt) {
        this.msg = "Please type something first.";
        return [];
      }

      const api =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(txt) +
        ".json?country=AU&limit=6&types=address,place,poi,locality&access_token=" +
        mapboxgl.accessToken;

      try {
        const res = await fetch(api);
        const data = await res.json();
        return data.features || [];
      } catch (e) {
        this.msg = "Search failed.";
        return [];
      }
    },

    async findStart() {
      this.fromList = await this.searchAddr(this.fromTxt);
    },
    async findEnd() {
      this.toList = await this.searchAddr(this.toTxt);
    },

    pickStart(p) {
      this.fromTxt = p.place_name;
      this.fromList = [];
      this.fromPos = p.geometry.coordinates;

      if (this.fromMark) this.fromMark.remove();

      this.fromMark = new mapboxgl.Marker({ color: "green" })
        .setLngLat(this.fromPos)
        .setPopup(new mapboxgl.Popup().setText("Start: " + p.place_name))
        .addTo(this.map);

      this.map.flyTo({ center: this.fromPos, zoom: 13 });
    },

    pickEnd(p) {
      this.toTxt = p.place_name;
      this.toList = [];
      this.toPos = p.geometry.coordinates;

      if (this.toMark) this.toMark.remove();

      this.toMark = new mapboxgl.Marker({ color: "red" })
        .setLngLat(this.toPos)
        .setPopup(new mapboxgl.Popup().setText("End: " + p.place_name))
        .addTo(this.map);

      this.map.flyTo({ center: this.toPos, zoom: 13 });
    },

    async makeRoute() {
      if (!this.fromPos || !this.toPos) {
        this.msg = "Pick both start and end first.";
        return;
      }

      const api =
        "https://api.mapbox.com/directions/v5/mapbox/driving/" +
        this.fromPos[0] +
        "," +
        this.fromPos[1] +
        ";" +
        this.toPos[0] +
        "," +
        this.toPos[1] +
        "?geometries=geojson&access_token=" +
        mapboxgl.accessToken;

      const res = await fetch(api);
      const data = await res.json();

      if (!data.routes || !data.routes.length) {
        this.msg = "No route found.";
        return;
      }

      const route = data.routes[0].geometry;

      // remove old route
      if (this.map.getSource("route")) {
        this.map.removeLayer("route");
        this.map.removeSource("route");
      }

      // add new route
      this.map.addSource("route", {
        type: "geojson",
        data: { type: "Feature", geometry: route },
      });

      this.map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: { "line-color": "#0074D9", "line-width": 5 },
      });

      // zoom to fit route
      const bounds = new mapboxgl.LngLatBounds();
      route.coordinates.forEach((c) => bounds.extend(c));
      this.map.fitBounds(bounds, { padding: 50 });
    },
  },
};
</script>

<style scoped>
.map-page {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* control panel */
.control-box {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 320px;
  background: white;
  padding: 12px;
  border-radius: 8px;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.control-box input {
  width: 100%;
  margin: 6px 0;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.control-box button {
  width: 100%;
  margin-bottom: 5px;
  padding: 6px;
  border: none;
  border-radius: 4px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
}

.control-box button:hover {
  background-color: #145ca1;
}

ul {
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
}

li {
  padding: 6px 8px;
  cursor: pointer;
}
li:hover {
  background: #f2f2f2;
}

.go-btn {
  background: #007bff;
}

.msg {
  color: red;
  font-size: 13px;
  margin-top: 5px;
}

.map {
  width: 100%;
  height: 100%;
  flex: 1;
}

/* ---------- Responsive Design ---------- */

/* for tablets (below 900px) */
@media (max-width: 900px) {
  .control-box {
    width: 260px;
    font-size: 14px;
  }
}

/* for phones (below 600px) */
@media (max-width: 600px) {
  .control-box {
    position: static;
    width: 100%;
    border-radius: 0;
    box-shadow: none;
    padding: 10px;
  }

  .map-page {
    flex-direction: column;
  }

  .map {
    height: calc(100vh - 260px);
  }

  .control-box button {
    font-size: 14px;
    padding: 5px;
  }

  .control-box input {
    font-size: 14px;
    padding: 5px;
  }
}
</style>