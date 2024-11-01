import { Link } from "react-router-dom";

export default function SectionOne() {
  return (
    <div>
        <h1>Dashbord</h1>
        <div>
            <button className="bg-green-600">
              <Link to="/">
              Add new Candidat
              </Link>
            </button>
        </div>

    </div>
  )
}
