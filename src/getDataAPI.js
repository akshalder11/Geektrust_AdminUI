import axios from "axios";

const api =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const getDataAPI = (setUserData) => {
  axios
    .get(api)
    .then((response) => {

      //Adjusting data by adding keys as requirement
      const buffer = response.data;
      buffer.map ( elem => {
        elem.isSelected = false;
        elem.editToggle = false;
      })
      setUserData(buffer);
    })
    .catch((e) => {
      console.log("Error ", e);
    });

};

