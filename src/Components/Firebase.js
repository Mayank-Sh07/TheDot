import React from "react";
import app from "firebase/app";
import "firebase/firestore";

const FirebaseContext = React.createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBDq4Qjvqwx1PRXddaKfUns2O45T1--Cy0",
  authDomain: "thedot-c4d92.firebaseapp.com",
  databaseURL: "https://thedot-c4d92.firebaseio.com",
  projectId: "thedot-c4d92",
  storageBucket: "thedot-c4d92.appspot.com",
  messagingSenderId: "66841279073",
  appId: "1:66841279073:web:c433a5ba5614981b330820",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.firestore = app.firestore;

    this.templateText = "hey+mayank+here";

    this.getPoints = (billAmount) => {
      if (billAmount <= 2000) {
        return Math.ceil(billAmount * 0.02);
      } else if (billAmount > 2000 && billAmount <= 8000) {
        return Math.ceil(billAmount * 0.025);
      } else {
        return Math.ceil(billAmount * 0.028);
      }
    };
  }

  addNewCustomer = (name, phNum, crdNum, billAmt) => {
    return this.firestore()
      .collection("customers")
      .doc(`${phNum}_${crdNum}`)
      .set({
        name: name,
        phoneNumber: phNum,
        cardNumber: crdNum,
        points: this.getPoints(billAmt),
      });
  };

  fetchCustomerData = async (uniqueNumber, setCustomerData) => {
    var snapShot;
    const customerRef = this.firestore().collection("customers");
    if (uniqueNumber.length === 8) {
      snapShot = await customerRef
        .where("cardNumber", "==", uniqueNumber)
        .get();
    } else
      snapShot = await customerRef
        .where("phoneNumber", "==", uniqueNumber)
        .get();

    if (snapShot.empty) {
      return 404;
    } else {
      snapShot.docs[0].data();
      setCustomerData(snapShot.docs[0].data());
      return 200;
    }
  };

  updateCustomerData = async (amount, data, setData) => {
    const gainedPoints = this.getPoints(amount);
    const customerDoc = this.firestore()
      .collection("customers")
      .doc(`${data.phoneNumber}_${data.cardNumber}`);
    customerDoc
      .update({
        points: Number(data.points) + Number(gainedPoints),
      })
      .catch(() => alert("UPDATE FAILED, contact admin and report"));
    const snapShot = await customerDoc.get();
    if (snapShot.empty) {
      return 404;
    } else {
      setData(snapShot.data());
      window.open(
        `https://api.whatsapp.com/send?phone=+91${data.phoneNumber}&text=${this.templateText}`,
        "_blank"
      );
      return 200;
    }
  };
}

export default Firebase;
export { FirebaseContext };
