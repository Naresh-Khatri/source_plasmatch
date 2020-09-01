<template>
  <div class="card">
    <div class="q-pa-md">
      <div v-if="regSuccessful" class="centerr">
        <q-stepper v-model="step" vertical color="primary">
          <h3 style="text-align: center; margin: 10px;">Thank you!</h3>
          <h5 style="text-align: center; margin: 10px;">
            We'll mail you at <span style="color: black">{{ this.email }}</span>
          </h5>
          <h5 style="text-align: center; margin: 10px;">
            or call you on
            <span style="color: black">{{ this.phoneNumber }}</span>
          </h5>
          <img
            src="../assets/thank-you.gif"
            alt=""
            style="margin-left: 25%; width: 400px"
          />
          <div>
            <router-link to="/" style="text-decoration:none">
              <q-btn
                style="margin-left:50%"
                color="primary"
                label="Home"
                size="large"
              />
            </router-link>
          </div>
        </q-stepper>
      </div>
      <q-stepper v-model="step" vertical color="primary" animated v-else>
        <h4 class="q-ml-lg"><strong> Registration form </strong></h4>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-step
            :name="1"
            title="Personal Information"
            icon="account_circle"
            :done="step > 1"
          >
            <dir class="row" style="padding:5px">
              <div class="col">
                <q-input
                  class="q-ma-sm"
                  outlined
                  v-model="firstName"
                  label="First Name"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 1) ||
                      'Please Enter Your Correct First Name'
                  ]"
                />
              </div>
              <div class="col">
                <q-input
                  class="q-ma-sm"
                  outlined
                  v-model="lastName"
                  label="Last Name"
                  :rules="[
                    val =>
                      (val && val.length > 1) ||
                      'Please Enter your Correct Last Name'
                  ]"
                />
              </div>
            </dir>
            <!-- <q-input class='q-ma-sm'  outlined v-model="lastName" label="Age" type="number"/> -->
            <div class="row">
              <q-date
                v-model="dob"
                landscape
                title="Date Of Birth"
                class="centerr"
                :rules="[
                  val =>
                    (val && val.length != '') ||
                    'Please Enter your Correct Last Name'
                ]"
              />
            </div>
            <div class="text-h5 q-mt-md">
              Gender
            </div>
            <div class="q-gutter-sm">
              <q-radio v-model="gender" val="F" label="Female" />
              <q-radio v-model="gender" val="M" label="Male" />
            </div>
            <div class="text-h5 q-mt-md">
              Blood Type
            </div>
            <div class="q-gutter-sm">
              <q-radio
                class="q-ml-md"
                v-model="bloodType"
                val="A+"
                label="A+"
              />
              <q-radio
                class="q-ml-md"
                v-model="bloodType"
                val="A-"
                label="A-"
              />
              <q-radio
                class="q-ml-md"
                v-model="bloodType"
                val="B+"
                label="B+"
              />
              <q-radio
                class="q-ml-md"
                v-model="bloodType"
                val="B-"
                label="B-"
              />
              <q-radio
                class="q-ml-md"
                v-model="bloodType"
                val="AB+"
                label="AB+"
              />
              <q-radio
                class="q-ml-md"
                v-model="bloodType"
                val="AB-"
                label="AB-"
              />
              <q-radio
                class="q-ml-md"
                v-model="bloodType"
                val="O+"
                label="O+"
              />
              <q-radio
                class="q-ml-md"
                v-model="bloodType"
                val="O-"
                label="O-"
              />
            </div>
            <div class="text-h5 q-mt-md">
              Do You Have Case Sheet Form?
            </div>
            <div class="q-gutter-sm">
              <q-radio v-model="caseSheetForm" val="true" label="Yes" />
              <q-radio v-model="caseSheetForm" val="false" label="No" />
            </div>
            <q-stepper-navigation>
              <q-btn @click="step = 2" color="primary" label="Continue" />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="Contact Information"
            icon="phone"
            :done="step > 1"
          >
            <q-input
              class="q-ma-sm"
              outlined
              v-model="email"
              label="Email"
              :rules="[
                val =>
                  (val &&
                    val.length > 10 &&
                    val.includes('@') &&
                    val.includes('.')) ||
                  'Invalid Email'
              ]"
            />
            <q-input
              class="q-ma-sm"
              outlined
              v-model="phoneNumber"
              label="Phone Number"
              :rules="[
                val =>
                  (val && val.length >= 10) ||
                  'Phone Number Contains 10 digits!'
              ]"
            />
            <q-stepper-navigation>
              <q-btn flat @click="step = 1" color="primary" label="Back" />
              <q-btn @click="step = 3" color="primary" label="Continue" />
            </q-stepper-navigation>
          </q-step>
          <q-step
            :name="3"
            title="Address"
            caption=""
            icon="home"
            :done="step > 2"
          >
            <q-input
              class="q-ma-sm"
              outlined
              v-model="city"
              label="City"
              :rules="[
                val =>
                  (val && val.length > 5) || 'Please Enter a valid city name'
              ]"
            />
            <q-input
              class="q-ma-sm"
              outlined
              v-model="hospitalName"
              label="Hospital Name"
              :rules="[
                val =>
                  (val && val.length > 5) ||
                  'Please Enter a Correct Hospital Name'
              ]"
            />
            <q-btn flat color="primary" label="Search" @click="findPlace" />
            {{ coordinates }}
            <GmapMap :center="coordinates" :zoom="14" id="map"> </GmapMap>

            <q-stepper-navigation>
              <q-btn flat @click="step = 2" color="primary" label="Back" />
              <q-btn @click="step = 4" color="primary" label="Continue" />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="4" title="Term & Conditions" icon="thumb_up_alt">
            <h3 style="margin-top:20px;">By submitting this form,</h3>
            <li>
              I confirm that the information I have provided here is complete
              and accurate to the best of my knowledge.
            </li>
            <li>
              I confirm that I fulfil the eligibility criteria for patients set
              out at https://Plasmatch.com.
            </li>
            <li>
              I confirm that I wish to share the information provided here with
              Plasmatch for the exclusive purpose(s) of matching with donors
              from the database of donors registered with Plasmatch and sharing
              this information directly and solely with the matched donors.
            </li>
            <li>
              I agree to hold harmless Plasmatch for its use of the information
              for the exclusive purpose(s) set out above.
            </li>
            <div class="p-t-15">
              <!-- <button class="btn btn--radius-2 btn--blue" type="submit">Confirm</button> -->
            </div>
            <q-stepper-navigation>
              <q-btn
                flat
                @click="step = 3"
                color="primary"
                label="Back"
                class="q-ml-sm"
              />
              <q-btn
                color="primary"
                label="Finish"
                type="submit"
              />
            </q-stepper-navigation>
          </q-step>
        </q-form>
      </q-stepper>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      firstName: "naresh",
      lastName: "khatri",
      age: "",
      gender: "M",
      email: "nares1@gmail.com",
      city: "kurnnol",
      hospitalName: "asdfasdf",
      phoneNumber: "123123132",
      bloodType: "A+",
      dob: "2000/03/23",
      caseSheetForm: true,

      placeName: "",

      regSuccessful: false,
      step: 1,
      coordinates: { lat: 0, lng: 0 }
    };
  },
  created() {
    this.askLocation();
  },
  methods: {
    onComplete: function() {
      alert("Yay. Done!");
    },
    askLocation() {
      this.$getLocation({})
        .then(coordinates => {
          this.coordinates = {
            lat: coordinates.lat,
            lng: coordinates.lng
          };
        })
        .catch(error => alert(error));
    },
    findPlace() {
      const request = {
        query: "Museum of Contemporary Art Australia",
        fields: ["name", "geometry"]
      };
      service = new google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }

          map.setCenter(results[0].geometry.location);
        }
      });
    },
    onSubmit() {
      var from = this.dob.split("/");
      var old = from[2] * 86400 + (from[1] - 1) * 2592000 + from[0] * 31557600;
      var today = new Date();
      var curr =
        today.getDate() * 86400 +
        today.getMonth() * 2592000 +
        today.getFullYear() * 31557600;
      var diff = curr - old;
      this.age = Math.floor(diff / 31622400);

      console.log(this.age);
      var info = {
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName,
        dob: this.dob,
        age: this.age,
        gender: this.gender,
        phone_no: this.phoneNumber,
        city: this.city,
        lat: this.coordinates.lat,
        lng: this.coordinates.lng,
        hospital_name: this.hospitalName,
        blood_type: this.bloodType,
        case_sheet_form: true
      };

      console.log(info);
      axios
        .post("http://127.0.0.1:8000/PatientProfile/", info)

        .then(response => {
          if (response.status) {
            this.$q.notify({
              type: "positive",
              message: "Registration Successful!",
              position: "top",
              duration: 50
            });
            this.regSuccessful = true
          }
        })
        .catch(error => {
          if (error.response.statusText) {
            console.log("bad requset");
            this.$q.notify({
              type: "negative",
              message: "Check your details or Email already exists!",
              position: "top",
              duration: 50
            });
          }
        });
    }
  },
  caculateAge() {
    var from = this.dob.split("/");
    var old = from[2] * 86400 + (from[1] - 1) * 2592000 + from[0] * 31557600;
    var today = new Date();
    var curr =
      today.getDate() * 86400 +
      today.getMonth() * 2592000 +
      today.getFullYear() * 31557600;
    var diff = curr - old;
    this.age = Math.floor(diff / 31622400);
  },

  createMarker(place) {
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location
    });
    google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name);
      infowindow.open(map);
    });
  }
};
</script>
<style>
#map {
  min-height: 500px;
  max-height: 500px;
  min-width: 300px;
  max-width: 700px;
}
.card {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  border-radius: 5px;
}
.centerr {
  margin-left: auto;
  margin-right: auto;
}
</style>
