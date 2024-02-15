import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../../Firebase/firebase";
// Add a new document in collection "cities"
import { auth } from "../../../Firebase/firebase";
export const storeclient = async (
  apps,
  SrDev,
  JrDev,
  UiUx,
  projectname,
  projectoverview
) => {
  await setDoc(doc(db, "Projects", auth.currentUser.uid), {
    apps: apps,
    SrDev: SrDev,
    JrDev: JrDev,
    UiUx: UiUx,
    projectname: projectname,
    projectoverview: projectoverview,
    approval: "Pending",
    clientid: auth.currentUser.uid,
    name: auth.currentUser.displayName,
  });
};
