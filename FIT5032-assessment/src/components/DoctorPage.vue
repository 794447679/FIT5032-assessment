<template>
  <div class="doctors-page">
    <h2>Men’s Health Doctors in Melbourne</h2>
    <p>Meet trusted professionals helping men stay fit and healthy.</p>

    <!-- export buttons -->
    <div class="export-box">
      <button @click="exportCSV">Export CSV</button>
      <button @click="exportPDF">Export PDF</button>
    </div>

    <div class="doctor-list">
      <div v-for="d in doctors" :key="d.name" class="doctor-card">
        <div class="photo-box">
          <img :src="d.img" alt="doctor photo" />
        </div>

        <div class="info-box">
          <h3>{{ d.name }}</h3>
          <p><b>Specialty:</b> {{ d.specialty }}</p>
          <p><b>Clinic:</b> {{ d.clinic }}</p>
          <p><b>Address:</b> {{ d.address }}</p>
          <p>{{ d.about }}</p>

          <button class="map-btn" @click="goToMap(d.address)">
            Go to find location
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { jsPDF } from "jspdf";

export default {
  name: "DoctorsPage",
  setup() {
    const router = useRouter();

    // go to map
    const goToMap = (addr) => {
      router.push({ path: "/map", query: { destination: addr } });
    };

    // export CSV
    const exportCSV = () => {
      const rows = [
        ["Name", "Specialty", "Clinic", "Address", "About"],
        ["Dr. Alex Turner", "Hormonal Health", "Vitality Centre", "12 Heath St, Glen Waverley", "Helps men improve hormone balance."],
        ["Dr. Liam Matthews", "Mental Health", "MindStrong Clinic", "45 Burke Rd, Malvern East", "Focuses on stress and motivation."],
        ["Dr. Noah Patel", "Sports Medicine", "Active Life Centre", "8 Collins St, Melbourne", "Helps athletes recover and stay fit."],
      ];

      const csv = rows.map((r) => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "doctors.csv";
      link.click();
      URL.revokeObjectURL(url);
    };

    // export PDF
    const exportPDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text("Men’s Health Doctors", 14, 15);

      let y = 25;
      const doctors = [
        {
          name: "Dr. Alex Turner",
          specialty: "Hormonal Health",
          clinic: "Vitality Centre",
          address: "12 Heath St, Glen Waverley",
          about: "Helps men improve hormone balance.",
        },
        {
          name: "Dr. Liam Matthews",
          specialty: "Mental Health",
          clinic: "MindStrong Clinic",
          address: "45 Burke Rd, Malvern East",
          about: "Focuses on stress and motivation.",
        },
        {
          name: "Dr. Noah Patel",
          specialty: "Sports Medicine",
          clinic: "Active Life Centre",
          address: "8 Collins St, Melbourne",
          about: "Helps athletes recover and stay fit.",
        },
      ];

      doctors.forEach((d, i) => {
        doc.text(`${i + 1}. ${d.name}`, 14, y);
        y += 6;
        doc.text(`Specialty: ${d.specialty}`, 14, y);
        y += 6;
        doc.text(`Clinic: ${d.clinic}`, 14, y);
        y += 6;
        doc.text(`Address: ${d.address}`, 14, y);
        y += 6;
        doc.text(`About: ${d.about}`, 14, y);
        y += 10;
      });

      doc.save("doctors.pdf");
    };

    return { goToMap, exportCSV, exportPDF };
  },

  data() {
    return {
      doctors: [
        {
          name: "Dr. Alex Turner",
          specialty: "Hormonal Health & Nutrition",
          clinic: "Vitality Men's Wellness Centre",
          address: "12 Heath Street, Glen Waverley VIC 3150",
          about:
            "Helps men improve hormone balance, diet and general health plans.",
          img: new URL("@/assets/doctor1.png", import.meta.url).href,
        },
        {
          name: "Dr. Liam Matthews",
          specialty: "Mental & Emotional Health",
          clinic: "MindStrong Psychology Clinic",
          address: "45 Burke Road, Malvern East VIC 3145",
          about:
            "Focuses on stress, motivation, and mental wellness for men.",
          img: new URL("@/assets/doctor2.jpg", import.meta.url).href,
        },
        {
          name: "Dr. Noah Patel",
          specialty: "Sports Medicine & Injury Care",
          clinic: "Active Life Health Centre",
          address: "8 Collins Street, Melbourne VIC 3000",
          about:
            "Helps athletes recover from injuries and stay in good shape.",
          img: new URL("@/assets/doctor3.jpg", import.meta.url).href,
        },
      ],
    };
  },
};
</script>

<style scoped>
.doctors-page {
  padding: 20px;
  background: #f8f9fa;
  text-align: center;
}

.export-box {
  margin: 15px 0;
}

.export-box button {
  background: #1976d2;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 5px;
  margin: 0 5px;
  cursor: pointer;
}

.export-box button:hover {
  background: #125a9c;
}

.doctor-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.doctor-card {
  display: flex;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 90%;
  max-width: 850px;
  text-align: left;
}

.photo-box {
  flex: 0 0 150px;
  margin-right: 15px;
}

.photo-box img {
  width: 150px;
  height: 150px;
  border-radius: 6px;
  object-fit: cover;
}

.info-box {
  flex: 1;
}

.map-btn {
  margin-top: 10px;
  background: #0077cc;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.map-btn:hover {
  background: #005fa3;
}
</style>