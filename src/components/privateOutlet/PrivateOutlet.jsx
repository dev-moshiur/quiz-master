

import { Navigate, Outlet } from "react-router-dom";
import {useData} from "../../context";

export default function PrivateOutlet() {
    const {data} = useData();
  return data.admin ? <Outlet /> : <Navigate to="/login" />;
}